// import nativeToast from 'native-toast'
import axios from 'axios'
import jsonp from 'jsonp'
// import { setCookie } from '@/libs/toolUtil'
import { Message } from 'antd'

const Axios = axios.create({
  baseURL: '/', // 因为我本地做了反向代理
  timeout: 20000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Allow-Origin': 'http://test.icarbonx.com:8181',
    // 'x-authtype': 'EUAS',
    'Content-Security-Policy': "frame-ancestors https://*.icarbonx.cn; https://*.icarbonx.com",
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
Axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.data && res.data.errorCode && res.data.errorCode !== 0) {
      Message.warning(res.data.errMsg)
      return Promise.resolve(res)
    }
    return res
  },
  error => {
    let result = {data: {}}
    switch (error.response.status) {
      case 401:
        const location = error.response.headers.location
        return new Promise((resolve) => {
          jsonp(location, null, async (...data) => {
            const res = data[1]
            if (res) {
              if (res.loggedIn === false) {
                const urll = encodeURIComponent(window.location)
                window.location = `${res.loginPage}&original_url=${urll}`
              } else if (res.loggedIn === true) {
                let url = error.response.config.url
                let type = error.response.config.method
                let param = error.response.config.params
                result['data'] = await rehttp(url, type, param)
                resolve(result)
              }
            }
          })
        })
      default:
        Message.error(codeMessage[error.response.status])
    }
  }
)

let http = {}
// 欠加密数据的处理以后看需求
// SESSION=951a9ae9-8df0-475e-bc4a-45047b3637e5; boss_token=435fdb7e88d94a219fe2b71e64c0b2c6; boss_user=liuxiao
// document.cookie = 'SESSION' + '=b66c504e-6923-49c5-91a3-8fdd343ca4fa;'
// document.cookie = 'boss_token' + '=382e496b718643dca79e11af44d2c756;'
// document.cookie = 'boss_user' + '=liuxiao;'
// let expireDays = 1000 * 60 * 60
// setCookie('SESSION', '2f2c646f-5b31-4a69-9f4d-63fb28e80648')
// setCookie('boss_token', 'f5ad9aff3d8b4618a457a092f931fc13')
// setCookie('boss_user', 'zhangya')

// 自己要加错误提示请传三个参数 self 为Boolean类型为 true， 默认是不自己错误处理，默认为false
// 暴露出去的入口为http.request(param, type, url, self = false)， 前三个是必参分别代表，请求入参， 请求类型，
// 请求地址，最后一个为可选参数代表错误处理方式，默认false，自己不出来，true自己自定义处理

http.request = (param, type, url, self = false) => {
  // 返回状态判断(添加响应拦截器)
  if (type === 'get') {
    return http.fetch(param, url, self)
  } else if (type === 'put') {
    return http.put(param, url, self)
  } else if (type === 'blob') {
    return http.blobDown(param, url)
  } else {
    return http.postAsync(param, url, self)
  }
}

function rehttp (url, type, param, self = false) {
  return new Promise((resolve, reject) => {
    // let result
    if (type === 'get') {
      resolve(http.fetch(param, url, self))
    } else if (type === 'put') {
      resolve(http.put(param, url, self))
    } else if (type === 'blob') {
      resolve(http.blobDown(param, url))
    } else {
      resolve(http.postAsync(param, url, self))
    }
    // resolve(http.request(url, type, param))
  })
}

http.postAsync = (param, url, self) => {
  let params = JSON.stringify(param) // 将入参序列化
  return Axios.post(
    url,
    // auth,
    params,
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'x-authtype': 'EUAS',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        return false
      }
    } else {
      return json
    }
  }).catch((res) => {
    // nativeToast({
    // message: '网络异常'
    // })
    Message.warning('网络异常')
    return false
  })
}
http.blobDown = (param, url) => {
  return Axios({
    method: 'get',
    url,
    data: param,
    responseType: 'blob'
  }).then(response => {
    return response
  }).catch((res) => {
    Message.warning('网络异常')
    return false
  })
}
http.put = (param, url, self) => {
  // let params = JSON.stringify(param) // 将入参序列化
  console.log(param, url)
  return Axios.put(
    url,
    // auth,
    param,
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'x-authtype': 'EUAS',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    // console.log(json, 'put')
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        return false
      }
    } else {
      return json
    }
  }).catch((res) => {
    // nativeToast({
    // message: '网络异常'
    // })
    Message({
      message: '网络异常',
      type: 'warning',
      center: true
    })
    return false
  })
}
http.fetch = (param, url, self) => {
  return Axios.get(
    url,
    {
      params: param
    },
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'x-authtype': 'EUAS',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    console.log(json, 'resres')
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        return false
      }
    } else {
      return data
    }
  }).catch((res) => {
    // Message({
    //   message: '网络异常',
    //   type: 'warning',
    //   center: true
    // })
    return false
  })
}
export default http

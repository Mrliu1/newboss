import http from './http.js'

let  distributeweb = 'https://boss.icarbonx.com/distribute-web'
export const getUserName = (datas = {}) => {
 let params = Object.assign({}, {
 }, datas)
 let URL = `${distributeweb}/euasagent-embedded-api/current-user`
 // let URL = `/distribute-web/euasagent-embedded-api/current-user`
 let type = 'get'
 let returnData = http.request(params, type, URL, true)
 return returnData
}

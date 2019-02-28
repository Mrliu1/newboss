import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../store.js'
import {Layout, Menu, Icon, Button} from 'antd';
import './index.less'
const SubMenu = Menu.SubMenu;
const {Sider} = Layout

class Side extends PureComponent {

  state = {
    collapsed: false,
    menuData: [],
    active: 1
  }
componentDidMount() {
  let me = this
  const unsubscribe = store.subscribe(() => console.log(store.getState()))
  console.log(this.props.activeKeyState,'props.activeKeyState')
  let data = [{
    "id": 1,
    "parentId": null,
    "text": "私人博客",
    "state": null,
    "checked": null,
    "children": [
        {
            "id": 2,
            "parentId": null,
            "url": 'https://my.oschina.net/u/2542841/blog/3009081',
            "text": "第一篇博客",
            "state": null,
            "checked": null,
            "children": []
        },
        {
            "id": 13,
            "parentId": null,
            "url": 'https://my.oschina.net/u/2542841/blog/2961340',
            "text": "第二篇博客",
            "state": null,
            "checked": null,
            "children": []
        },
        {
            "id": 30,
            "parentId": null,
            "url": 'https://my.oschina.net/u/2542841/blog/3008974',
            "text": "博客内容",
            "state": null,
            "checked": null,
            "children": []
        },
        {
            "id": 10010,
            "parentId": null,
            "text": "开源中国博客",
            "state": null,
            "checked": null,
            "children": [
                {
                    "id": 10011,
                    "parentId": null,
                    "text": "前端博客",
                    "state": null,
                    "url": 'https://my.oschina.net/u/2542841/blog/2878806',
                    "checked": null,
                    "children": []
                },
                {
                    "id": 10012,
                    "parentId": null,
                    "text": "git内容",
                    "state": null,
                    "url": 'https://my.oschina.net/u/2542841/blog/2878891',
                    "checked": null,
                    "children": []
                }
            ]
        }
    ]
},{
  "id": 'sampleflow',
  "parentId": null,
  "text": "第二博客",
  "state": null,
  "checked": null,
  "children": [
      {
          "id": 'qualityProjectQuery',
          "parentId": null,
          "url": 'https://blog.csdn.net/weixin_40766882/article/details/87193175',
          "text": "cdns博客",
          "state": null,
          "checked": null,
          "children": []
      },
      {
          "id": 'noPlanSample',
          "parentId": null,
          "url": 'https://blog.csdn.net/weixin_40766882/article/details/87097058',
          "text": "透析原型与原型链",
          "state": null,
          "checked": null,
          "children": []
      }
  ]
}]
let active = localStorage.currentActive || 1
console.log(active, '1111')
me.setState({
  menuData: data,
  active,
})
}
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, ()=>{
      console.log('aa')
    })
  }
addTab (obj) {
  this.props.onTodoClick(obj, obj.id)
}
  render () {
    return (
      <Sider
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
        >
          <div className="logo">
            <span className="icon"></span>{this.props.collapsed ? <span >ICX</span> : <span>XX博客运营系统</span>}
          </div>
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={[this.props.activeKeyState]}
          defaultOpenKeys={[`sub1`]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
        >
        {this.state.menuData.map(val => {
        return  val.children.length > 0 ? <SubMenu key={`sub${val.id}`}
              title={<span><Icon type="mail" /><span>{val.text}</span></span>}>
            {val.children.map(val2 => {
            return  val2.children.length > 0 ? <SubMenu key={`sub${val2.id}`} title={<span><Icon type="mail"/><span>{val2.text}
            </span></span>}>
              {val2.children.map(val3 => {
              return  val3.children.length > 0 ? <SubMenu key={`sub${val3.id}`} title={<span><Icon type="mail" /><span>{val3.text}
              </span></span>}>
                </SubMenu>: <Menu.Item key={val3.id}  onClick={this.addTab.bind(this,{key:val3.url,text:val3.text,id:val3.id+''})} ><div dangerouslySetInnerHTML={{__html: `${val3.text}`}}></div></Menu.Item>
              })}
              </SubMenu>: <Menu.Item key={val2.id} onClick={this.addTab.bind(this,{key:val2.url,text:val2.text,id:val2.id+''})}><div dangerouslySetInnerHTML={{__html: `${val2.text}`}}></div></Menu.Item>
            })}
          </SubMenu>
          :  <Menu.Item key={val.id} onClick={this.addTab.bind(this,{key:val.url,text:val.text,id:val.id+''})}><div dangerouslySetInnerHTML={{__html: `${val.text}`}}></div></Menu.Item>
        })}
        </Menu>
      </Sider>
    )
  }
}
Side.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  activeKeyState: PropTypes.string.isRequired,
  onTodoClick: PropTypes.func.isRequired
}
export default Side;

import React, { PureComponent } from 'react';
// import { connect } from 'react-redux'
// import {
//   addToList
// } from '../actions/siderActions.js'
import store from '../store.js'
import axios from 'axios'
import {Layout, Menu, Icon, Button, Dropdown} from 'antd';
import './index.less'
import {getUserName} from '../api/api-main'
const SubMenu = Menu.SubMenu;
const {Header} = Layout

class HeaderBase extends PureComponent {
  state = {
    collapsed: true,
    fullscreen: true,
    name: '',
    menu: (<div></div>),
  }
  componentDidMount(){
    console.log(localStorage,'name')
    this.initName()
    if (!localStorage.name) {
      console.log('initName')
      this.initName()
    }
    const menu = (
      <Menu>
        <Menu.Item key="modify" disabled>修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="quit">
          <p onClick={this.quitLogin.bind(this)}>退出</p>
        </Menu.Item>
      </Menu>
    )
    this.setState({
      menu: menu
    })
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
    store.dispatch({
      type: 'SIDER_FLAG',
      id: this.state.collapsed
    })
  }
  toggleFullscreen = (flag) => {
    this.setState({
      fullscreen: flag
    }, () => {
      this.handleFullscreen(flag)
    })
  }
  initName () {
    getUserName().then(res => {
      if (res === false) {
        return
      }
      let name = res.name
      this.setState({
        name: name
      })
      window.localStorage.setItem('name', name)
    })
  }
  // 渠道查用户登出
    quitLogin () {
      let redi_url = window.location.href
      let url = `https://euas.icarbonx.cn/server/logout?&redirect_url=${redi_url}`
      window.localStorage.setItem('name', '')
      window.location = url
    }
  // 新增全屏的功能
  handleFullscreen (flag) {
      let main = document.body
      if (flag) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
    } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    }
  render () {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', textAlign: 'left'}}>
      <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
        <Icon type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} />
      </Button>
      <div className="header-right">
        {this.state.fullscreen ? <Icon type="fullscreen" onClick={this.toggleFullscreen.bind(this,false)} /> :
          <Icon type="fullscreen-exit" onClick={this.toggleFullscreen.bind(this,true)} />}
        <Dropdown overlay={this.state.menu}>
          <div className="header-admin"><Icon type="user" />当前用户：{this.state.name}</div>
        </Dropdown>
      </div>
      </Header>
    )
  }
}

export default HeaderBase;

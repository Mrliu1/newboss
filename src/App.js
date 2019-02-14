import React, { Component } from 'react';
import {Button, Layout} from 'antd'
import './App.css';
import SideList from './containers/visibleTodoSider.js'
import TabShow from './containers/tabShow'
import Link from './components/Link.js'

import  HeaderBase from './header/HeaderBase'
import TabsMenu from './tabs/TabsIndex.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideList />
        <Layout style={{ minHeight: '100vh' }}>
          <Layout>
            <HeaderBase></HeaderBase>
            <TabShow></TabShow>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;

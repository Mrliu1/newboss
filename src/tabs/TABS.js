import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;

class TabsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { text: '首页', key: 'https://boss.icarbonx.com/distribute-ui/baseDistribute/channelBilling', id: 'home', closable: false },
    ];
    this.state = {
      activeKey: panes[0].id,
      panes,
      iframeHeight: '0px'
    };
  }
  componentDidMount(){
    if (localStorage.statePane) {
      let panes = JSON.parse(localStorage.statePane)
      let active = localStorage.currentActive
      console.log(active)
      this.setState({
        panes,
        activeKey: active,
      })
    }
    // let nodeDomain = document.domain
    // document.domain = nodeDomain
    // console.log(nodeDomain)
  }
  componentWillReceiveProps(nextProps) {
    const  active = this.state.activeKey
    const newActive = nextProps.activeKeyState.toString()
    let statePane = this.state.panes
    let panesIds = []
    statePane.forEach(val => {
      panesIds.push(val.id)
    })
    if (nextProps.tabsArr.length > 0 && !panesIds.includes(nextProps.tabsArr.slice(-1)[0].id)){
      statePane = Array.from(new Set([...statePane, ...nextProps.tabsArr.slice(-1)]))
      window.localStorage.setItem('statePane', JSON.stringify(statePane))
    }
    if (active.toString() !== newActive) {
      this.setState({
        activeKey: nextProps.activeKeyState,
        panes: statePane
      }, ()=>{
       window.localStorage.setItem('currentActive', nextProps.activeKeyState)
       this.props.toggleTodo(nextProps.activeKeyState)
      })
    }
  }
  onChange = (activeKey) => {
    this.setState({ activeKey }, ()=>{
     window.localStorage.setItem('currentActive', activeKey)
     this.props.toggleTodo(activeKey)
    });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = (obj) => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    let transUrl = obj.key || `https://boss.icarbonx.com/distribute-ui/baseDistribute/channelBilling`
    panes.push({ text: 'New Tab', key: transUrl, id: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.id !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].id;
    }
    this.setState({ panes, activeKey },
      () => {
        window.localStorage.setItem('statePane', JSON.stringify(panes))
        window.localStorage.setItem('currentActive', activeKey)
      });
  }

  render() {
    // <div style={{ marginBottom: 16 }}>
    //   <Button onClick={this.add}>ADD</Button>
    // </div>
    return (
      <div className={this.props.collapsed?"content-show-close":"content-show"}>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          style={{height: '100%', width:'100%',textAlign: 'left'}}
        >
          {this.state.panes.map(pane => <TabPane  width="100%" tab={pane.text} key={pane.id} closable={pane.closable}>
            <iframe frameBorder="no" border="0" allowtransparency="yes" style={{height: this.state.iframeHeight, width:'100%', overflow:'visible'}}
            onLoad={()=>{
              const obj = ReactDOM.findDOMNode(this);
              this.setState({
                "iframeHeight":  obj.scrollHeight - 145 + 'px'
                  // "iframeHeight":  obj.contentWindow.document.body.scrollHeight + 'px'
              });
            }}
            src={pane.key}></iframe>
          </TabPane>)}
        </Tabs>
      </div>
    );
  }
}
TabsMenu.propTypes = {
  tabsArr: PropTypes.array.isRequired,
  activeKeyState: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
}
export default TabsMenu;

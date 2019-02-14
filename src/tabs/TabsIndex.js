import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Tabs, Button} from 'antd'
import './index.less'

const TabPane = Tabs.TabPane
let once = 0

class TabsMenu extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    const panes = [
        { text: '样本库', key: 'https://boss.icarbonx.com/lims-ui/baselab/qcPaths/qcQreferences', id: '1' }
    ]
    const len = this.props.tabsArr.length
    this.state = {
      activeKey: panes[0].id,
      panes:[...panes,...this.props.tabsArr],
      iframeHeight: ' 0px'
    }
  }
  componentDidMount() {
    console.log(this.props.tabsArr, 'componentDidMount')
  }
  shouldComponentUpdate(nextProps,nextState){
    if (nextState.activeKey){
      return true
    }
    // console.log(nextProps,nextState,this.props.tabsArr, 'shouldComponentUpdate')
  }
  componentWillReceiveProps(nextProps) {
    // const { data } = this.props.activeKeyState
    // const newdata = nextProps.data.toString()
    // if (data.toString() !== newdata) {
    //   this.setState({
    //     data: nextProps.data,
    //   })
    // }
    console.log(this.props.activeKeyState, this.state.activeKey, nextProps, 'LLLLLLLLLLLLLLL')
    const  active = this.state.activeKey
    const newActive = nextProps.activeKeyState.toString()
    if (active.toString() !== newActive) {
      this.add(nextProps.tabsArr.slice(-1))
      this.setState({
        activeKey: nextProps.activeKeyState,
      })
    }
  }
  // componentDidUpdate (){
  //   console.log(this.props.tabsArr, this.props.tabsArr[this.props.tabsArr.length-1].id, 'componentDidUpdate')
  //   this.setState({
  //     activeKey:this.props.tabsArr[this.props.tabsArr.length-1].id
  //   })
  // }
  //在render函数调用前判断：如果前后state中Number不变，通过return false阻止render调用
  // shouldComponentUpdate(nextProps,nextState){
      // if(nextState.panes == this.state.panes){
      //   console.log(this.state.panes,111111111111111)
      //   return false
      // } else {
      //   this.add({ text: '样本库', content: 'https://boss.icarbonx.com/distribute-ui/baseDistribute/channelBilling', key: '1' })
      // }
  // }
  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  // onEdit = (targetKey, action) => {
      // this[action](targetKey);
    // }

  onEmit = (targetKey, action) => {
    console.log(targetKey, action)
    this[action](targetKey)
  }

  add = (obj) =>{
    // this.add.bind(this,val)();
    let me = this
    let panes = this.state.panes
    const activeKey = `new${me.newTabIndex++}`
    let transUrl = obj.key || `https://boss.icarbonx.com/distribute-ui/baseDistribute/channelBilling`
    // panes.push({
    //   : obj, content:`<iframe src="${transUrl}"></iframe>`,key: activeKey
    // })
    panes.push({ text: obj.text, key: `${transUrl}`, id: activeKey });
    this.setState({panes, activeKey})
  }
  remove = (targetKey) => {
      console.log(targetKey,'targetKey')
    let activeKey = this.activeKey
    let lastIndex
    // console.log(targetKey,'targetKey')
    this.state.panes.forEach((pane, i) => {
      if(pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.setState({panes, activeKey})
  }

  render () {
    let me = this
    let panes =[...this.state.panes, ...this.props.tabsArr]

    console.log(this.props.tabsArr, 'render',this.state.activeKey)
    return (
      <div style={{marginTop: 64, height: '100%', width:'100%'}} className="tabs-base">
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          style={{height: '100%', width:'100%',textAlign: 'left'}}
        >
        {panes.map(pane => <TabPane  width="100%" tab={pane.text} key={pane.id}>
          <iframe frameBorder="no" border="0" allowtransparency="yes" style={{height: this.state.iframeHeight, width:'100%', overflow:'visible'}}
          onLoad={()=>{
            const obj = ReactDOM.findDOMNode(this);
            console.log(obj.scrollHeight,'LLLLLLLLLLLLLL')
            this.setState({
              "iframeHeight":  obj.scrollHeight - 65 + 'px'
                // "iframeHeight":  obj.contentWindow.document.body.scrollHeight + 'px'
            });
          }}
          src={pane.key}></iframe></TabPane>)}
        </Tabs>
      </div>
    )
  }
}
TabsMenu.propTypes = {
  tabsArr: PropTypes.array.isRequired,
  activeKeyState: PropTypes.string.isRequired
}
export default TabsMenu;

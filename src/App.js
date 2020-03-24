import React from 'react';
import AuthRoute from './component/authroute/authroute'
import {Route,Switch} from 'react-router-dom'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './container/chat/chat'
import Login from './container/login/login'
import Register from './container/register/register'
import Dashboard from './component/dashboard/dashboard'
import './App.css';
import {connect} from 'react-redux'
import {getMsgList,recvMsg} from './store/chat.redux'


@connect(
  state => state,
  {getMsgList,recvMsg}
)
class App extends React.Component{
  componentDidMount(){
      if(!this.props.chat.chatmsg.length){
        console.log('socket init')
        this.props.getMsgList()
        this.props.recvMsg()
    }
  }
  render(){
    return (
      <div>
            <AuthRoute></AuthRoute>
            <Switch>
            {/* <Redirect from="/" to="/me" exact></Redirect> */}
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={GeniusInfo}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Dashboard}></Route>
            </Switch>
        </div>
    )
  }
}

export default App;

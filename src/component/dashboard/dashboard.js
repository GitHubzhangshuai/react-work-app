import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import {Switch,Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import User from '../../container/user/user'
import Msg from '../../container/msg/msg'
import {getMsgList,recvMsg} from '../../store/chat.redux'

@connect(
    state => state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            console.log('socket init')
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render(){
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path: '/genius',
                text: '牛人',
                icon: 'job',
                title: '牛人列表',
                component: Genius,
                hide: user.type==='genius'
            },
            {
                path: '/boss',
                text: '老板',
                icon: 'boss',
                title: 'boss列表',
                component: Boss,
                hide: user.type==='boss'
            },
            {
                path: '/msg',
                text: '消息列表',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="card">{navList.find(v=>v.path===pathname)?navList.find(v=>v.path===pathname).title:null}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard
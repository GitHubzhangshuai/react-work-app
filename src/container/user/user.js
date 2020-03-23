import React from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../store/user.redux'

@connect(
    state=> state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        console.log(1)
        const alert = Modal.alert
        alert('注销','确认退出登录吗',[
            {text: 'Cancel',onPress: ()=> {}},
            {text: 'Ok',onPress: ()=> {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }}
        ])

    }
    render(){
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        console.log(props)
        return props.user?(
            <div>
                <Result 
                img={<img alt="" style={{width:50}} src={require(`./img/${props.avatar}.png`)}></img>}>
                title={props.user}
                message={props.type==='boss'?props.company:null}
                </Result>
                <List renderHeader={
                    () => '简介'
                }>
                    <Item>
                        {props.title} 
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}

export default User
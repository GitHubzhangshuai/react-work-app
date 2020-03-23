import React from 'react'
import Logo from '../../component/logo/logo'
import Authroute from '../../component/authroute/authroute'
import {List,Button,WhiteSpace,WingBlank,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../store/user.redux'
import imoocForm from '../../component/imooc-from/imooc-form'

@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                <Authroute></Authroute>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo/>
                <h2>登录</h2>
                <List>
                    <InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                </List>
                <WingBlank>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
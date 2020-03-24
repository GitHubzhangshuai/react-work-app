import React from 'react'
import Logo from '../../component/logo/logo'
import {List,Button,Radio,WhiteSpace,WingBlank,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import '../../index.css'
import {register} from '../../store/user.redux'
import { Redirect } from 'react-router-dom'
import imoocForm from '../../component/imooc-from/imooc-form'
const RadioItem = Radio.RadioItem

@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props){
        super(props)
        this.login = this.login.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    login(){
        this.props.history.push('/login')
    }
    handleRegister(){
        this.props.register(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/register'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo/>
                <h2>注册</h2>
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:''}
                    <InputItem onChange={v => this.props.handleChange('user',v)}>用户名</InputItem>
                    <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                    <InputItem onChange={v => this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    <RadioItem onChange={() => this.props.handleChange('type','genius')} checked={this.props.state.type === 'genius'}>牛人</RadioItem>
                    <RadioItem onChange={() => this.props.handleChange('type','boss')} checked={this.props.state.type === 'boss'}>老板</RadioItem>
                </List>
                <WingBlank>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.login}>登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register
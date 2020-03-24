import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadData} from '../../store/user.redux'
import {withRouter} from 'react-router-dom'
@withRouter
@connect(
    state => state.user,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        // const publicList = ['/login','/register']
        const pathName = this.props.location.pathname
        // if(publicList.indexOf(pathName)>-1){
        //     return null
        // }
        axios.get('/user/info').then((res) => {
            if(res.status === 200){
                if(res.data.code === 0){
                    // 有登录信息
                    this.props.loadData(res.data.data)
                }else{
                    if(pathName==='/register'){
                        this.props.history.push('/register')
                    }else{
                        this.props.history.push('/login')
                    }
                }
            }
        })
    }
    render(){
        return (<div></div>)
    }
}
export default AuthRoute
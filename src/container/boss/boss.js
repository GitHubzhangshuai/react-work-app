import React from 'react'
import {getUserList} from '../../store/chatuser.redux'
import { connect } from 'react-redux'
import UserCard from '../../component/usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return(
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}

export default Boss
import React from 'react'
import PropTypes from 'prop-types'
import {Card,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
            {this.props.userList?this.props.userList.map(v=>(
            v.avatar?(
                <Card key={v._id} onClick={() => this.handleClick(v)}>
                <Header
                title={v.user}
                thumb={require(`./img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}>
                </Header>
                <Body>
                    {v.type==='boss'?<div>公司:{v.company}</div>:null}
                    {v.desc.split('\n').map(v=>(
                        <div key={v}>{v}</div>
                    ))}
                    {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                </Body>
            </Card>):null
        )):null}
    </WingBlank>
        )
    }
}

export default UserCard
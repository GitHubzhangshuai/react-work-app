import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state => state,
    null
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last-a_last
        })

        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        return (
            <div className="page-content">
            {chatList.map(v => {
                const lastItem = this.getLast(v)
                const targetId = v[0].from === userid?v[0].to:v[0].from
                const unreadUum = v.filter(v => !v.read&&v.to===userid).length
                const name = userinfo[targetId]&&userinfo[targetId].name
                let avatar = userinfo[targetId]&&userinfo[targetId].avatar
                avatar = avatar?avatar:'boy'
                console.log(v)
                return (
                    <List key={lastItem._id}>
                        <Item 
                        extra={<Badge>{unreadUum}</Badge>}
                        arrow="horizontal"
                        onClick={()=>{
                            this.props.history.push(`/chat/${targetId}`)
                        }}
                        thumb={require(`./img/${avatar}.png`)}
                        >
                            {lastItem.content}
                            <Brief>{name}</Brief>
                        </Item>
                    </List>
                    )
                        
            })}
            </div>
        )
    }
}

export default Msg
import React from 'react'
import {getChatId} from '../../util'
import {List,InputItem,NavBar, Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../store/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
    state => state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            emojis: [],
            showEmoji: false
        }
    }
    componentDidMount(){
        // 初始化表情列表数据
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.setState({emojis:emojis.map(emoji => ({text: emoji}))})
        this.fixCarousel()
        if(!this.props.chat.chatmsg.length){
            console.log('socket init')
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text: ''
        })
    }
    toggleEmoji(){
        this.setState({
            showEmoji: !this.state.showEmoji
        })
        this.fixCarousel()
    }
    render(){
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        const Item = List.Item
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid===chatid)
        return (
        <div id="chat-page">
            <NavBar 
            mode="dark" 
            icon={<Icon type="left"></Icon>}
            onLeftClick={() => {
                this.props.history.goBack()
            }}>
                {users[userid].name}
            </NavBar>
            <div className="chat-body">
                <QueueAnim type='scale' delay={100}>
                    {chatmsgs.map(v => {
                        const avatar = require(`./img/${users[v.from].avatar}.png`)
                        return v.from===userid?(
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item 
                                extra={'avatar'}
                                className='chat-me'
                                >{v.content}</Item>
                            </List>
                        )
                    })}
                </QueueAnim>
            </div>
            <div className="stick-footer">
                <List>
                    <InputItem 
                    placeholder="请输入"
                    value={this.state.text}
                    onChange={v=>{
                        this.setState({text:v})
                    }}
                    extra={
                        <div>
                            <span onClick={() => {
                                this.toggleEmoji()
                            }} style={{marginRight:15}} aria-label="表情包" role="img">😀</span>
                            <span onClick={()=>this.handleSubmit()}>发送</span>
                        </div>
                    }>
                    </InputItem>
                </List>
                {this.state.showEmoji?(
                    <Grid 
                    data={this.state.emojis} 
                    columnNum={10}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={el => {
                        this.setState({
                            text:this.state.text+el.text
                        })
                    }}
                    ></Grid>
                    ):null}
            </div>
        </div>
        )
    }
}

export default Chat
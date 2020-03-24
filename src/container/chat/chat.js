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
        this.scrollInit()
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
            text: '',
            bodyDOm: null
        })
    }
    toggleEmoji(){
        this.setState({
            showEmoji: !this.state.showEmoji
        })
        this.fixCarousel()
    }
    scrollInit(){
        if(this.refs.bodyChat){
            this.refs.bodyChat.scrollTo(0, this.refs.bodyChat.scrollHeight)
        }
    }
    handleFocus(){
        this.refs.stickFooter.style['position'] = 'absolute'
        let n = '100'
        this.refs.stickFooter.style['bottom'] = n+'px'
    }
    handleBlur(){
        this.refs.stickFooter.style['position'] = 'fixed'
        this.refs.stickFooter.style['bottom'] = '0'
    }
    componentDidUpdate(){
        this.scrollInit()
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
            <div className="chat-body" ref="bodyChat">
                <QueueAnim type='scale' delay={100} onEnd={() => this.scrollInit()}>
                    {chatmsgs.map(v => {
                        const avatar = users[v.from]?require(`./img/${users[v.from].avatar}.png`):null
                        return v.from===userid?(
                            <List key={v._id}>
                                {avatar?(
                                    <Item thumb={avatar}>{v.content}</Item>
                                ):null}
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item 
                                extra={'我'}
                                className='chat-me'
                                >{v.content}</Item>
                            </List>
                        )
                    })}
                </QueueAnim>
            </div>
            <div className="stick-footer" ref="stickFooter">
                <List>
                    <InputItem 
                    placeholder="请输入"
                    value={this.state.text}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={v=>{
                        this.setState({text:v})
                    }}
                    onKeyUp={(e)=>{if(e.keyCode === 13) {this.handleSubmit()}}}
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
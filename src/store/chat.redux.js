import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_READ = 'MSG_READ'
const MSG_RECV = 'MSG_RECV'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}


export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload.msgs,users:action.payload.users,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.to===action.userid?1:0
            console.log(action.userid)
            console.log(action.payload.to)
            return {...state,chatmsg: [...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,num} = action.payload
            return {...state,chatmsg:state.chatmsg.map(v => {
                return {...v,read:from===v.from?true:v.read,unread:state.unread-num}
            }),unread:state.unread-action.payload.num}
        default:
            return state
    }
}


function msgList(msgs,users){
    return {type: MSG_LIST,payload:{msgs,users}}
}

function msgRecv(msg,userid){
    return {userid,type: MSG_RECV,payload:msg}
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}


export function getMsgList(){
    return (dispatch,getState) => {
        axios.get('/user/getmsglist').then(res => {
            if(res.status === 200 && res.data.code === 0){
                const userid = getState().user._id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}

export function sendMsg({from,to,msg}){
    return dispatch => {
        socket.emit('sendmsg',{from,to,msg})
    }
}

export function recvMsg(){
    return (dispatch,getState) => {
        socket.on('recvmsg',function(data){
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}

export function readMsg(from){
    return (dispatch,getState) => {
        axios.post('/user/readmsg',{from}).then(res => {
            const userid = getState().user._id
            if(res.status===200&&res.data.code===0){
                dispatch(msgRead({userid,from,num:res.data.num}))
            }
        })
    }
}
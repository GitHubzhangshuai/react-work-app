/* eslint-disable import/first */

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import http from 'http'
import socket from 'socket.io'
import model from './model'
import React from 'react'
import crypto from 'crypto'
import {renderToString} from 'react-dom/server'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
    extensions: ['png']
})

import App from '../src/App'
import { Provider } from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import { createStore,applyMiddleware,compose } from 'redux'
import reducer from '../src/store/reducer'
import staticPath from '../build/asset-manifest.json'

const app = express()
const server = http.Server(app)
const io = socket(server)
const Chat = model.getModel('chat')

io.on('connection',function(socket){
    console.log('connection')
    var key = Math.random()*1000
    key = crypto.createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
    var headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key
    ];
    socket.write(headers.join("\r\n") + "\r\n\r", 'ascii');
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data
        console.log(msg)
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

const PORT = 9093
const userRouter = require('./user')

app.use(bodyParser.json())
app.use(cookieParser())


app.use('/user',userRouter)
app.use(function(req,res,next){
    if(req.url.startsWith('/user')||req.url.startsWith('/static')){
        return next()
    }
    const store = createStore(reducer,
        compose(applyMiddleware(thunk)
    ))
    let context = {} 
    const arr = Object.keys(staticPath['files'])
    let strJs = ''
    let strCss = ''
    arr.forEach(v => {
        if(v.endsWith('.css')){
            strCss += `<link rel="stylesheet" href="${staticPath['files'][v]}"/>`
        }
        if(v.endsWith('.js')&&!v.includes('service-worker')&&!v.includes('recache-manifest')){
            strJs += `<script src="${staticPath['files'][v]}"></script>`
        }
    })
    const markup = renderToString((<Provider store={store}>
        <StaticRouter
            context={context}
            location={req.url}
        >
            <App></App>
        </StaticRouter>
    </Provider>))
    const obj = {
        '/msg': 'socket即时通讯',
        '/boss': '老板页面',
        '/genius': '大神页面',
        '/me': '用户中心'
    }
    const author = '张帅'
    const description = obj[req.url]?obj[req.url]:'react-ssr即时通讯"'
    const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/static/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name=""keywords" content="React,redux,ssr,websocket"/>
            <meta name="author" content="${author}"/>
            <meta name="description" content="${description}"/>
            <title>${description}</title>
            ${strCss}
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${markup}</div>
            ${strJs}
        </body>
    </html>
`
    return res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))

server.listen(PORT,function(){
    console.log('express start'+PORT)
})
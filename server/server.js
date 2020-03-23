// const express =require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const path = require('path')
// const http = require('http')
// const socket = require('socket.io')
// const model = require('./model')
// const app = express()
// const server = http.Server(app)
// const io = socket(server)
// const Chat = model.getModel('chat')

// io.on('connection',function(socket){
//     socket.on('sendmsg',function(data){
//         const {from,to,msg} = data
//         const chatid = [from,to].sort().join('_')
//         Chat.create({chatid,from,to,content:msg},function(err,doc){
//             io.emit('recvmsg',Object.assign({},doc._doc))
//         })
//         console.log(data)
//     })
// })

// const PORT = 9093
// const userRouter = require('./user')

// app.use(bodyParser.json())
// app.use(cookieParser())


// app.use('/user',userRouter)
// app.use(function(req,res,next){
//     if(req.url.startsWith('/user')||req.url.startsWith('/static')){
//         return next()
//     }
//     return res.sendFile(path.resolve('build/index.html'))
// })
// app.use('/',express.static(path.resolve('build')))

// server.listen(PORT,function(){
//     console.log('express start'+PORT)
// })

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import http from 'http'
import socket from 'socket.io'
import model from './model'
import React from 'react'
import {renderToString,renderToStaticMarkup} from 'react-dom/server'
const app = express()
const server = http.Server(app)
const io = socket(server)
const Chat = model.getModel('chat')

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        console.log(data)
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
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))

server.listen(PORT,function(){
    console.log('express start'+PORT)
})
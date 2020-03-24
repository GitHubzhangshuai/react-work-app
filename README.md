## 前端技术栈
* mv框架:react
* 状态管理:redux+redux-thunk+react-redux
* 路由控制:react-router-dom
* 数据交互:axios
* UI库:antd-mobile
* 经常动画:rc-queue-anim
* 即时通讯:socket.io-client
```
npm start
浏览器打开localhost:3000
```

## 后台技术栈
* web框架:express
* 数据库:mongoose+mongodb
* 即时通讯:socket.io
* 状态保存:cookie
* 模板引擎:无(由于是前后端分离)
```
npm run server
运行在本地的9093端口
(
src/store/char.redux.js下
const socket = io('ws://47.95.4.125:9093')
要改成自己的地址
)
```

## 服务器渲染
* 把React节点转换成html:renderToString(from react-dom/server)
* 服务器渲染数据路由切换:StaticRouter(from react-router-dom)
* 处理css问题: css-modules-require-hook
* 处理图片问题: asset-require-hook
* 执行编译器: babel-node
* 日志管理&&进程守护:pm2
```
npm run build
npm run server
浏览器输入即可localhost:9093
```


todo
* 用js获取软键盘高度来代替固定值
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store'
import { Provider } from 'react-redux'
import AuthRoute from './component/authroute/authroute'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './container/chat/chat'
import Login from './container/login/login'
import Register from './container/register/register'
import Dashboard from './component/dashboard/dashboard'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
(<Provider store={store}>
    <BrowserRouter>
        <div>
            <AuthRoute></AuthRoute>
            <Switch>
            {/* <Redirect from="/" to="/me" exact></Redirect> */}
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={GeniusInfo}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Dashboard}></Route>
            </Switch>
        </div>
    </BrowserRouter>
</Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react'
import logoImg from './job.png'
import './logo.css'
export default class logo extends React.Component{
    render(){
        return(
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div> 
        )
    }
}
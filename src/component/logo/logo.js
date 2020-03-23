import React from 'react'
import './logo.css'
export default class logo extends React.Component{
    render(){
        return(
            <div className="logo-container">
                <img src={require('./job.png')} alt=""/>
            </div> 
        )
    }
}
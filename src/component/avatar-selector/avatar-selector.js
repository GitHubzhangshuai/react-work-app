 import React from 'react'
 import {Grid, List} from 'antd-mobile'
 import PropTypes from 'prop-types'


 class AvatarSelector extends React.Component{
     static propTypes = {
         selectAvatar: PropTypes.func.isRequired
     }
     constructor(props){
         super(props)
         this.state = {
             icon: ''
         }
     }
     render(){
         console.log(this.props)
         const avatar = this.props.avatar?require(`./img/${this.props.avatar}.png`):null
         const gridHeader = avatar?(
             <div>
                 <span>已选择头像</span>
                 <img style={{width:20}} alt='' src={avatar}/>
             </div>
         ):<div>请选择头像</div>
         const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(',').map(v => ({
             icon: require(`./img/${v}.png`),
             text: v
         }))
         return (
             <div>
                 <List renderHeader={()=>gridHeader}></List>
                 <Grid data={avatarList} onClick={elm => {this.props.selectAvatar(elm.text)}} columnNum={5}>头像选择</Grid>
             </div>
         )
     }
 }

 export default AvatarSelector
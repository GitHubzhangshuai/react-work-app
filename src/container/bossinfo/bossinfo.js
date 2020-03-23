import React from 'react'
import {NavBar,Icon, InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {update} from '../../store/user.redux'

@connect(
    state => state.user,
    {update}
)
class Bossinfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            money: '',
            company: '',
            desc: '',
            avatar: ''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
        <div>
            {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
            <NavBar 
            mode="dark"
            leftContent="Back"
            rightContent={[
                <Icon key="0" type="search" style={{marginRight:'16px'}}></Icon>,
                <Icon key="1" type="ellipsis"></Icon>
            ]}
            >
                Boss完善信息页
            </NavBar>
            <AvatarSelector avatar={this.state.avatar} selectAvatar={(imgname) => {
                this.setState({
                    avatar: imgname
                })
            }}></AvatarSelector>
            <InputItem onChange={v => this.onChange('title',v)}>
                招聘职位
            </InputItem>
            <InputItem onChange={v => this.onChange('company',v)}>
                公司名称
            </InputItem>
            <InputItem onChange={v => this.onChange('money',v)}>
                职位薪资
            </InputItem>
            <TextareaItem title="职位要求" rows={3} onChange={v => this.onChange('desc',v)}>
            </TextareaItem>
            <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
        </div>
        )
    }
}

export default Bossinfo
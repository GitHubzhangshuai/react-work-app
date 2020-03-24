export function getRedirectPath({type,avatar}){
    // genius 进入boss页 如果未填写信息则进入geniusinfo页
    // boss 进入genius页 如果未填写信息则进入bossinfo页
    let url = (type === 'boss')?'/genius':'/boss'
    if(!avatar){
        url = (type === 'boss')?'/boss':'/genius'
        url += 'info'
    }
    return url
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_')
}
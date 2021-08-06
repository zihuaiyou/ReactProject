/* 创建action对象 */
import {SAVE_USER_INFO,DELETE_USER_INFO} from '../constant'

export function createLoginAcion(data) {
    //客户端存储,为了实现免登陆
    localStorage.setItem('user',JSON.stringify(data.user));
    localStorage.setItem('token',data.token);
    return {type:SAVE_USER_INFO,data}
}
export function createDeleteUserInfoAcion(data) {
    //删除客户端存储
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return {type:DELETE_USER_INFO,data}
}
/* 自定义axios库 */
import axios from 'axios';
import { message } from 'antd';
//引入进度条相关的库
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '.././redux/store'
import { createDeleteUserInfoAcion } from '../redux/actions/login'

const instance = axios.create({
    timeout: 4000,
});

//配置axios请求拦截器
instance.interceptors.request.use((config) => {
    //添加进度条
    NProgress.start()
    const { token } = store.getState().userInfo;
    //验证token
    if (token) {
        config.headers.Authorization = "bearer " + token;
        NProgress.done()
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//配置axios响应拦截器
instance.interceptors.response.use((response) => {
    NProgress.done();
    return response.data;
}, (error) => {
    //当token失效后,不可访问admin页面
    if (error.response.status === 401) {
        message.error("用户登录状态已过期,请重新登录");
        store.dispatch(createDeleteUserInfoAcion())
    } else {
        message.error(error.message);
    }
    return Promise.reject(error);
});

export default instance;

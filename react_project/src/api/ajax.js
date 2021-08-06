import axios from 'axios';
import { message } from 'antd';
//引入进度条相关的库
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000,
});

//配置axios请求拦截器
instance.interceptors.request.use((config) => {
    //添加进度条
    NProgress.start()
    return config;
}, (error) => {
    return Promise.reject(error);
});

//配置axios响应拦截器
instance.interceptors.response.use((response) => {
    NProgress.done();
    return response.data;
}, (error) => {
    message.error(error.message);
    return Promise.reject(error);
});

export default instance;

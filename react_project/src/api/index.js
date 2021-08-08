/* 此文档包含所有的网络请求 */

//引入配置完拦截器的axios实例
import instance from './ajax';
import {BASE_URL,WEATHER_URL} from '../config'
//使用代理后要向代理服务器端口发送请求
//axios的post请求默认将数据转化为json发送给服务器
    //也可以使用queryString库的qs.stringify({username,password})将json转化成urlencoded形式

//用户登录请求
export const reqLogin = (values) => instance.post(`${BASE_URL}/login`, values);
//商品分类请求
export const reqCategoryList = () => instance.get(`${BASE_URL}/manage/category/list`);
//天气接口请求
export const reqWeather = () => instance.get(`${WEATHER_URL}`)


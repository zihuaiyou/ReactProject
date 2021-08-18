/* 此文档包含所有的网络请求 */

//引入配置完拦截器的axios实例
import instance from './ajax';
import { BASE_URL, WEATHER_URL } from '../config'
//使用代理后要向代理服务器端口发送请求
//axios的post请求默认将数据转化为json发送给服务器
//也可以使用queryString库的qs.stringify({username,password})将json转化成urlencoded形式

//用户登录请求
export const reqLogin = (values) => instance.post(`${BASE_URL}/login`, values);
//商品分类请求
export const reqCategoryList = () => instance.get(`${BASE_URL}/manage/category/list`);
//天气接口请求
export const reqWeather = () => instance.get(`${WEATHER_URL}`)
//增加商品分类请求
export const reqAddCategoryList = (categoryName) => instance.post(`${BASE_URL}/manage/category/add`, { categoryName })
//修改商品分类请求
export const reqUpdateCategoryList = (categoryId, categoryName) => instance.post(`${BASE_URL}/manage/category/update`, { categoryId, categoryName })
//商品分页列表请求
export const reqProductsList = (pageNum, pageSize) => instance.get(`${BASE_URL}/manage/product/list`, {
    params: {
        pageNum, pageSize
    }
})
//更新商品状态的请求
export const reqUpdateProductStatus = (productId, status) => instance.post(`${BASE_URL}/manage/product/updateStatus`, { productId, status });
//商品列表的搜索请求
export const reqSearchProductList = (pageNum, pageSize, searchType, keyword) => instance.get(`${BASE_URL}/manage/product/search`, {
    params: {
        pageNum,
        pageSize,
        [searchType]: keyword
    }
});
//商品详情的请求
export const reqProductListById = (productId) => instance.get(`${BASE_URL}/manage/product/info`, { params: { productId } });
//根据图片唯一名删除图片
export const reqDeletePicture = name => (instance.post(`${BASE_URL}/manage/img/delete`, { name }))
//新增商品信息
export const reqAddProduct = productObj => (instance.post(`${BASE_URL}/manage/product/add`, { ...productObj }))
//修改商品信息
export const reqUpdateProduct = productObj => (instance.post(`${BASE_URL}/manage/product/update`, { ...productObj }))
//获取角色列表请求
export const reqRoleList = (pageNum, pageSize) => instance.get(`${BASE_URL}/manage/role/list`, {
    params: {
        pageNum,
        pageSize
    }
});
//添加角色
export const reqAddRole = roleName => (instance.post(`${BASE_URL}/manage/role/add`, {roleName}));
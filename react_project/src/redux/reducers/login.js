/* 处理action对象 */
import { SAVE_USER_INFO, DELETE_USER_INFO } from "../constant";

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

//页面刷新,redux会初始化,所以应读取客户端存储数据
const initState = {
  user: user || {},
  token: token || "",
  isLogin: user && token ? true : false,
};
export default function loginReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_USER_INFO:
      let newState = { user: data.user, token: data.token, isLogin: true }
      return newState;
    case DELETE_USER_INFO:
      return { user: {}, token: "", isLogin: false }
    default:
      return preState;
  }
}

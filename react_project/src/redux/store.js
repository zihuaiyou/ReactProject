//引入中间件applyMiddleware
import { createStore, applyMiddleware, combineReducers } from 'redux';

//引入为组件服务的reducer
import loginReducer from './reducers/login';
import titleReducer from './reducers/left_Nav';
import productReducer from './reducers/product'

//引入thunk
import thunk from "redux-thunk";

//引入composeWithDevTools,为了使用redux开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'
import categoryReducer from './reducers/category';

//合并reducer
const allreducer = combineReducers({ userInfo: loginReducer, title: titleReducer, productInfo: productReducer, categoryInfo: categoryReducer })

//创建store对象;
export default createStore(allreducer, composeWithDevTools(applyMiddleware(thunk)));
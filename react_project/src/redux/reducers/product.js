/* 处理action对象 */
import { SAVE_PRODUCT_INFO } from "../constant";


const initState = [];

export default function productReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SAVE_PRODUCT_INFO:
            let newState = data;
            return newState;
        default:
            return preState;
    }
}

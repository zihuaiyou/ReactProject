/* 处理action对象 */
import { SAVE_CATEGORY_NAME } from "../constant";


const initState = []
  
export default function categoryReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_CATEGORY_NAME:
      let newState = data;
      return newState;
    default:
      return preState;
  }
}

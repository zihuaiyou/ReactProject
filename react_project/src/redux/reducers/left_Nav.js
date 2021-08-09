/* 处理action对象 */
import { SAVE_TITLE } from "../constant";


const initState = ""
  
export default function titleReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_TITLE:
      let newState = data;
      return newState;
    default:
      return preState;
  }
}

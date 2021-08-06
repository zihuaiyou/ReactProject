/* 处理action对象 */
import { TEST1, TEST2 } from "../constant";

const initState = "hello world";
export default function testReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case TEST1:
      return preState + data;
    case TEST2:
      return preState + data + "???";
    default:
      return preState;
  }
}

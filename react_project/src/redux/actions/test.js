/* 创建action对象 */
import {TEST1,TEST2} from '../constant'

export function createTest1Acion(data) {
    return {type:TEST1,data}
}

export function createTest2Acion(data) {
    return {type:TEST2,data}
}
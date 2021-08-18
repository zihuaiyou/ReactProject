/* 创建action对象 */
import {SAVE_PRODUCT_INFO} from '../constant'

export function createSaveProductInfoAction(data) {
    return {type:SAVE_PRODUCT_INFO,data}
}
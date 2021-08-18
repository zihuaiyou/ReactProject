/* 创建action对象 */
import {SAVE_CATEGORY_NAME} from '../constant'

export function createCategoryNameAction(data) {
    return {type:SAVE_CATEGORY_NAME,data}
}
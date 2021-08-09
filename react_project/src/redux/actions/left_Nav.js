/* 创建action对象 */
import {SAVE_TITLE} from '../constant'

export function createSaveTitleAction(data) {
    return {type:SAVE_TITLE,data}
}

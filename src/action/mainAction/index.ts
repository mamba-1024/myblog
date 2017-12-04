export const INDEX_SIDE_TYPE = 'INDEX_SIDE_TYPE';
export const GET_FEATCH = 'GET_FEATCH';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const HANDLE_SIDE_MENU = 'HANDLE_SIDE_MENU';
export const SET_OPEN_KEYS = 'SET_OPEN_KEYS';

// 获取side当前点击的类型
export function getSideType() {
    return {
        type: INDEX_SIDE_TYPE
    }
}
export function getFeatch(){
    return {
        type: GET_FEATCH,
    }
}
export function receiveData(params){
    return {
        type: RECEIVE_DATA,
        params
    }
}
export function handleSideMenu(params){
    return {
        type: HANDLE_SIDE_MENU,
        params
    }
}
export function setOpenKeys(params) {
    return {
        type: SET_OPEN_KEYS,
        params
    }
}
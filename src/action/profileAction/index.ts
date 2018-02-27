
export const GET_ARTICLE_LIST = ' GET_ARTICLE_LIST';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const UPDATE_VISIBLE = 'UPDATE_VISIBLE';
export const UPDATE_FETCHING = 'UPDATE_FETCHING';
export const DELETE_RECORD = 'DELETE_RECORD';
export const GET_ARTICLE_SINGLE = 'GET_ARTICLE_SINGLE';
export const RECEIVE_SINGLE_DATA = 'RECEIVE_SINGLE_DATA';

// 获取文章列表
export function get_article_list(params) {
    return {
        type: GET_ARTICLE_LIST,
        params
    }
}
// 得到数据
export function receive_data(params) {
    return {
        type: RECEIVE_DATA,
        params
    }
}
// 新增文章
export function add_article(params) {
    return {
        type: ADD_ARTICLE,
        params
    }
}
// 新增文章弹窗
export function update_visible(params) {
    return {
        type: UPDATE_VISIBLE,
        params
    }
}

export function update_fetching(params) {
    return {
        type: UPDATE_FETCHING,
        params
    }
}

export function delete_record(params) {
    return {
        type: DELETE_RECORD,
        params
    }
}

export function get_article_single(params) {
    return {
        type: GET_ARTICLE_SINGLE,
        params
    }
}

export function receive_single_data(params) {
    return {
        type: RECEIVE_SINGLE_DATA,
        params
    }
}
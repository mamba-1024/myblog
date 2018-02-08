import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
    GET_ARTICLE_LIST,
    get_article_list,
    receive_data,
    ADD_ARTICLE,
    update_visible,
    DELETE_RECORD
} from '../../action/profileAction';
import {
    getArticleList,
    approveRejectAPI,
    addArticleApi,
    deleteRecordApi
} from '../../api/profile/index';
import { message } from 'antd';

function* getData(params) {
    try {
        return yield getArticleList(params);
    } catch (error) {
        message.error(error.toString());
    }
}
function* addArticle(params) {
    try {
        return yield addArticleApi(params);
    } catch (error) {
        message.error(error.toString());
    }
}
function* deleteRecord(params) {
    try {
        return yield deleteRecordApi(params);
    } catch (error) {
        message.error(error.toString());
    }
}

function* getArticleAsync(obj) {
    const { type, params } = obj;
    switch (type) {
        case GET_ARTICLE_LIST: {
            yield
            let data = yield getData(params);
            if (data.success) {
                yield put(receive_data(data.data));
            }
        } break;
        case ADD_ARTICLE: {
            let data = yield addArticle(params)
            if (data.success) {
                message.success('添加成功')
                yield put(update_visible(false));
                yield put(get_article_list({}))
            }
        } break;
        case DELETE_RECORD: {
            let data = yield deleteRecord(params);
            if (data.success) {
                message.success('删除成功');
                yield put(get_article_list({}))
            }
        } break;
    }
}

export default function* watchProfilePage() {
    yield* takeEvery([
        GET_ARTICLE_LIST, ADD_ARTICLE, DELETE_RECORD
    ], getArticleAsync)
}
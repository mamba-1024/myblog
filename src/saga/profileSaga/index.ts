import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
    GET_ARTICLE_LIST,
    get_article_list,
    receive_data,
    ADD_ARTICLE,
    update_visible,
    DELETE_RECORD,
    update_fetching,
    GET_ARTICLE_SINGLE,
    receive_single_data,
    UPDATE_RECORD
} from '../../action/profileAction';
import {
    handleSideMenu
} from '../../action/mainAction'
import {
    getArticleList,
    approveRejectAPI,
    addArticleApi,
    deleteRecordApi,
    getArticleSingleApi,
    updateRecordApi
} from '../../api/profile/index';
import { message } from 'antd';
import { browserHistory } from 'react-router';

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
function* getArticleSingle(params) {
    try {
        return yield getArticleSingleApi(params)
    } catch (error) {
        message.error(error.toString());
    }
}
function* updateRecordSaga(params) {
    try {
        return yield updateRecordApi(params)
    } catch (error) {
        message.error(error.toString());
    }
}


function* getArticleAsync(obj) {
    const { type, params } = obj;
    switch (type) {
        case GET_ARTICLE_LIST: {
            let data = yield getData(params);
            if (data.success) {
                yield put(receive_data(data.data));
            } else {
                yield put(update_fetching(false));
                message.error(data.message);
            }
        } break;
        case ADD_ARTICLE: {
            let data = yield addArticle(params)
            if (data.success) {
                // 新增成功后跳转到首页
                message.success('添加成功', 1.5, () => {
                    browserHistory.push('dashboard');
                });

                const params = {
                    selectKey: 'dashboard',
                    pathName: ['dashboard']
                }
                yield put(handleSideMenu(params))
                sessionStorage.setItem('selectKey', name);
                // yield put(update_visible(false));
                // yield put(get_article_list({}))
            }
        } break;
        case DELETE_RECORD: {
            let data = yield deleteRecord(params);
            if (data.success) {
                message.success('删除成功');
                const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                const params = {
                    userId: userInfo.userId,
                    role: userInfo.role
                }
                yield put(get_article_list(params))
            }
        } break;
        case GET_ARTICLE_SINGLE: {
            let data = yield getArticleSingle(params);
            if (data.success) {
                yield put(receive_single_data(data.data));
            }
        } break;
        case UPDATE_RECORD: {
            let data = yield updateRecordSaga(params);
            const id = params.id;
            if (data.success) {
                message.success('更新成功', 1.5, () => {
                    browserHistory.push(`detail?id=${id}`);
                });
            }
        }
    }
}

export default function* watchProfilePage() {
    yield* takeEvery([
        GET_ARTICLE_LIST, ADD_ARTICLE, DELETE_RECORD, GET_ARTICLE_SINGLE,
        UPDATE_RECORD
    ], getArticleAsync)
}
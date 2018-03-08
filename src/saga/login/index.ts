import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
    LOGIN_ACTION,
    REGIST_ACTION,
    update_state
} from '../../action/login';
import {
    handleSideMenu
} from '../../action/mainAction'
import {
    registApi,
    loginApi
} from '../../api/profile';
import { message } from 'antd';
import { browserHistory } from 'react-router';


function* regist(param) {
    try {
        return yield registApi(param);
    } catch (error) {
        message.error(error.toString());
    }
}
function* login(param) {
    try {
        return yield loginApi(param);
    } catch (error) {
        message.error(error.toString());
    }
}

function* loginAsync(obj) {
    const { type, params } = obj;
    switch (type) {
        case REGIST_ACTION: {
            let data = yield regist(params);
            console.log(data)
            if (data.success && data.data.exist) {
                message.warning('已经注册，请登录');
            } else if (data.success && data.data.exist === false) {
                message.success('注册成功');
                yield put(update_state({ isDoing: 'login' }))
            } else {
                message.error('系统异常');
            }
        } break;
        case LOGIN_ACTION: {
            let data = yield login(params);
            console.log(data);
            if (data.success && data.data.flag) {
                message.success('登陆成功');
                browserHistory.push('dashboard');
                const params = {
                    selectKey: 'dashboard',
                    pathName: ['dashboard']
                }
                yield put(handleSideMenu(params));
                sessionStorage.setItem('selectKey', name);
                sessionStorage.setItem('userInfo', JSON.stringify(data.data.userInfo));
            } else if (data.success && data.data.flag === false) {
                message.warning(data.data.statusText);
            } else {
                message.error('系统异常');
            }
            yield put(update_state({loading: false}));
        }
    }
}

export default function* watchLoginAsync() {
    yield* takeEvery([REGIST_ACTION, LOGIN_ACTION], loginAsync)
}
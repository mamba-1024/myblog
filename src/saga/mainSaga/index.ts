import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { GET_FEATCH, receiveData } from '../../action/mainAction'
import { approveRejectAPI } from '../../api/mainApi'
import { message } from 'antd'

function* getData(param) {
    try {
        return yield approveRejectAPI(param);
    } catch (error) {
        message.error(error.toString());
    }
}

function* getMainAsync(obj) {
    const { type, params } = obj;
    switch (type) {
        case GET_FEATCH: {
            let data = yield getData(params);
            
            if (data.success) {
                yield put(receiveData(data.records));
            }
        } break;
    }
}

export default function* watchMainPage() {
    yield* takeEvery([GET_FEATCH], getMainAsync)
}

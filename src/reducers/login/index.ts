import * as Immutable from 'immutable';
import {
    LOGIN_ACTION,
    REGIST_ACTION,
    UPDATE_STATE
} from '../../action/login';

const initialState = Immutable.fromJS({
    isDoing: 'login', // 判断是登录还是注册
    loading: false,
});

export const loginPage = (state = initialState, action) => {
    const data = action.params;
    
    switch (action.type) {
        case UPDATE_STATE: {
            for (var key in data) {
                return state.update(key, () => Immutable.fromJS(data[key]))
            }
        }
        default: return state
    }
}
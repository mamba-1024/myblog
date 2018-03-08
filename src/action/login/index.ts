export const REGIST_ACTION = 'REGIST_ACTION';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const UPDATE_STATE = 'UPDATE_STATE';

export function regist_action(params) {
    return {
        type: REGIST_ACTION,
        params
    }
}

export function login_action(params) {
    return {
        type: LOGIN_ACTION,
        params
    }
}

export function update_state(params) {
    return {
        type: UPDATE_STATE,
        params
    }
}

import * as Immutable from 'immutable';
import {
    INDEX_SIDE_TYPE,
    RECEIVE_DATA,
    HANDLE_SIDE_MENU,
    SET_OPEN_KEYS,
} from "../../action/mainAction/index";

const sessionStorage_openKey = sessionStorage.getItem('selectKey');
const sessionStorage_pathName = JSON.parse(sessionStorage.getItem('pathName'));
const iscollapsed = JSON.parse(sessionStorage.getItem('collapsed'));
const initialState = Immutable.fromJS({
    collapsed: iscollapsed === null ? false : !iscollapsed,
    featchData: '',
    isFeatching: false,
    navJson: {},
    routerJson: {},
    openKeys: [''], // menu选中项
    selectKey: sessionStorage_openKey || 'dashboard', // 当前选中的key
    pathName: sessionStorage_pathName || ['dashboard']
});

export const mainPage = (state = initialState, action) => {
    const data = action.params;
    switch (action.type) {
        case INDEX_SIDE_TYPE: {
            return state.update('collapsed', (value: any) => {
                sessionStorage.setItem('collapsed', value);
                return !value
            });
        }
        case RECEIVE_DATA: {
            return state.update('featchData', () => Immutable.fromJS(data)).
                update('isFeatching', () => false)
        }
        case HANDLE_SIDE_MENU: {
            return state.update('selectKey', () => Immutable.fromJS(data.selectKey)).
                update('pathName', () => Immutable.fromJS(data.pathName))
        }
        case SET_OPEN_KEYS: {
            return state.update('openKeys', () => Immutable.fromJS(data))
        }
        default: return state;
    }
}
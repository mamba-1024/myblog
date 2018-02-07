import * as Immutable from 'immutable';
import {
    RECEIVE_DATA,
    UPDATE_VISIBLE,
    UPDATE_FETCHING
} from '../../action/profileAction';
import { stat } from 'fs';
import { triggerId } from 'async_hooks';

const initialState = Immutable.fromJS({
    dataSource: [],
    visible: false,
    fetching: false,
});

export const profilePage = (state = initialState, action) => {
    const data = action.params;
    switch (action.type) {
        case RECEIVE_DATA: {
            return state.update('dataSource', () => Immutable.fromJS(data)).
                update('fetching', () => Immutable.fromJS(false))
        };
        case UPDATE_VISIBLE: {
            return state.update('visible', () => Immutable.fromJS(data))
        };
        case UPDATE_FETCHING: {
            return state.update('fetching', () => Immutable.fromJS(data))
        }
        default: return state;
    }
}
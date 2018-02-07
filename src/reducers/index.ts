import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { mainPage } from "./mainPage";
import { profilePage } from './profile';

const indexReduces = combineReducers({
    mainPage,
    profilePage,
    routing: routerReducer
});

export default indexReduces;
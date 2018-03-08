import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { mainPage } from "./mainPage";
import { profilePage } from './profile';
import { loginPage } from './login';

const indexReduces = combineReducers({
    mainPage,
    profilePage,
    loginPage,
    routing: routerReducer
});

export default indexReduces;
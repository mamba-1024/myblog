import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { mainPage } from "./mainPage";

const indexReduces = combineReducers({
    mainPage,
    routing: routerReducer
});

export default indexReduces;
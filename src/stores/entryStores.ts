import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import indexReduces from '../reducers/index';
import { getSagaList } from '../saga/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// const sagaRun = sagaMiddleware.run;

// mount it on the Store
const stores = createStore(
    indexReduces,
    applyMiddleware(sagaMiddleware)
);

for (const saga in getSagaList) {
    // sagaRun( getSagaList[saga] )
    sagaMiddleware.run(getSagaList[saga])
}


export default stores
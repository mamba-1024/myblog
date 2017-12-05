import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import stores from './stores/entryStores';
import AppRouter from './router';
import './index.less';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

const history = syncHistoryWithStore(browserHistory, stores, {
    selectLocationState(state) {
        return state.get('routing');
    },
});

class Root extends React.Component<any, any> {
    render() {
        return (
            <Provider store={stores}>
                <AppRouter history={history} />
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
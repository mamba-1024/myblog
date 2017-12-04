import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Router, IndexRoute, Redirect } from 'react-router';
import * as mainPage from './pages/mainPage';
import * as Dashboard from './pages/dashboard';
import * as NoMatch from './pages/404'
import { routerNavJson } from './routerNavJson';

const lazyLoadComponent = (lazyModule) => {
    return (location, cb) => {
        lazyModule(module => cb(null, module.default));
    }
}

interface AppRouterType {
    dispatch: any;
    routerJson: any;
}
interface PassedProps extends React.Props<any> {
    history: any
}

class AppRouter extends React.Component<AppRouterType & PassedProps, any>{
    constructor(props) {
        super(props);
    }
    renderRoute = (routerJson) => {
        let routes = [];
        for (let index in routerJson) {
            let obj = routerJson[index];
            if (obj.path) {
                routes.push(
                    <Route path={obj.path} getComponent={lazyLoadComponent(obj.component)} />
                )
            }

        }
        return routes;
    }
    render() {
        const { history } = this.props;
        const routerProps = {
            getComponent: lazyLoadComponent(mainPage),
            ignoreScrollBehavior: true
        };
        const routers = this.renderRoute(routerNavJson);
        return (
            <Router history={history}>
                <Route path={'/'} {...this.props} {...routerProps}>
                    <IndexRoute getComponent={lazyLoadComponent(Dashboard)} />
                    {routers}
                    <Route path={`/*`} getComponent={lazyLoadComponent(NoMatch)} />
                </Route>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    // const data = state.getIn(['routerPermission']);
    return {
        // routerJson: data.getIn(['permission', 'routerJson']).toJS(),
        // navJson: data.getIn(['permission', 'navJson']).toJS(),
    }
}
export default connect<{}, {}, PassedProps>(mapStateToProps)(AppRouter)
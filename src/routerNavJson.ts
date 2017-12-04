import * as Dashboard from './pages/dashboard';
import * as Detail from './pages/profile/detail';
import * as Profile from './pages/profile/index';

export const routerNavJson = {
    'dashboard': {
        index: 1,
        name: "首页",
        type: "home",
        path: `dashboard`,
        component: Dashboard,
        className: 'homepage'       
    },
    'profiles': {
        index: 2,
        name: '详情页',
        type: 'file',
        children: ['detail', 'profile']
    },
    'profile': {
        index: 4,
        name: '详情页2',
        path: 'profile',
        component: Profile,
        parents: ['profile']
    },
    'detail': {
        index: 3,
        name: '详情页1',
        path: 'detail',
        component: Detail,
        parents: ['profile']
    }
}
import * as Dashboard from './pages/dashboard';
import * as Detail from './pages/profile/detail';
import * as Profile from './pages/profile/index';
import * as Tags from './pages/tags/index';
import * as About from './pages/about/index';

export const routerNavJson = {
    'dashboard': {
        index: 1,
        name: "首页",
        path: `dashboard`,
        component: Dashboard,
        className: 'homepage'       
    },
    'profiles': {
        index: 2,
        name: '文章',
        path: 'profiles',
        component: Profile,
        children: ['detail']
    },
    'detail': {
        index: 3,
        name: '详情页1',
        path: 'detail',
        component: Detail,
        parents: ['profile'],
        slideHide: true
    },
    'tag': {
        index: 4,
        name: 'Tag',
        path: 'tags',
        component: Tags,
    },
    'about': {
        index: 5,
        name: 'About',
        path: 'about',
        component: About,
    }

}
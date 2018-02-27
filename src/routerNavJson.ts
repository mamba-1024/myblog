import * as Dashboard from './pages/dashboard';
import * as Detail from './pages/profile/detail';
import * as Profile from './pages/profile/index';
import * as Tags from './pages/tags/index';
import * as About from './pages/about/index';
import * as NewArticle from './pages/profile/newArticle';
import * as UpdataArticle from './pages/profile/updateArticle';

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
        index: 21,
        name: '详情页',
        path: 'detail',
        component: Detail,
        parents: ['profile'],
        slideHide: true
    },
    'update': {
        index: 22,
        name: '修改页',
        path: 'update',
        component: UpdataArticle,
        parents: ['profile'],
        slideHide: true
    },
    'newArticle': {
        index: 3,
        name: '新建文章',
        path: 'newArticle',
        component: NewArticle,
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
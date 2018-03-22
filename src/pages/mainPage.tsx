import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Menu, Icon, Button, Dropdown, message } from 'antd';
const SubMenu = Menu.SubMenu;
import './mainPage.less';
import { getSideType, getFeatch, handleSideMenu, setOpenKeys } from '../action/mainAction/index';
import { routerNavJson } from '../routerNavJson';
import { select } from 'redux-saga/effects';
import * as _ from 'lodash';
import QueueAnim from 'rc-queue-anim';

interface AppProps {
  collapsed?: boolean,
  dispatch?: any,
  featchData?: any,
  children?: any,
  history?: any,
  openKeys?: any,
  selectKey?: any,
  pathName?: any,
  userInfo?: any,
}

class App extends React.Component<AppProps, any> {
  navNode: Array<any>;
  constructor(props) {
    super(props)
    this.state = {
      userName: null
    }
  }
  componentWillMount() {
    let userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      const userName = JSON.parse(userInfo).userName;
      this.setState({ userName });

      let pathname = window.location.href.indexOf('from') > 0 ? window.location.search.substr(1).split("=")[1] : location.pathname
      if (pathname === '/') {
        sessionStorage.clear();
        const params = {
          selectKey: 'dashboard',
          pathName: ['dashboard']
        }
        this.props.dispatch(handleSideMenu(params));
        sessionStorage.setItem('selectKey', 'dashboard');
      }
    } else {
      browserHistory.push('login');
    }
  }
  componentDidMount() {
    this.checkUserInfo();
  }
  checkUserInfo = () => {
    let userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      return
    } else {
      browserHistory.push('login');
    }
  }

  onCollapse = () => {
    const { dispatch } = this.props;
    dispatch(getSideType())
  }
  // onClick = () => {
  //   const { dispatch } = this.props;
  //   dispatch(getFeatch())
  // }
  renderNav = (routerNavJson) => {
    if (this.navNode) {
      return this.navNode;
    }
    console.time('renderNav');
    const deepReducer = (data, isChildren?: boolean) => {
      let navNode = [];
      for (let key in data) {
        const obj = data[key];
        if (!obj) continue;

        const {
          parents,
          children,
          path,
          name,
          type,
          slideHide,
          className,
          index,
        } = obj;

				/**
				 * 跳过需要隐藏的
				 */
        if (slideHide) continue;

				/**
				 * 父级
				 */
        if (!isChildren) {
          if (!parents) {
            if (path) {
              let nodeObj: any = {
                node: (
                  <Menu.Item className={className} key={path}>
                    <span>
                      {type && <Icon type={type} />}
                      <span className="nav-text">
                        {name}
                      </span>
                    </span>
                  </Menu.Item>
                ),
              }
              if (index !== undefined) {
                nodeObj.index = index;
              }
              navNode.push(nodeObj);
            }
            else {
              let nodeObj: any = {
                node: (
                  <SubMenu className={className} key={key}
                    title={
                      <span>
                        {type && <Icon type={type} />}
                        <span className="nav-text">
                          {name}
                        </span>
                      </span>
                    }>
                    {children && children.map(value => deepReducer({ [value]: routerNavJson[value] }, true))}
                  </SubMenu>
                )
              }
              if (index !== undefined) {
                nodeObj.index = index;
              }
              navNode.push(nodeObj);
            }
          }
        }
        /* 子级 */
        else {
          if (path) {
            navNode.push(
              <Menu.Item className={className} key={path}>
                <span>
                  {type && <Icon type={type} />}
                  <span className="nav-text">
                    {name}
                  </span>
                </span>
              </Menu.Item>
            );
          }
          else {
            navNode.push(
              <SubMenu className={className} key={key}
                title={
                  <span>
                    {type && <Icon type={type} />}
                    <span className="nav-text">
                      {name}
                    </span>
                  </span>
                }>
                {children && children.map(value => deepReducer({ [value]: routerNavJson[value] }, true))}
              </SubMenu>
            )
          }
        }
      }
      return navNode;
    }

		/**
		 * 按照索引排序从小到大
		 */
    let tempNavNode = deepReducer(routerNavJson).sort((obj1, obj2) => obj1.index > obj2.index ? 1 : 0);

		/**
		 * 取出需要的node
		 */
    this.navNode = tempNavNode.map(obj => obj.node);
    console.timeEnd('renderNav');
    return this.navNode;
  }
  handleClick(e) {
    let userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      sessionStorage.setItem('pathName', JSON.stringify(e.keyPath.reverse()));

      const { dispatch } = this.props;
      const params = {
        selectKey: e.key,
        pathName: e.keyPath
      }
      dispatch(handleSideMenu(params));
      sessionStorage.setItem('selectKey', e.key);
      browserHistory.push(e.key);
      // 如果是点击登出，清除登录信息
      if (e.key === 'login') {
        sessionStorage.removeItem('userInfo');
      }
    } else {
      message.warning('请重新登陆!', 1, () => {
        browserHistory.push('login');
      });
    }
  }
  onOpenChange(openKey) {
    const { dispatch } = this.props;
    dispatch(setOpenKeys(openKey));
  }
  handleClickLogin = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    browserHistory.push('login');
  }
  render() {

    const {
      collapsed,
      featchData,
      children,
      openKeys,
      selectKey,
      pathName,
      userInfo
    } = this.props;
    const navs = this.renderNav(routerNavJson);

    return (
      <div className='layout'>
        <QueueAnim delay={500} className='side' id={collapsed ? 'collapsed' : ''} type='left' duration={1000}>
          <div key='0' >
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onCollapse}
            />
          </div>
          {
            !collapsed &&
            <div key='1'>
              <div className="logo">
                <img src={require('../../public/kobe.jpg')} />
                <h2>{userInfo.userName ? userInfo.userName : this.state.userName}</h2>
              </div>
              <Menu
                selectedKeys={[selectKey]}
                mode="vertical"
                onClick={this.handleClick.bind(this)}
                onOpenChange={this.onOpenChange.bind(this)}
                style={{ width: '70%', margin: '0 auto' }}
                inlineCollapsed={collapsed}
              >
                {navs}
              </Menu>
            </div>
          }
        </QueueAnim>
        <div className='contents'>
          {children}
        </div>
        <div className='clear'></div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const data = state.get('mainPage');
  return {
    // collapsed: state.getIn(['mainPage', 'collapsed']),
    collapsed: data.get('collapsed'),
    featchData: data.get('featchData'),
    openKeys: data.get('openKeys'),
    selectKey: data.get('selectKey'),
    pathName: data.get('pathName'),
    userInfo: state.getIn(['loginPage', 'userInfo']).toJS()
  }
}
export default connect(mapStateToProps)(App);
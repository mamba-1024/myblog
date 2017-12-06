import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon, Button, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import './mainPage.less';
import { getSideType, getFeatch, handleSideMenu, setOpenKeys } from '../action/mainAction/index';
import { routerNavJson } from '../routerNavJson';
import { select } from 'redux-saga/effects';
import * as _ from 'lodash';

interface AppProps {
  collapsed?: boolean,
  dispatch?: any,
  featchData?: any,
  children?: any,
  history?: any,
  openKeys?: any,
  selectKey?: any,
  pathName?: any
}

class App extends React.Component<AppProps, any> {
  navNode: Array<any>;
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    let userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
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
  onCollapse = () => {
    const { dispatch } = this.props;
    dispatch(getSideType())
  }
  onClick = () => {
    const { dispatch } = this.props;
    dispatch(getFeatch())
  }
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
    sessionStorage.setItem('pathName', JSON.stringify(e.keyPath.reverse()));

    const { dispatch } = this.props;
    const params = {
      selectKey: e.key,
      pathName: e.keyPath
    }
    dispatch(handleSideMenu(params));
    sessionStorage.setItem('selectKey', e.key);
    browserHistory.push(e.key);
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
    const { collapsed, featchData, children, openKeys, selectKey, pathName } = this.props;
    const navs = this.renderNav(routerNavJson);
    const menu = (
      <Menu>
        <Menu.Item>
          <a href='#' onClick={this.handleClickLogin}><Icon type="logout" /> 退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          breakpoint="lg"
        >
          <div className="logo" >
            <a href="#" onClick={e=>e.preventDefault()}>
              <img src={require('../../public/favicon.ico')} alt="react-admin"/>
              <h1>React Admin</h1>
            </a>
          </div>
          <Menu
            theme="dark"
            selectedKeys={[selectKey]}
            mode="inline"
            onClick={this.handleClick.bind(this)}
            onOpenChange={this.onOpenChange.bind(this)}
          >
            {navs}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, paddingRight: 10, textAlign: 'right' }}>
            <Dropdown overlay={menu}>
              <span className="ant-dropdown-link" onClick={e => { e.preventDefault() }}>
                <Icon type="user" style={{ marginRight: 6 }} />
                {sessionStorage.getItem('userInfo')}
              </span>
            </Dropdown>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                pathName && pathName.map(ele => {
                  return <Breadcrumb.Item className="Item">{routerNavJson[ele].name}</Breadcrumb.Item>
                })
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 460 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React Admin ©2018 Created by Huang Ketong
          </Footer>
        </Layout>
      </Layout>
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
    pathName: data.get('pathName')
  }
}
export default connect(mapStateToProps)(App);
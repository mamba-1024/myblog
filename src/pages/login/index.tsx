import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {
    Form, Input, Button, Icon, Modal
} from 'antd';
const FormItem = Form.Item;
import './index.less';
import { browserHistory } from 'react-router';
import {
    handleSideMenu, HANDLE_SIDE_MENU
} from '../../action/mainAction'
import {
    regist_action,
    login_action,
    update_state
} from '../../action/login';
import {
    VERIFY_PHONE_REG
} from '../../util';


interface loginProps {
    form?: any,
    dispatch?: any,
    isDoing?: string,
    loading?: any
}
interface PassedProps extends React.Props<any> {
    // dispatch?: any,
    // isDoing?: string,
}

class Logins extends React.Component<loginProps, any>{
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        sessionStorage.removeItem('userInfo');
    }
    handleLogin = () => {
        this.props.dispatch(update_state({ loading: true }));

        this.props.form.validateFields((err, values) => {
            if (!err) {

                setTimeout(() => {
                    this.props.dispatch(login_action(values));
                }, 1500);
            }
        });
    }
    handleRegist = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(regist_action(values));
            }
        });
    }
    registAndLogin = (e) => {
        e.preventDefault();
        const { isDoing } = this.props;
        if (isDoing === 'login') {
            this.props.dispatch(update_state({ isDoing: 'regist' }))
        } else {
            this.props.dispatch(update_state({ isDoing: 'login' }))
        }
    }

    render() {
        const {
            isDoing,
            loading
        } = this.props;

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        }

        return (
            <div className='login'>
                <QueueAnim type='top' delay={500}>
                    <div key='0' className='blank'></div>
                    <div key='1' className='title'>
                        Blog
                    </div>
                    {
                        isDoing === 'login' ?
                            <Form key='2' className='formContent'>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }]
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }]
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary"
                                        onClick={this.handleLogin}
                                        loading={loading}
                                        className="login-form-button"
                                    >
                                        Log in
                                    </Button>
                                    <a href="#" onClick={this.registAndLogin}>register now!</a>
                                </FormItem>
                            </Form>
                            :
                            <Form key='3' className='formContent'>
                                <FormItem >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入用户名' }]
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem >
                                    {getFieldDecorator('passwords', {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem >
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入手机号码', pattern: VERIFY_PHONE_REG }]
                                    })(
                                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button className="login-form-button" type='primary'
                                        onClick={this.handleRegist}
                                    >注册</Button>
                                    <a href="#" onClick={this.registAndLogin}>使用已有账户登录</a>
                                </FormItem>
                            </Form>
                    }
                </QueueAnim>
            </div>
        )
    }
}

let Login = Form.create({})(Logins);

function mapStateToProps(state?: any) {
    let loginData = state.get('loginPage');

    return {
        isDoing: loginData.get('isDoing'),
        visible: loginData.get('visible'),
        loading: loginData.get('loading')
    }
}

export default connect<{}, {}, PassedProps>(mapStateToProps)(Login)
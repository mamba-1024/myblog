import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import './index.less';

interface loginProps {
    form?: any,
}

class Login extends React.Component<loginProps, any>{
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    componentWillMount() {
        sessionStorage.clear();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                sessionStorage.clear();
                sessionStorage.setItem('userInfo', values.userName);
                this.setState({
                    isLoading: true
                })
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                    });
                    browserHistory.push('dashboard');
                }, 2000);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading } = this.state;
        return (
            <div className='login-content'>
                <div className='header'>
                    <span>React Admin</span>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input style={{ height: 40 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input style={{ height: 40 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={isLoading}
                            style={{ width: '100%', height: 40 }}
                        >
                            Login
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}
let RootLogin = Form.create({})(Login);
export default connect(mapStateToProps)(RootLogin)
import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon, Button, Modal, Input, Form, Table } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import './index.less';
import { browserHistory } from 'react-router';
import {
    GET_ARTICLE_LIST,
    add_article,
    ADD_ARTICLE,
    UPDATE_VISIBLE,
    UPDATE_FETCHING,
    DELETE_RECORD,
} from '../../action/profileAction';

interface profileProps {
    dataSource?: any,
    dispatch?: any
    visible?: boolean,
    fetching?: boolean
}


class Profile extends React.Component<profileProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }
    handleClick = (id) => {
        browserHistory.push(`detail?id=${id}`);
    }

    componentWillMount() {
        const { dispatch } = this.props;

        dispatch({ type: GET_ARTICLE_LIST, params: {} });
        dispatch({
            type: UPDATE_FETCHING, params: true
        })
    }
    handleAdd = () => {
        this.props.dispatch({
            type: UPDATE_VISIBLE, params: true
        });
    }
    handleCancle = () => {
        this.props.dispatch({
            type: UPDATE_VISIBLE, params: false
        });
    }
    handleOnOk = () => {
        const {
            title,
            content
        } = this.state;
        let params = {
            title: title,
            content: content
        };
        console.log(params);
        const { dispatch } = this.props;
        dispatch({ type: ADD_ARTICLE, params: params });
    }
    handleChangeTitle = (e) => {
        let value = e.target.value;
        console.log(value);
        this.setState({
            title: value
        })
    }
    handleChangeContent = (e) => {
        let value = e.target.value;
        console.log(value);
        this.setState({
            content: value
        });
    }
    handleDelete = (record)=> {
        console.log(record);
        this.props.dispatch({
            type: DELETE_RECORD,
            params: record
        });
    }

    columns = [
        {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
        }, {
            title: 'title',
            key: 'title',
            dataIndex: 'title'
        }, {
            title: 'content',
            key: 'content',
            dataIndex: 'content'
        }, {
            title: '操作',
            key: 'action',
            render: (record)=><a href='#' onClick={e=>{e.preventDefault(), this.handleDelete(record)}}>删除</a>
        }
    ];
    render() {
        const {
            dataSource,
            visible,
            fetching
        } = this.props;


        return (
            <QueueAnim delay={500}>
                <div>
                    <Button type='primary'
                        onClick={this.handleAdd}
                    >新建</Button>
                    <Modal
                        visible={visible}
                        onOk={this.handleOnOk}
                        onCancel={this.handleCancle}
                        width='70%'
                    >
                        <Form>
                            <FormItem label='标题'>
                                <Input
                                    onChange={this.handleChangeTitle}
                                ></Input>
                            </FormItem>
                            <FormItem label='文章内容'>
                                <TextArea
                                    rows={4}
                                    onChange={this.handleChangeContent}
                                ></TextArea>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    loading={fetching}
                ></Table>
                <div key='pp' className='profile-content'>
                    <article className='post-article'>
                        <header className='post-header'>
                            <h2>
                                <a className='title'
                                    onClick={e => { e.preventDefault(), this.handleClick('111') }}
                                >my first atricle</a>
                            </h2>
                            <div className='post-meta'>
                                <span>发表于：</span>
                                <span>2017-12-19</span>
                                <span> | </span>
                                <span><Icon type="tags" /></span>
                                <span>
                                    <a>js</a>
                                    <a>es6</a>
                                </span>
                            </div>
                        </header>
                        <div className='post-content'>
                            <p>
                                窗前明月光，疑是地上霜。举头望明月，低头思故乡。
                            </p>
                        </div>
                    </article>
                    <article className='post-article'>
                        <header className='post-header'>
                            <h2>
                                <a className='title'>my first atricle</a>
                            </h2>
                            <div className='post-meta'>
                                <span>发表于：</span>
                                <span>2017-12-19</span>
                                <span> | </span>
                                <span><Icon type="tags" /></span>
                                <span>
                                    <a>js</a>
                                    <a>es6</a>
                                </span>
                            </div>
                        </header>
                        <div className='post-content'>
                            <p>
                                窗前明月光，疑是地上霜。举头望明月，低头思故乡。
                            </p>
                        </div>
                    </article>
                    <article className='post-article'>
                        <header className='post-header'>
                            <h2>
                                <a className='title'>my first atricle</a>
                            </h2>
                            <div className='post-meta'>
                                <span>发表于：</span>
                                <span>2017-12-19</span>
                                <span> | </span>
                                <span><Icon type="tags" /></span>
                                <span>
                                    <a>js</a>
                                    <a>es6</a>
                                </span>
                            </div>
                        </header>
                        <div className='post-content'>
                            <p>
                                窗前明月光，疑是地上霜。举头望明月，低头思故乡。
                            </p>
                        </div>
                    </article>
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state: any) {
    const data = state.get('profilePage');
    return {
        // dataSource: state.getIn(['profilePage', 'dataSource']),
        dataSource: data.get('dataSource').toJS(),
        visible: data.get('visible'),
        fetching: data.get('fetching')
    }
}

export default connect(mapStateToProps)(Profile)
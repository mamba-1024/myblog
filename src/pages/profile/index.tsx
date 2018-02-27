import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon, Button, Modal, Input, Form, Table, Spin } from 'antd';
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
const marked = require('marked');
// import highlight from 'highlight.js';

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

    handleDelete = (record) => {
        this.props.dispatch({
            type: DELETE_RECORD,
            params: record
        });
    }

    render() {
        const {
            dataSource,
            visible,
            fetching
        } = this.props;

        marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });

        return (
            <Spin spinning={fetching} size='large'>
                <QueueAnim delay={500}>
                    <div key='pp' className='profile-content'>
                        {
                            dataSource.length > 0 && dataSource.map(ele => {
                                return (
                                    <article className='post-article'>
                                        <header className='post-header'>
                                            <h2>
                                                <a className='title'
                                                    onClick={e => { e.preventDefault(), this.handleClick(ele.id) }}
                                                >{ele.title}</a>
                                                {/* <Button onClick={() => { this.handleDelete(ele) }}>删除</Button> */}
                                            </h2>
                                            <div className='post-meta'>
                                                <span>发表于：</span>
                                                <span>2017-12-19</span>
                                                <span> | </span>
                                                <span><Icon type="tags" /></span>
                                                {/* <span>
                                                <a>js</a>
                                                <a>es6</a>
                                            </span> */}
                                            </div>
                                        </header>
                                        <div className='post-content'>
                                            {
                                                ele.isMarkdown === 1 ?
                                                    <div dangerouslySetInnerHTML={{ __html: marked(ele.content) }}></div>
                                                    :
                                                    <div dangerouslySetInnerHTML={{ __html: ele.content }}></div>
                                            }

                                        </div>
                                    </article>
                                )
                            })

                        }
                        {/* <article className='post-article'>
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
                    </article> */}
                    </div>
                </QueueAnim>
            </Spin>
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
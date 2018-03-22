import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon, Button } from 'antd';
import './detail.less';
import { queryURL } from '../../util/index';
import {
    GET_ARTICLE_SINGLE,
} from '../../action/profileAction';
import * as moment from 'moment';
const marked = require('marked');
import * as hljs from 'highlight.js';
import { browserHistory } from 'react-router';

interface detailProps {
    article?: any,
    dispatch?: any
}

class Detail extends React.Component<detailProps, any> {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const id = queryURL('id');
        this.props.dispatch({
            type: GET_ARTICLE_SINGLE,
            params: { id: id }
        })
    }
    handleUpdate = () => {
        browserHistory.push('update');
    }

    render() {
        const {
            article
        } = this.props;
        marked.setOptions({
            // highlight: function (code) {
            //     return require('highlight.js').highlightAuto(code).value;
            // },
            highlight: function (code) {
                return hljs.highlightAuto(code).value
            },
            langPrefix: 'hljs lang-',
            renderer: new marked.Renderer(),
            gfm: true, //启动Github样式的Markdown
            breaks: true, // 支持Github换行符，必须打开gfm选项
            tables: true, // 支持Github表格，必须打开gfm选项
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
        });
        
        return (
            <QueueAnim delay={700} type='bottom'>
                <div key='dddddd' className='detail-contents'>
                    <h2 className='detail-title'>
                        <a>{article.title}</a>
                        <Button className='medifyBtn' size='small'
                            onClick={this.handleUpdate}
                        >修改</Button>
                    </h2>
                    <div className='summary'>
                        {/* <h4>前面的话</h4> */}
                        <p>概要: {article.summary}</p>
                    </div>
                    <hr />
                    <div className='detail-content'>
                        {
                            article.isMarkdown === 1 ?
                                <div dangerouslySetInnerHTML={{ __html: marked(article.content) }}></div>
                                // <div>{marked(article.content)}</div>
                                :
                                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        }
                    </div>
                    <hr />
                    <div className='post-meta'>
                        <span>发表于：</span>
                        <span>{moment(article.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        <span> | </span>
                        <span><Icon type="tags" /></span>
                        {/* <span>
                            <a>js</a>
                            <a>es6</a>
                        </span> */}
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state) {
    const data = state.get('profilePage');
    return {
        article: data.get('article').toJS(),
    }
}

export default connect(mapStateToProps)(Detail)
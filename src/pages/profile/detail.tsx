import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';
import './detail.less';
import { queryURL } from '../../util/index';
import {
    GET_ARTICLE_SINGLE,
} from '../../action/profileAction';
import * as moment from 'moment';
const marked = require('marked');

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

    render() {
        const {
            article
        } = this.props;
        console.log(article);
        return (
            <QueueAnim delay={700} type='bottom'>
                <div key='dddddd' className='detail-contents'>
                    <h2 className='detail-title'>
                        <a>{article.title}</a>
                    </h2>
                    <hr/>
                    <div className='detail-content'>
                        {
                            article.isMarkdown === 1 ?
                                <div dangerouslySetInnerHTML={{ __html: marked(article.content) }}></div>
                                :
                                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        }
                    </div>
                    <hr/>
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
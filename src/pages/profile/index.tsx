import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';
import './index.less';
import { browserHistory } from 'react-router';

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }
    handleClick = (id) => {
        browserHistory.push(`detail?id=${id}`);
    }
    render() {
        return (
            <QueueAnim delay={500}>
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

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Profile)
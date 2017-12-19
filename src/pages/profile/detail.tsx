import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';
import './detail.less';
import { queryURL } from '../../util/index';

interface detailProps {

}

class Detail extends React.Component<detailProps, any> {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const id = queryURL('id');
    }

    render() {
        return (
            <QueueAnim delay={700} type='bottom'>
                <div key='dddddd' className='detail-contents'>
                    <h2 className='detail-title'>
                        <a>my first article</a>
                    </h2>
                    <div className='detail-content'>
                        <p>窗前明月光，</p>
                        <p>疑是地上霜。</p>
                        <p>举头望明月，</p>
                        <p>低头思故乡。</p>
                    </div>
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
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Detail)
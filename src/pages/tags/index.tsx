import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Tag } from 'antd';

interface tagProps {

}

class Tags extends React.Component<tagProps, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <QueueAnim delay={500}>
                <div key='tt'>
                    <Tag  color="#87d068">前端</Tag>
                    <Tag>javascript</Tag>
                    <Tag color="#2db7f5">React</Tag>
                    <Tag>Redux</Tag>
                    <Tag color="#f50">ES6</Tag>
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}
export default connect(mapStateToProps)(Tags);
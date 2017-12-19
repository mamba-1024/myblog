import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

interface aboutProps {

}

class About extends React.Component<aboutProps, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <QueueAnim delay={500}>
                <div key='aa'>
                    about
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}
export default connect(mapStateToProps)(About);
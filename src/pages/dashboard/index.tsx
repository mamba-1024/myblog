import * as React from 'react';
import { connect } from 'react-redux';

interface DashboardPropsType {

}

class Dashboard extends React.Component<DashboardPropsType, any>{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            < div >
                Dashboard
            </div >
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}

export default connect(mapStateToProps)(Dashboard)

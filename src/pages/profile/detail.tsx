import * as React from 'react';
import {connect} from 'react-redux';

class Detail extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>Detail</div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(Detail)
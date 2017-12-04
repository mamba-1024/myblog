import * as React from 'react';
import { connect } from 'react-redux';

interface NoMatchTypes{

}

class NoMatch extends React.Component<NoMatchTypes, any>{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h3>404</h3>
                <p>你没有权限。。。</p>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}

export default connect(mapStateToProps)(NoMatch)
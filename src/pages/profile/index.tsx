import * as React from 'react';
import { connect } from 'react-redux';
 
class Profile extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='content.inner'>
                this is profile paage
            </div>
        )
    }
}

function mapStateToProps(state){    
    return {

    }
}

export default connect(mapStateToProps)(Profile)
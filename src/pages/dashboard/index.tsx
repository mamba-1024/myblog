import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';


interface DashboardPropsType {

}

class Dashboard extends React.Component<DashboardPropsType, any>{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    render() {
        const {
            editorState
        } = this.state;

        return (
            <QueueAnim delay={500}>
                <div key='dd'>
                    <h3>
                        welcome to my blog!
                    </h3>

                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}

export default connect(mapStateToProps)(Dashboard)

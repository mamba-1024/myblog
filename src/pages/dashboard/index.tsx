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
            editorState: EditorState.createEmpty(),
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
        console.log(editorState);
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

                    <Editor
                        localization={{ locale: 'zh' }}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        initialEditorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
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

import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Input, Button, Row, Col } from 'antd';
import './newArticle.less';

interface newArticlePorps {

}

class NewArticle extends React.Component<newArticlePorps, any>{
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }


    render() {
        const {
            editorState
        } = this.state;
        return (
            <QueueAnim delay={400}>
                <div id='newArticle'>
                    <div className='titleContent'>
                        <p>文章标题:</p>
                        <div >
                            <Input style={{ width: '50%' }} size='large' />
                        </div>
                    </div>
                    <div>
                        <Editor
                            localization={{ locale: 'zh' }}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            initialEditorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                        <textarea
                            style={{ display: 'none' }}
                            disabled
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state: any) {
    return {

    }
}

export default connect(mapStateToProps)(NewArticle)
import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { Input, Button, Row, Col, Switch, Icon, Modal, message, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import './newArticle.less';
import { request } from '../../util/request';
import 'whatwg-fetch';
import {
    add_article,
    ADD_ARTICLE,
} from '../../action/profileAction';
const { TextArea } = Input;
const marked = require('marked');

interface newArticlePorps {
    dispatch?: any
}

class NewArticle extends React.Component<newArticlePorps, any>{
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            articleTitle: null,
            articleContent: '',
            isMarkdown: false, // 是否启用Markdown语法，默认false 不启用
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            articleContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        // console.log(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    }
    handleInput = (e) => {
        let value = e.target.value;
        this.setState({
            articleTitle: value
        });
    }
    handleCommit = () => {
        const {
            articleTitle,
            articleContent,
            isMarkdown
        } = this.state;
        const { dispatch } = this.props;
        // 判断是否已经输入标题和内容
        if (articleTitle && articleContent) {
            let params = {
                title: articleTitle,
                content: articleContent,
                isMarkdown: isMarkdown
            };
            dispatch({ type: ADD_ARTICLE, params: params });
        } else {
            message.warning('请输入文章标题和内容');
        }

    }
    uploadCallback(file) {
        let formData = new FormData();
        formData.append('image', file);

        return new Promise(
            (resolve, reject) => {
                fetch('http://127.0.0.1:7001/news/upload', {
                    method: 'POST',
                    body: formData,
                }).then(res => {
                    return res.json()
                }).then(res => {
                    console.log('res:', res);
                    resolve({ data: { link: res.url } })
                }).catch(err => {
                    console.log('err', err)
                    reject(err)
                })
            }
        );
    }
    handleSwitch = (e) => {
        const {
            isMarkdown
        } = this.state;

        Modal.confirm({
            title: '要切换输入方式？',
            content: isMarkdown ? '是否切换为编辑器输入' : '是否使用Markdown语法编辑',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setState({ isMarkdown: e, articleContent: '' })
            },
            onCancel() { },
        });
    }
    onChangeTextArea = (e) => {
        this.setState({
            articleContent: e.target.value
        })
    }

    render() {
        const {
            editorState,
            isMarkdown,
            articleContent
        } = this.state;
        const toolbarConfig = {
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
            image: {
                // 上传本地图片到云
                // uploadCallback: this.uploadCallback,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            }
        };
        const editorStyle = {
            border: '1px solid #F1F1F1',
            padding: 5,
            borderRadius: 2,
            minHeight: 340,
        };

        return (
            <QueueAnim delay={400}>
                <div key='newArticle'>
                    <div className='titleContent'>
                        <p>文章标题:</p>
                        <div >
                            <Input style={{ width: '50%' }}
                                onChange={this.handleInput}
                                size='large' />
                        </div>
                    </div>
                    <div className='articleContent'>
                        <p>文章内容:
                            <span className='switch'>(是否启用Markdown语法)</span>
                            <Switch size='small'
                                onChange={this.handleSwitch}
                                checked={isMarkdown}
                                checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                        </p>
                        {
                            isMarkdown ?
                                <Tabs>
                                    <TabPane tab='输入' key='1'>
                                        <TextArea rows={18} placeholder='使用Markdown语法'
                                            onChange={this.onChangeTextArea}
                                        />
                                    </TabPane>
                                    <TabPane tab='预览' key='2'>
                                        <div style={{border: '1px solid #ddd', minHeight: 400, padding: 12}}>
                                            <div dangerouslySetInnerHTML={{ __html: marked(articleContent) }}></div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                                :
                                <Editor
                                    localization={{ locale: 'zh' }}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    initialEditorState={editorState}
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={toolbarConfig}
                                    editorStyle={editorStyle}
                                />
                        }

                        <textarea
                            style={{ display: 'none' }}
                            disabled
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                    </div>
                    <div className='tagContent'>

                    </div>
                    <div>
                        <Button type='primary'
                            onClick={this.handleCommit}
                        >提交</Button>
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
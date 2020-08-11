import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmltodraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default class richtext extends Component {
  state = {
    editorState: EditorState.createEmpty(), //初始化一个编辑器状态
  };
  //根据富文本还原成文本,以及编辑器状态
  setRichText = (html) => {
    const cBlock = htmltodraft(html);
    if (cBlock) {
      const cState = ContentState.createFromBlockArray(cBlock.contentBlocks);
      const editorState = EditorState.createWithContent(cState);
      this.setState({
        editorState,
      });
    }
  };
  //获取效果文本对应的富文本
  getRichText = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  //当富文本内容改变时 调用onEditorStateChange
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState} //编辑器的状态
        // wrapperClassName="demo-wrapper"
        // editorClassName="demo-editor"
        editorStyle={{
          //editor样式
          border: "1px solid black",
          paddingLeft: "10px",
          minHeight: "200px",
          lineHeight: "10px",
        }}
        onEditorStateChange={this.onEditorStateChange} //编辑器改变的回调
      />
    );
  }
}

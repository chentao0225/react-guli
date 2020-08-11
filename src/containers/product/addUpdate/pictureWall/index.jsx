import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDelImg } from "../../../../api";
const IMG_BASE_URL = "http://localhost:4000/upload/";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      //   {
      //     uid: '-1',
      //     name: 'image.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   }
    ],
  };
  setFileListByImgName = (nameArr) => {
    let fileList = [];
    nameArr.forEach((name, index) => {
      fileList.push({
        uid: index,
        name,
        status: "done",
        url: IMG_BASE_URL + name,
      });
    });
    this.setState({ fileList });
  };
  //获取上传图片数组
  getImgNameArr = () => {
    let arr = [];
    this.state.fileList.forEach((item, index) => {
      arr.push(item.name);
    });
    return arr;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async (info) => {
    const { file, fileList } = info;
    // console.log(file, fileList);
    if (file.status === "done") {
      const { status, data } = file.response;
      if (status === 0) {
        message.success("图片上传成功");
        const { name, url } = data;
        // console.log(data);
        fileList[fileList.length - 1].name = name;
        fileList[fileList.length - 1].url = url;
      }
    } else if (file.status === "removed") {
      let res = await reqDelImg(file.name);
      const { status } = res;
      if (status === 0) message.success("删除图片成功");
      else message.error("删除图片失败");
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Upload, Modal,message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../../config";
import {reqDeletePicture} from '../../../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
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

//获取该商品对应的图片名字，构建一个数字，供新增商品使用
  getImgArr = () => {
    let result = [];
    const { fileList } = this.state;
    fileList.forEach((file) => {
      result.push(file.name);
    });
    return result;
  };

//回显图片
  setImgArr = (imgs) => {
    let fileList = [];
    imgs.forEach((img, index) => {
      let file = {
        uid: -index,
        name: img,
        url: `${BASE_URL}/upload/${img}`,
      };
      fileList.push(file);
    });
    this.setState({
      fileList,
    });
  };

  handleChange = async({ file, fileList }) => {
    //如果文件上传成功
    if (file.status === "done") {
      const { status, data } = file.response;
      if (status === 0) {
        const { url, name } = data;
        file.url = url;
        file.name = name;
      }
    } else if (file.status === "removed") {
      //获取要删除文件的名称
      const { name } = file;
      //删除图片
      const { status, msg } = await reqDeletePicture(name);
      if (status === 0) {
        message.success("文件删除成功", 2);
      } else {
        message.error(msg, 2);
      }
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
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
      </>
    );
  }
}

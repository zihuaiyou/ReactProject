import React, { Component } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  reqAddProduct,
  reqCategoryList,
  reqProductListById,
  reqUpdateProduct
} from "../../../../api";
import PicturesWall from "./pictureWall";
import RichTextEditor from "./richTextEditor";

const { Item } = Form;
const { Option } = Select;

class AddUpdate extends Component {
  formRef = React.createRef();
  state = {
    categoryList: [],
    operationType: "add",
    name: "",
    price: "",
    desc: "",
    categoryId: "",
    _id: "",
    imgs: [],
    detail: "",
  };
  componentDidMount() {
    const { categoryList } = this.props;
    if (categoryList.length) this.setState({ categoryList });
    else this.getCategoryList();
    const { id } = this.props.match.params;
    //修改商品的逻辑
    if (id) {
      this.setState({ operationType: "update" });
      //如果页面不刷新,redux中有state
      if (this.props.productInfo.length) {
        let productObj = this.props.productInfo.find((item) => {
          return item._id === id;
        });
        this.setState({ ...productObj }, () => {
          //初始化表单列表
          this.formRef.current.resetFields();
          this.handlePic.setImgArr(this.state.imgs);
          this.handleDetail.setRichText(this.state.detail);
        });
      } else this.getProductById(id);
    }
  }
  //获取商品分类列表的网络请求
  getCategoryList = async () => {
    let result = await reqCategoryList();
    const { status, data, msg } = result;
    if (status === 0) {
      this.setState({ categoryList: data });
    } else message.error(msg);
  };

  onFinish = async (values) => {
    let imgs = this.handlePic.getImgArr();
    let detail = this.handleDetail.getRichText();
    const _id = this.state._id;
    let result;
    if (this.state.operationType === "add") {
      result = await reqAddProduct({ ...values, imgs, detail });
    } else {
      result = await reqUpdateProduct({ ...values, imgs, detail,_id});
    }
      const { status, msg } = result;
      if (status === 0) {
        message.success("操作商品成功");
        this.props.history.replace("/admin/goods/products");
      } else message.error(msg);
    
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  getProductById = async (id) => {
    let result = await reqProductListById(id);
    const { status, data } = result;
    if (status === 0) {
      this.setState({ ...data }, () => {
        this.formRef.current.resetFields();
        this.handlePic.setImgArr(this.state.imgs);
        this.handleDetail.setRichText(this.state.detail);
      });
    }
  };
  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Button type="link" onClick={() => this.props.history.goBack()}>
                <ArrowLeftOutlined />
                返回
              </Button>
              <span>
                {this.state.operationType === "add" ? "添加商品" : "修改商品"}
              </span>
            </div>
          }
        >
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 5,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            ref={this.formRef}
          >
            <Item
              label="商品名称"
              name="name"
              initialValue={this.state.name || ""}
              rules={[
                {
                  required: true,
                  message: "请输入商品名称!",
                },
              ]}
            >
              <Input placeholder="商品名称" />
            </Item>

            <Item
              label="商品描述"
              name="desc"
              initialValue={this.state.desc || ""}
              rules={[
                {
                  required: true,
                  message: "请输入商品描述!",
                },
              ]}
            >
              <Input placeholder="商品描述" />
            </Item>
            <Item
              label="商品价格"
              name="price"
              initialValue={this.state.price || ""}
              rules={[
                {
                  required: true,
                  message: "请输入商品价格!",
                },
              ]}
            >
              <Input
                placeholder="商品价格"
                prefix="¥"
                addonAfter="元"
                type="number"
              />
            </Item>
            <Item
              label="商品分类"
              name="categoryId"
              initialValue={this.state.categoryId || ""}
              rules={[
                {
                  required: true,
                  message: "请选择商品分类!",
                },
              ]}
            >
              <Select placeholder="请选择分类">
                {this.state.categoryList.map((item) => {
                  return (
                    <Option value={item._id} key={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
                <Option value="demo1">Demo1</Option>
              </Select>
            </Item>
            <Item
              label="商品图片"
              wrapperCol={{
                span: 10,
              }}
            >
              <PicturesWall
                ref={(currentNode) => (this.handlePic = currentNode)}
              />
            </Item>

            <Item
              label="商品详情"
              wrapperCol={{
                span: 12,
              }}
            >
              <RichTextEditor
                ref={(currentNode) => (this.handleDetail = currentNode)}
              />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "350px", width: "100px" }}
              >
                提交
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    categoryList: state.categoryInfo,
    productInfo: state.productInfo,
  }),
  {}
)(AddUpdate);

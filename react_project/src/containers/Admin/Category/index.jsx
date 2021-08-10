import React, { Component } from "react";
import { Button, Card, Table, message, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { reqCategoryList, reqAddCategoryList } from "../../../api";
import { PAGE_SIZE } from "../../../config";

const { Item } = Form;

export default class Category extends Component {
  state = {
    categoryList: [],
    visible: false,
    operationTpye: "",
    isLoading: true,
  };

  //React.createRef()创建容器
  formRef = React.createRef();

  componentDidMount() {
    this.getCategoryList();
  }

  //获取商品分类列表的回调
  getCategoryList = async () => {
    let result = await reqCategoryList();
    if (result.status !== 0) message.error(result.msg);
    else
      this.setState({ categoryList: result.data.reverse(), isLoading: false });
  };

  //显示添加商品模态框的回调
  showAddModal = () => {
    this.setState({ visible: true, operationTpye: "add" });
  };

  //显示修改商品模态框的回调
  showUpdateModal = () => {
    this.setState({ visible: true, operationTpye: "update" });
  };

  //处理点击模态框确认按钮的回调
  handleOk = async () => {
    try {
      if (this.state.operationTpye === "add") {
        let { categoryName } = await this.formRef.current.validateFields();
        this.handleToAdd(categoryName);
      }
    } catch (error) {
      message.error("数据输入有误请检查");
    }
  };

  //处理增加商品分类名的回调
  handleToAdd = async (categoryName) => {
    let { status, msg } = await reqAddCategoryList(categoryName);
    if (status === 0) {
      message.success("新增商品分类成功");
      this.getCategoryList();
      this.setState({ visible: false });
      this.formRef.current.resetFields();
    } else {
      message.error(msg);
    }
  };

  //处理点击模态框取消按钮的回调
  handleCancel = () => {
    this.setState({ visible: false });
    //重置表单
    this.formRef.current.resetFields();
  };
  render() {
    const dataSource = this.state.categoryList;
    const columns = [
      {
        title: "分类名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        dataIndex: "do",
        key: "do",
        align: "center",
        width: "25%",
        render: (a) => {
          return (
            <Button type="link" onClick={this.showUpdateModal}>
              修改分类
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        <Card
          title="商品分类列表"
          extra={
            <Button type="primary" onClick={this.showAddModal}>
              <PlusCircleOutlined />
              添加
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey={"_id"}
            pagination={{ pageSize: PAGE_SIZE }}
            loading={this.state.isLoading}
          />
          ;
        </Card>
        <Modal
          title={this.state.operationTpye === "add" ? "添加分类" : "修改分类"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
          >
            <Item
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "分类名不能为空",
                },
              ]}
            >
              <Input placeholder="请输入分类名" />
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

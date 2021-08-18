import React, { Component } from "react";
import { Button, Card, Table, message, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  reqCategoryList,
  reqAddCategoryList,
  reqUpdateCategoryList,
} from "../../../api";
import { PAGE_SIZE } from "../../../config";
import { connect } from "react-redux";
import { createCategoryNameAction } from "../../../redux/actions/category";

const { Item } = Form;

class Category extends Component {
  state = {
    categoryList: [], //商品分类列表
    visible: false, //modal框是否可见
    operationTpye: "", //修改分类或添加分类
    isLoading: true, //是否在加载中
    categoryId: "", //商品分类id
    categoryName: "", //商品分类名 ---用于数据回显
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
    else {
      this.setState({ categoryList: result.data.reverse(), isLoading: false });
      this.props.getCategoryInfo(result.data);
    }
  };

  //显示添加商品模态框的回调
  showAddModal = () => {
    this.setState(
      { visible: true, operationTpye: "add", categoryName: "" },
      //setState第二个可选的回调会在render后调用
      //这个回调强制刷新表单,更新表单initialValue
      () => this.formRef.current.resetFields()
    );
  };

  //显示修改商品模态框的回调
  showUpdateModal = (item) => {
    const { _id, name } = item;
    //实现数据回显
    this.setState(
      {
        visible: true,
        operationTpye: "update",
        categoryName: name,
        categoryId: _id,
      },
      () => {
        //重置表单
        this.formRef.current.resetFields();
      }
    );
  };

  //处理点击模态框确认按钮的回调
  handleOk = async () => {
    try {
      let { categoryName } = await this.formRef.current.validateFields();
      if (this.state.operationTpye === "add") {
        this.handleToAdd(categoryName);
      } else {
        const { categoryId } = this.state;
        console.log(categoryName, categoryId);

        this.handleToupdate(categoryId, categoryName);
      }
    } catch (error) {
      message.warn("数据输入有误请检查");
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
    } else message.error(msg);
  };

  //处理修改商品分类名的回调
  handleToupdate = async (id, name) => {
    let result = await reqUpdateCategoryList(id, name);
    const { status, msg } = result;
    if (status === 0) {
      message.success("更新商品分类名成功");
      this.getCategoryList();
      this.setState({ visible: false });
      this.formRef.current.resetFields();
    } else message.error(msg);
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
        // dataIndex: "do",
        key: "do",
        align: "center",
        width: "25%",
        render: (item) => {
          return (
            <Button type="link" onClick={() => this.showUpdateModal(item)}>
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
            pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
            loading={this.state.isLoading}
          />
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
            ref={this.formRef}
            initialValues={{ categoryName: this.state.categoryName }}
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

export default connect((state) => ({}), { getCategoryInfo: createCategoryNameAction })(
  Category
);

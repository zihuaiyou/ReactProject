import React, { Component } from "react";
import { Button, Card, Table, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../../config";
import { reqRoleList, reqAddRole } from "../../../api";

const { Item } = Form;

export default class Role extends Component {
  state = {
    addvisible: false,
    AuthVisable: false,
    current: 1,
    roleList: [],
    total: 0,
  };

  formRef = React.createRef();

  componentDidMount() {
    const { current } = this.state;
    this.getRoleList(current, PAGE_SIZE);
  }
  getRoleList = async (current, pagesize) => {
    let result = await reqRoleList(current, pagesize);
    const { status, data, msg } = result;
    if (status === 0) {
      const { list, total } = data;
      this.setState({
        roleList: list,
        current,
        total,
      });
    } else {
      message.error(msg, 2);
    }
  };
  showAddModal = () => {
    this.setState({ visible: true });
  };
  showSetPermissionModal = () => {
    this.setState({ AuthVisable: true });
  };
  handleAddOk = async () => {
    try {
      let { roleName } = await this.formRef.current.validateFields();
      this.setState({ visible: false });
      this.addRoleName(roleName);
    } catch (error) {
      message.warn("数据输入有误请检查");
    }
  };
  handleAddCancel = () => {
    this.setState({ visible: false });
  };
  handleAuthOkModal = () => {
    this.setState({ AuthVisable: false });
  };
  handleAuthCancelModal = () => {
    this.setState({ AuthVisable: false });
  };
  addRoleName = async (roleName) => {
    let result = await reqAddRole(roleName);
    const { status, msg } = result;
    if (status === 0) {
      message.success("角色添加成功");
      this.getRoleList(1, PAGE_SIZE);
    } else message.error(msg);
  };
  handlePageChange = (pageNum) => {
    this.getRoleList(pageNum,PAGE_SIZE);
  };

  columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (item) => (item ? new Date(item).toLocaleString() : ""),
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      key: "auth_time",
      render: (item) => (item ? new Date(item).toLocaleString() : ""),
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
      key: "auth_name",
    },
    {
      title: "操作",
      //   dataIndex: "operator",
      key: "operator",
      width: "25%",
      align: "center",
      render: () => {
        return (
          <Button type="link" onClick={this.showSetPermissionModal}>
            设置权限
          </Button>
        );
      },
    },
  ];
  render() {
    return (
      <div>
        <Card
          title={
            <Button type="primary" onClick={this.showAddModal}>
              <PlusOutlined />
              <span>新增角色</span>
            </Button>
          }
        >
          <Table
            dataSource={this.state.roleList}
            columns={this.columns}
            rowKey={"_id"}
            pagination={{
              total: this.state.total,
              pageSize: PAGE_SIZE,
              current: this.state.current,
              onChange: this.handlePageChange,
            }}
            bordered
          />
          ;
        </Card>
        {/* 新增角色模态框 */}
        <Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form name="basic" ref={this.formRef}>
            <Item
              name="roleName"
              rules={[
                {
                  required: true,
                  message: "角色名不能为空",
                },
              ]}
            >
              <Input placeholder="请输入角色名" />
            </Item>
          </Form>
        </Modal>
        {/* 设置权限模态框 */}
        <Modal
          title={`设置权限`}
          visible={this.state.AuthVisable}
          onOk={this.handleAuthOkModal}
          onCancel={this.handleAuthCancelModal}
          okText="确认"
          cancelText="取消"
        >
          此处为权限列表
        </Modal>
      </div>
    );
  }
}

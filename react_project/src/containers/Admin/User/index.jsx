import React, { Component } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  reqUserList,
  reqAddUser,
  reqDeleteUser,
  reqUpdateUser,
} from "../../../api";

const { Option } = Select;
const { Item } = Form;

/**
 * 用户管理路由组件
 */
export default class User extends Component {
  FormRef = React.createRef();

  state = {
    userList: [], //用户列表
    visible: false,
    roleList: [], //角色列表
    operationType: "",
    user: {},
  };

  componentDidMount = () => {
    this.getUserList();
  };

  getUserList = async () => {
    const { status, data, msg } = await reqUserList();
    if (status === 0) {
      const { users, roles } = data;
      this.setState({
        userList: users,
        roleList: roles,
      });
    } else {
      message.error(msg, 2);
    }
  };

  //新增用户确认的模态框
  handleOkModal = async () => {
    try {
      const user = await this.FormRef.current.validateFields();
      if (this.state.operationType === "add") this.handleToAdd(user);
      else this.handleToUpdate(user);
    } catch (e) {
      message.error("表单输入有误，请检查", 2);
    }
  };

  /**
   * 删除用户
   * @param item
   */
  showDeleteUser = (item) => {
    return () => {
      const { _id: id } = item;
      Modal.confirm({
        title: "确认删除吗",
        icon: <ExclamationCircleOutlined />,
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          const { status, msg } = await reqDeleteUser(id);
          if (status === 0) {
            message.info("删除成功", 2);
            this.getUserList();
          } else {
            message.error(msg, 2);
          }
        },
      });
    };
  };

  showUpdateUser = (id) => {
    const user = this.state.userList.find((item) => item._id === id);
    this.setState({ visible: true, operationType: "update", user }, () => {
      //重置表单
      this.FormRef.current.resetFields();
    });
    this._id = id;
  };

  showAddModal = () => {
    //显示模态框
    this.setState({ visible: true, operationType: "add", user: {} }, () => {
      //重置表单
      this.FormRef.current.resetFields();
    });
  };

  handleToAdd = async (user) => {
    const { status, msg } = await reqAddUser(user);
    if (status === 0) {
      message.success("新增用户成功", 2);
      this.setState({ visible: false }, () => {
        this.getUserList();
        this.FormRef.current.resetFields();
      });
    } else {
      message.error(msg, 2);
    }
  };

  handleToUpdate = async (user) => {
    const _id = this._id;
    const { status, msg } = await reqUpdateUser({ ...user, _id });

    if (status === 0) {
      message.success("修改用户成功", 2);
      this.setState({ visible: false }, () => {
        this.getUserList();
        this.FormRef.current.resetFields();
      });
    } else {
      message.error(msg, 2);
    }
  };

  render() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (item) => {
          if (item) {
            return new Date(item).toLocaleString();
          }
          return item;
        },
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id",
        render: (item) => {
          if (item) {
            const { roleList } = this.state;
            if (roleList.length) {
              let role = roleList.find((role) => {
                return role._id === item;
              });
              if (role) {
                return role.name;
              }
            }
          }
          return item;
        },
      },
      {
        title: "操作",
        key: "operator",
        render: (item) => {
          return (
            <div>
              <Button type="link" onClick={() => this.showUpdateUser(item._id)}>
                修改
              </Button>
              <Button type="link" onClick={this.showDeleteUser(item)}>
                删除
              </Button>
            </div>
          );
        },
        width: "25%",
        align: "center",
      },
    ];

    const { visible, userList, roleList } = this.state;
    const { username, password, email, phone, role_id } = this.state.user;

    return (
      <div>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={this.showAddModal}
            >
              添加用户
            </Button>
          }
        >
          <Table
            bordered={true}
            rowKey={"_id"}
            dataSource={userList}
            columns={columns}
            onChange={this.handleTableChange}
          />
        </Card>
        {/* 添加用户的模态框 */}
        <Modal
          title={this.state.operationType === "add" ? "添加用户" : "修改用户"}
          visible={visible}
          okText="确认"
          cancelText="取消"
          onOk={this.handleOkModal}
          onCancel={() => {
            this.setState({ visible: false }, () => {
              //重置表单
              this.FormRef.current.resetFields();
            });
          }}
        >
          <Form
            ref={this.FormRef}
            labelCol={{ md: 4 }}
            wrapperCol={{ md: 16 }}
            initialValues={{
              username: username || "",
              password: password || "",
              email: email || "",
              phone: phone || "",
              role_id: role_id || "",
            }}
          >
            <Item
              label="用户名"
              name="username"
              rules={[
                { required: true, whitespace: true, message: "请输入用户名" },
              ]}
            >
              <Input autoComplete="off" placeholder="请输入用户名" />
            </Item>
            <Item
              label="密码"
              name="password"
              rules={[
                { required: true, whitespace: true, message: "请输入密码" },
              ]}
            >
              <Input
                type={"password"}
                autoComplete="off"
                placeholder="请输入密码"
              />
            </Item>
            <Item label="邮箱" name="email">
              <Input autoComplete="off" placeholder="请输入邮箱" />
            </Item>
            <Item label="电话" name="phone">
              <Input autoComplete="off" placeholder="请输入电话" />
            </Item>
            <Item
              label="角色"
              name="role_id"
              rules={[{ required: true, message: "请选择一个角色" }]}
            >
              <Select allowClear placeholder={"请选择一个角色"}>
                {roleList.map((role) => (
                  <Option key={role._id} value={role._id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

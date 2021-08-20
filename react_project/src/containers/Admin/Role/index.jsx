import React, { Component } from "react";
import { Button, Card, Table, Modal, Form, Input, message, Tree } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../../config";
import { reqRoleList, reqAddRole, reqSetPermission } from "../../../api";
import menuList from "../../../config/menuConfig";
import { connect } from "react-redux";

const { Item } = Form;

class Role extends Component {
  state = {
    addvisible: false,
    AuthVisable: false,
    current: 1,
    roleList: [],
    total: 0,
    _id: "",
    checkedKeys: [], //树形菜单选中的key
    treeData: [], //树形菜单的数据
  };

  formRef = React.createRef();

  componentDidMount() {
    const { current } = this.state;
    this.getRoleList(current, PAGE_SIZE);
    let treeData = [
      {
        title: "平台权限",
        key: "top",
        children: [...menuList],
      },
    ];
    this.setState({
      treeData,
    });
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
  showSetPermissionModal = (id) => {
    const { roleList } = this.state;
    //回显菜单树
    let menu = roleList.find((menu) => menu._id === id);
    if (menu) {
      let menus = menu.menus;
      if (menus && menus instanceof Array) {
        this.setState({ checkedKeys: menus });
      }
    }
    this.setState({ AuthVisable: true, _id: id });
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
  handleAuthOkModal = async () => {
    const { _id, checkedKeys } = this.state;
    const { authName } = this.props;
    let result = await reqSetPermission(_id, checkedKeys, authName);
    const { status, msg } = result;
    if (status === 0) {
      message.success("角色权限设置成功");
      this.setState({ AuthVisable: false, checkedKeys: [] }, () => {
        const { current } = this.state;
        this.getRoleList(current, PAGE_SIZE);
      });
    } else message.error(msg);
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
    this.getRoleList(pageNum, PAGE_SIZE);
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
      render: (item) => {
        return (
          <Button
            type="link"
            onClick={() => this.showSetPermissionModal(item._id)}
          >
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
          <Form ref={this.authFormRef}>
            <Tree
              defaultExpandAll
              checkable
              onCheck={(checkedKeysValue) => {
                this.setState({ checkedKeys: checkedKeysValue });
              }}
              checkedKeys={this.state.checkedKeys}
              treeData={this.state.treeData}
            />
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => ({ authName: state.userInfo.user.userName }),
  {}
)(Role);

import React, { Component } from "react";
import { Menu } from "antd";
import * as Icon from "@ant-design/icons";
import logo from "../../../static/image/商品.png";
import "./css/leftNav.less";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../../config/menuConfig";
import { connect } from "react-redux";
import { createSaveTitleAction } from "../../../redux/actions/left_Nav";

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
  createMenu = (menu) => {
    return menu.map((item) => {
      const icon = React.createElement(Icon[item.icon]);
      //如果没有子菜单
      if (!item.children) {
        return (
          <Item
            key={item.key}
            icon={icon}
            onClick={() => this.props.saveTitle(item.title)}
          >
            {/* 路由链接组件,不带样式用Link,带样式用NavLink */}
            {/* Link标签套在Item外样式会出错, */}
            <Link to={item.path}>{item.title}</Link>
          </Item>
        );
        //如果有子菜单
      } else {
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {this.createMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };
  render() {
    return (
      <div>
        <Link to="/admin/home">
          <header className="leftNav-header">
            <img src={logo} alt="商标" />
            <h1>商品管理系统</h1>
          </header>
        </Link>

        <Menu
          //根据拿到的路径判断当前选中的是哪一个路由
          selectedKeys={[
            this.props.location.pathname.indexOf("products") !== -1
              ? "products"
              : this.props.location.pathname.split("/").reverse()[0],
          ]}
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menuList)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({ title: state.title }), {
    saveTitle: createSaveTitleAction,
  })(LeftNav)
);

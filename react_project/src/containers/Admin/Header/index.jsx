import React, { Component } from "react";
import "./css/header.less";
import { LoginOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createDeleteUserInfoAcion } from "../../.././redux/actions/login";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { reqWeather } from "../../../api";
import yun from "./image/yun.png";
import { withRouter } from "react-router-dom";
import menuList from "../../../config/menuConfig";

const { confirm } = Modal;

class Header extends Component {
  state = {
    time: new Date().toLocaleString(),
    weather: "",
    title: "",
  };

  async componentDidMount() {
    setInterval(
      () => this.setState({ time: new Date().toLocaleString() }),
      1000
    );
    //请求天气api
    let result = await reqWeather();
    this.setState({
      weather: result.data[0].wea,
      title: this.getTitle(menuList),
    });
  }

  //不能在组件卸载后设置state,防止内存泄漏
  //组件卸载时，停止setState
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  //退出登录的回调
  logout = () => {
    confirm({
      title: "确认退出登录?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.props.deleteUserInfo();
      },
      onCancel() {},
    });
  };

  //显示标题的回调
  getTitle = (menu) => {
    let title = "";
    let pathKey = this.props.location.pathname.split("/").reverse()[0];
    menu.forEach((item) => {
      if (!item.children) {
        if (pathKey === item.key) title = item.title;
      } else {
        let findItem = item.children.find((v) => {
          return pathKey === v.key;
        });
        if (findItem) title = findItem.title;
      }
    });
    console.log("___getTitle");
    return title;
  };

  render() {
    return (
      <header className="header">
        <div className="header-top">
          <span>欢迎登录,&nbsp;{this.props.username}</span>
          <Button className="logout" onClick={this.logout}>
            <LoginOutlined />
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <span className="header-bottom-word-left">
            {/* 如果redux中没有title,则应去state中取 */}
            {this.props.title || this.state.title}
          </span>
          <span className="header-bottom-word-right">
            {this.state.time}&nbsp;&nbsp;
            <img src={yun} alt={"yun"} />
            {this.state.weather}
          </span>
        </div>
      </header>
    );
  }
}

//withRouter 使非路由组件可以使用路由组件的API
export default withRouter(
  connect(
    (state) => ({ username: state.userInfo.user.username, title: state.title }),
    {
      deleteUserInfo: createDeleteUserInfoAcion,
    }
  )(Header)
);

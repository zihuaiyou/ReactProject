import React, { Component } from "react";
import "./css/header.less";
import { LoginOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createDeleteUserInfoAcion } from "../../.././redux/actions/login";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { reqWeather } from "../../../api";
import yun from "./image/yun.png";

const { confirm } = Modal;

class Header extends Component {
  state = {
    time: new Date().toLocaleString(),
    weather: "",
  };

   async componentDidMount() {
    setInterval(
      () => this.setState({ time: new Date().toLocaleString() }),
      1000
    );
    //请求天气api
    let result = await reqWeather()
    this.setState({weather:result.data[0].wea})    
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

  render() {
    return (
      <header className="header">
        <div className="header-top">
          <span>欢迎登录,{this.props.username}</span>
          <Button className="logout" onClick={this.logout}>
            <LoginOutlined />
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <span className="header-bottom-word-left">商品管理</span>
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

export default connect(
  (state) => ({ username: state.userInfo.user.username }),
  { deleteUserInfo: createDeleteUserInfoAcion }
)(Header);

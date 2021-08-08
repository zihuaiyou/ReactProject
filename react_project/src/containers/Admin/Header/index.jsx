import React, { Component } from "react";
import "./css/header.less";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

export default class index extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-top">
          <span>欢迎登录,Admin</span>
          <Button className="logout">
            <LoginOutlined />
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <span className="header-bottom-word-left">商品管理</span>
          <span className="header-bottom-word-right">
            2021-08-07 17:07:48
            <img
              src="http://api.map.baidu.com/images/weather/day/duoyun.png"
              alt="多云"
            />
            多云
          </span>
        </div>
      </header>
    );
  }
}

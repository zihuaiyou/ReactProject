import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createDeleteUserInfoAcion } from "../../redux/actions/login";

class Admin extends Component {
  componentDidMount() {
    console.log(this.props.userInfo);
  }
 
  render() {
    const { user, isLogin } = this.props.userInfo;
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div>欢迎登录,{user.username}</div>
        <button onClick = {this.props.deleteUserInfo}>退出登录</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ userInfo: state.userInfo }), //映射状态
  {
    deleteUserInfo: createDeleteUserInfoAcion,
  }
)(Admin);

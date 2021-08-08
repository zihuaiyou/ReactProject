import React, { Component } from "react";
import "./css/login.less";
import logo from "./image/商品.png";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { createLoginAcion} from "../../redux/actions/login";
import { reqLogin } from "../../api";
import {Redirect} from 'react-router-dom'
const { Item } = Form;

//这是UI组件
class Login extends Component {
  // onFinish：统一校验，提交表单且数据验证成功后回调事件
  onFinish = async (values) => {
    console.log("Success:", values);
    let result = await reqLogin(values);
    const { data, status, msg } = result;
    if (status === 0) {
      //向admin页面传递登录信息
      this.props.handleUserInfo(data);
      
      //输入账户密码后跳转admin页面
      this.props.history.replace('/admin')
    }
    else message.error(msg);
  };

  // 统一校验，提交表单且数据验证失败后回调事件
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //密码的自定义验证
  passwordvalidator = (rule, value, callback) => {
    if (!value) {
      return Promise.reject("请输入密码");
    } else if (value.length < 4) {
      return Promise.reject("密码必须大于4位");
    } else if (value.length > 12) {
      return Promise.reject("密码必须小于12位");
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test()) {
      return Promise.reject("用户名必须是字母开头、以字母数字或下划线组成");
    } else return Promise.resolve();
  };

  render() {
    const {isLogin} = this.props;
    //如果已经登录了,则直接跳转admin页面
    if (isLogin) {
      return <Redirect to = './admin'/>
    }
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          {/* onFinish：统一校验，提交表单且数据验证成功后回调事件
          onFinishFailed：统一校验，提交表单且数据验证失败后回调事件 */}
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            {/* 用户名的声明式验证 */}
            <Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
                {
                  min: 4,
                  message: "用户名最少应为4位",
                },
                {
                  max: 12,
                  message: "用户名最多应为12位",
                },
                {
                  pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                  message: "用户名必须是字母开头、以字母数字或下划线组成",
                },
              ]}
            >
              <Input />
            </Item>

            {/* 密码的自定义验证 */}
            <Item
              label="密码"
              name="password"
              rules={[{ validator: this.passwordvalidator }]}
            >
              <Input.Password />
            </Item>
            <Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="login-button">
                Submit
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

//这是容器组件
export default connect(
  (state) => ({ isLogin: state.userInfo.isLogin }), //映射状态
  {
    handleUserInfo: createLoginAcion,
  }
)(Login);

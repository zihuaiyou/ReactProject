import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import { createDeleteUserInfoAcion } from "../../redux/actions/login";
import { reqCategoryList } from "../../api";
import { Layout } from "antd";
import "./css/admin.less";
import Header from "./Header";
import Home from "../../components/home";
import Category from "./Category";
import Products from "./Products";
import User from "./User";
import Role from "./Role";
import Bar from "./Bar";
import Pie from "./Pie";
import Line from "./Line";
import LeftNav from './LeftNav';

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  getCategoryList = async () => {
    let result = await reqCategoryList();
    console.log(result);
  };
  render() {
    const { isLogin } = this.props.userInfo;
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="admin">
        <Sider className="sider">
        <LeftNav/>
        </Sider>
        <Layout>
          <Header />
          <Content className="content">
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/goods/category" component={Category} />
              <Route path="/admin/goods/products" component={Products} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer className="footer">
            推荐使用谷歌浏览器,获取最佳用户体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({ userInfo: state.userInfo }), //映射状态
  {
    deleteUserInfo: createDeleteUserInfoAcion,
  }
)(Admin);

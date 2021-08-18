import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import { createDeleteUserInfoAcion } from "../../redux/actions/login";
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
import Detail from "./Products/Detail";
import AddUpdate from "./Products/AddUpdate";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  
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
          <Content className="content" style = {{overflow:"auto"}}>
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/goods/category" component={Category} />
              <Route path="/admin/goods/products" component={Products} exact/>
              <Route path="/admin/goods/products/detail/:id" component={Detail} />
              <Route path="/admin/goods/products/detail" component={Detail} exact/>
              <Route path="/admin/goods/products/addupdate" component={AddUpdate} exact/>
              <Route path="/admin/goods/products/addupdate/:id" component={AddUpdate} />
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

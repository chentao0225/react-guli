import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Header from "../header";
import LeftNav from "../left-nav";
import { Route, Switch, Redirect } from "react-router-dom";
import "./css/admin.less";
import Home from "../home";
import Product from "../product";
import Category from "../category";
import User from "../user";
import Role from "../role";
import Bar from "../bar";
import Pie from "../pie";
import Line from "../line";
const { Sider, Content, Footer } = Layout;
class Admin extends Component {
  render() {
    if (!this.props.isLogin) return <Redirect to="/login" />;
    return (
      <Layout className="admin-root">
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className="admin-content">
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/prod_about/category" component={Category} />
              <Route path="/admin/prod_about/product" component={Product} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer className="admin-footer">
            推荐使用谷歌浏览器，获取最佳用户体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect((state) => ({ isLogin: state.userInfo.isLogin }))(Admin);

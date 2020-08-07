import React, { Component } from "react";
import "./css/header.less";
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import { delUserInfo } from "../../redux/actions/login";
class Header extends Component {
  logOut = () => {
    console.log("logout");
    Modal.confirm({
      title: "确定退出吗?",
      content: "退出后需要重新登录",
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        this.props.delUserInfo();
      },
    });
  };
  render() {
    return (
      <div className="header">
        <div className="header-top">
          欢迎，{this.props.username}
          <Button onClick={this.logOut} type="link">
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="title">
            <h1>首页</h1>
          </div>
          <div className="date">2020年8月7日10:42:26</div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    username: state.userInfo.user.username,
  }),
  { delUserInfo }
)(Header);

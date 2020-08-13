import React, { Component } from "react";
import menuConfig from "../../config/menu_config";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import logo from "../../static/imgs/react.svg";
import "./css/left-nav.less";
import { connect } from "react-redux";
import { saveTitle } from "../../redux/actions/header";
class LeftNav extends Component {
  componentDidMount() {
    if (!this.props.title) {
      this.getTitleByPath();
    }
  }
  getTitleByPath = () => {
    const pathArr = this.props.location.pathname.split("/");
    let currentPath = pathArr.reverse()[0];
    // console.log(currentPath);
    if (currentPath === "admin") currentPath = "home";
    let title = "";
    menuConfig.forEach((item) => {
      if (item.children instanceof Array) {
        let res = item.children.find((cItem) => cItem.key === currentPath);
        if (res) title = res.title;
      } else {
        if (item.key === currentPath) title = item.title;
      }
    });
    this.props.saveTitle(title);
  };
  createMenu = (menuArr) => {
    // console.log(menuArr);
    return menuArr.map((item) => {
      if (this.handleAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item
              onClick={() => {
                this.props.saveTitle(item.title);
              }}
              key={item.key}
              icon={<item.icon />}
            >
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          );
        } else {
          return (
            <Menu.SubMenu
              key={item.key}
              title={item.title}
              icon={<item.icon />}
            >
              {this.createMenu(item.children)}
            </Menu.SubMenu>
          );
        }
      }
      return "";
    });
  };
  handleAuth = (menuObj) => {
    const { username, userMenus } = this.props;
    if (username === "admin" || userMenus.indexOf(menuObj.key) !== -1) {
      return true;
    } else if (menuObj.children) {
      return menuObj.children.some(
        (item) => userMenus.indexOf(item.key) !== -1
      );
    }
    return false;
  };
  render() {
    // console.log(this.props.location);
    const currentPathArr = this.props.location.pathname.split("/");
    // console.log(currentPathArr);
    let currentPath = currentPathArr.reverse()[0];
    // console.log(currentPath);
    if (currentPath === "admin") currentPath = "home";
    return (
      <div className="left-nav">
        <div className="left-header">
          <img src={logo} alt="" />
          <h1>后台管理</h1>
        </div>
        <div>
          <Menu
            defaultSelectedKeys={[currentPath]}
            defaultOpenKeys={currentPathArr}
            mode="inline"
            theme="dark"
          >
            {this.createMenu(menuConfig)}
          </Menu>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    username: state.userInfo.user.username,
    userMenus: state.userInfo.user.role.menus,
  }),
  { saveTitle }
)(withRouter(LeftNav));

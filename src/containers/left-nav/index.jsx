import React, { Component } from "react";
import menuConfig from "../../config/menu_config";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import logo from "../../static/imgs/react.svg";
import "./css/left-nav.less";
class LeftNav extends Component {
  createMenu = (menuArr) => {
    // console.log(menuArr);
    return menuArr.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <Menu.SubMenu key={item.key} title={item.title} icon={<item.icon />}>
            {this.createMenu(item.children)}
          </Menu.SubMenu>
        );
      }
    });
  };
  render() {
    console.log(this.props.location);
    const currentPathArr = this.props.location.pathname.split("/");
    console.log(currentPathArr);
    let currentPath = currentPathArr.reverse()[0];
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
export default withRouter(LeftNav);

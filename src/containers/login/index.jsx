import React, { Component } from "react";
import logo from "../../static/imgs/react.svg";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/login.less";
import { reqLogin } from "../../api";
import { connect } from "react-redux";
import { saveUserInfo } from "../../redux/actions/login";
import { Redirect } from "react-router-dom";
class Login extends Component {
  onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const { username, password } = values;
    let res = await reqLogin(username, password);
    // console.log(res);
    const { status, data, msg } = res;
    if (status === 0) {
      message.success("登录成功", 1);
      this.props.saveUserInfo(data);
    } else {
      message.error(msg, 1);
    }
  };
  pwdValidator = (rule, value) => {
    // console.log(rule, value);
    if (!value) {
      return Promise.reject("密码不能为空");
    } else if (value.length < 4) {
      return Promise.reject("密码不能小于4位");
    } else if (value.length > 12) {
      return Promise.reject("密码不能大于12位");
    }
    return Promise.resolve();
  };
  render() {
    // console.log(this.props.isLogin);
    if (this.props.isLogin) return <Redirect to="/admin" />;
    return (
      <div id="login">
        <div className="login-header">
          <img src={logo} alt="" />
          <h1 className="logo">商品管理系统</h1>
        </div>
        <div className="login-content">
          <h2>用户登录</h2>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
                {
                  min: 4,
                  message: "用户名必须大于4位",
                },
                {
                  max: 12,
                  message: "用户名不能大于12位",
                },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须是字母、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator: this.pwdValidator,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ isLogin: state.userInfo.isLogin }), {
  saveUserInfo,
})(Login);

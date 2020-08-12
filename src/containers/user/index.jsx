import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { reqUserList, reqDelUser, reqAddUser, reqUpdateUser } from "../../api";

const { Item } = Form;
const { Option } = Select;
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      roleList: [],
      visible: false,
      isUpdate: false,
    };
    this.formRef = React.createRef();
  }
  getUserList = async () => {
    let res = await reqUserList();
    const { status, data, msg } = res;
    if (status === 0) {
      this.setState({ userList: data.users, roleList: data.roles });
    } else message.error(msg, 1);
  };
  getRole = (id) => {
    let res = this.state.roleList.find((item) => item._id === id);
    // console.log(res);
    if (res) return res.name;
  };

  showDelModal = (id, obj) => {
    // console.log(id, obj);
    Modal.confirm({
      title: `确定删除${obj.username}吗?`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        let res = await reqDelUser(id);
        const { status, msg } = res;
        if (status === 0) {
          message.success("删除成功");
          this.getUserList();
        } else message.error(msg);
      },
    });
  };
  handleOk = async () => {
    // console.log(this.formRef.current.getFieldsValue());

    const {
      username,
      password,
      phone,
      email,
      role_id,
    } = this.formRef.current.getFieldsValue();

    let res;
    if (this.state.isUpdate) {
      const {
        username,
        phone,
        email,
        role_id,
      } = this.formRef.current.getFieldsValue();
      res = await reqUpdateUser({
        _id: this._id,
        username,
        phone,
        email,
        role_id,
      });
    } else {
      res = await reqAddUser({ username, password, phone, email, role_id });
    }

    const { status, msg } = res;
    if (status === 0) {
      message.success(this.state.isUpdate ? "修改成功" : "添加成功");
      this.setState({
        visible: false,
        isUpdate: false,
      });
      this.getUserList();
      this.formRef.current.resetFields();
    } else message.error(msg, 1);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      isUpdate: false,
      userInfo: {},
    });
    this.formRef.current.setFieldsValue({ username: "" });
  };
  showAddModal = () => {
    this.setState({ visible: true });
  };
  showUpdateModal = (id, obj) => {
    this.user = obj;
    this._id = id;

    this.setState({ isUpdate: true, visible: true });
  };

  componentDidMount() {
    this.getUserList();
  }
  render() {
    // console.log(this.user);
    const user = this.user;
    const dataSource = this.state.userList;
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: (create_time) =>
          create_time
            ? dayjs(create_time).format("YYYY年MM月DD日 HH:mm:ss")
            : "",
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: (role_id) => {
          return this.getRole(role_id);
        },
      },
      {
        title: "操作",
        dataIndex: "_id",
        render: (id, obj) => (
          <>
            <Button type="link" onClick={() => this.showUpdateModal(id, obj)}>
              修改
            </Button>
            <Button type="link" onClick={() => this.showDelModal(id, obj)}>
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <Card
        title={
          <Button type="primary" onClick={() => this.showAddModal()}>
            创建用户
          </Button>
        }
      >
        <Table dataSource={dataSource} columns={columns} rowKey="_id" />
        <Modal
          title={this.state.isUpdate ? "修改用户" : "添加用户"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Item
              name="username"
              label="用户名"
              initialValue={user ? user.username : ""}
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input placeholder="请输入用户名" />
            </Item>

            {!this.state.isUpdate ? (
              <Item
                name="password"
                label="密码"
                rules={[{ required: true, message: "密码不能为空" }]}
              >
                <Input placeholder="请输入密码" />
              </Item>
            ) : null}
            <Item name="phone" label="手机号">
              <Input placeholder="请输入手机号" />
            </Item>
            <Item name="email" label="邮箱">
              <Input placeholder="请输入邮箱" />
            </Item>
            <Item name="role_id" label="角色">
              <Select placeholder="请选择角色">
                {this.state.roleList.map((item, index) => {
                  return (
                    <Option key={index} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input, Tree } from "antd";
import dayjs from "dayjs";
import { reqRoleList, reqAddRole, reqUpdateRole } from "../../api";
import treeArr from "../../config/tree_config";
const { Item } = Form;
export default class Role extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      roleList: [],
      visibleAdd: false,
      visibleAuth: false,
      checkedKeys: [],
    };
  }
  getRoleList = async () => {
    let res = await reqRoleList();
    const { status, msg, data } = res;
    if (status === 0) this.setState({ roleList: data });
    else message.error(msg, 1);
  };

  showModalAdd = () => {
    this.setState({ visibleAdd: true });
  };
  handleAddOk = async () => {
    const { roleName } = this.formRef.current.getFieldValue();
    let res = await reqAddRole(roleName);
    const { status, msg } = res;
    if (status === 0) {
      message.success("添加角色成功", 1);
      this.getRoleList();
      this.setState({
        visibleAdd: false,
      });
      this.formRef.current.resetFields();
    } else message.error(msg, 1);
  };

  handleAddCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      visibleAdd: false,
    });
  };
  showAuthModal = (id) => {
    // console.log(id);
    this._id = id;
    let res = this.state.roleList.find((item) => item._id === id);
    // console.log(res);
    if (res) {
      const { menus } = res;
      if (menus.indexOf("home") === -1) menus.push("home");

      this.setState({ visibleAuth: true, checkedKeys: menus });
    }
  };
  handleAuthOk = async () => {
    let res = await reqUpdateRole(this._id, this.state.checkedKeys);
    const { status, msg } = res;
    if (status === 0) {
      message.success("权限更新成功", 1);
      this.setState({ visibleAuth: false });
      this.getRoleList();
    } else message.error(msg, 1);
  };
  handleAuthCancel = () => {
    this.setState({ visibleAuth: false });
  };
  handleCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };
  onFinish = () => {
    this.formRef.current.validateFields().then(
      () => this.handleAddOk(),
      () => new Promise(() => {})
    );
  };
  componentDidMount() {
    this.getRoleList();
  }
  render() {
    const dataSource = this.state.roleList;

    const columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (create_time) =>
          dayjs(create_time).format("YYYY年MM月DD日 HH:mm:ss"),
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        key: "auth_time",
        render: (auth_time) =>
          auth_time ? dayjs(auth_time).format("YYYY年MM月DD日 HH:mm:ss") : "",
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
      },
      {
        title: "操作",
        dataIndex: "_id",
        key: "_id",
        render: (id) => (
          <Button
            onClick={() => {
              this.showAuthModal(id);
            }}
            type="link"
          >
            设置权限
          </Button>
        ),
      },
    ];

    return (
      <Card
        title={
          <Button onClick={this.showModalAdd} type="primary">
            添加角色
          </Button>
        }
      >
        <Table
          bordered
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
        />
        {/* 添加角色对话框 */}
        <Modal
          title="添加角色"
          visible={this.state.visibleAdd}
          onOk={this.onFinish}
          onCancel={this.handleAddCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={this.formRef}>
            <Item
              name="roleName"
              label="角色名"
              rules={[{ required: true, message: "角色名必须输入" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Item>
          </Form>
        </Modal>
        <Modal
          title="授权"
          visible={this.state.visibleAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确定"
          cancelText="取消"
        >
          <Tree
            treeData={treeArr}
            defaultExpandAll={true}
            onCheck={this.handleCheck}
            checkable
            checkedKeys={this.state.checkedKeys}
          />
        </Modal>
      </Card>
    );
  }
}

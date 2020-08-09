import React, { Component } from "react";
import { Card, Button, Table, Modal, Form, Input, message } from "antd";
import { connect } from "react-redux";
import { saveCategoryListAsync } from "../../redux/actions/category";
import { reqAddCategory, reqUpdateCategory } from "../../api";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.categoryForm = React.createRef();
  }

  handleCategory = (categoryObj) => {
    this._id = "";
    this.name = "";
    this.isUpdate = false;
    this.setState({
      visible: true,
    });
    const { _id, name } = categoryObj;
    if (_id && name) {
      this.isUpdate = true;
      this._id = _id;
      this.name = name;
    }
    // console.log(this.categoryForm.current);
    const formRef = this.categoryForm.current;
    if (formRef) formRef.setFieldsValue({ name: this.name });
  };
  handleOk = async () => {
    const formRef = this.categoryForm.current;
    let { name } = formRef.getFieldValue();
    // console.log(name);
    if (!name && !name.trim()) {
      message.error("分类名不能为空", 1);
    } else {
      let res;
      if (this.isUpdate) res = await reqUpdateCategory(this._id, name);
      else res = await reqAddCategory(name);
      let { msg, status } = res;
      if (status === 0) {
        message.success(this.isUpdate ? "修改分类成功" : "新增分类成功", 1);
        this.props.saveCategoryListAsync();
        this.setState({ visible: false });
        formRef.resetFields();
      } else {
        message.error(msg, 1);
      }
    }
    this.setState({ visible: false });
  };
  handleCancel = () => {
    this.setState({ visible: false });
    let formRef = this.categoryForm.current;
    formRef.resetFields();
  };
  componentDidMount() {
    this.props.saveCategoryListAsync();
  }
  render() {
    const dataSource = this.props.categoryList;

    const columns = [
      {
        title: "分类名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        // dataIndex: "age",
        key: "operation",
        align: "center",
        width: "20%",
        render: (categoryObj) => {
          return (
            <Button
              type="link"
              onClick={() => {
                this.handleCategory(categoryObj);
              }}
            >
              修改
            </Button>
          );
        },
      },
    ];
    return (
      <div className="category">
        <Card
          extra={
            <Button type="primary" onClick={this.handleCategory}>
              添加
            </Button>
          }
        >
          <Table
            rowKey="_id"
            bordered={true}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
          <Modal
            title={this.isUpdate ? "修改分类" : "添加分类"}
            okText="确定"
            cancelText="取消"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
          >
            <Form ref={this.categoryForm} initialValues={{ name: this.name }}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "分类名必须输入" }]}
              >
                <Input placeholder="请输入分类名" />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    );
  }
}
export default connect((state) => ({ categoryList: state.categoryList }), {
  saveCategoryListAsync,
})(Category);

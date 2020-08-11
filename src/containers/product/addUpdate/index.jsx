import React, { Component } from "react";
import { Card, Form, Select, Input, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PictureWall from "./pictureWall";
import RichText from "./richText";
import { connect } from "react-redux";
import { saveCategoryListAsync } from "../../../redux/actions/category";
import { reqAddProduct, reqPorductById, reqUpdateProduct } from "../../../api";
const { Item } = Form;
const { Option } = Select;
class AddUpdate extends Component {
  constructor(props) {
    super(props);
    this.picRef = React.createRef();
    this.textRef = React.createRef();
    this.formRef = React.createRef();
    this.state = {
      isUpdate: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const { categoryList, saveCategoryListAsync } = this.props;
    if (categoryList.length === 0) saveCategoryListAsync();
    const id = this.props.match.params.id;
    if (id) {
      this._id = id;
      this.setState({ isUpdate: true });
      this.currentProductInfo(id);
    }
  }
  currentProductInfo = async (id) => {
    // console.log(id);
    let res = await reqPorductById(id);
    // console.log(this.formRef);
    const { status, msg, data } = res;
    if (status === 0) {
      const { categoryId, name, desc, price, detail, imgs } = data;
      this.formRef.current.setFieldsValue({ name, desc, price, categoryId }); //显示当前商品内容
      this.picRef.current.setFileListByImgName(imgs); //显示当前商品图片
      this.textRef.current.setRichText(detail); //显示当前富文本内容
    } else message.error(msg);
  };
  onFinish = async (values) => {
    console.log("submit", values);
    values.imgs = this.picRef.current.getImgNameArr();
    values.detail = this.textRef.current.getRichText();
    let res;
    if (this.state.isUpdate) {
      //更新商品
      values._id = this._id;
      res = await reqUpdateProduct(values);
    } else {
      //添加商品
      res = await reqAddProduct(values);
    }
    const { status, msg } = res;
    if (status === 0) {
      message.success(this.state.isUpdate ? "修改成功" : "添加成功");
      this.props.history.push("/admin/prod_about/product");
    } else message.error(msg);
  };
  render() {
    // console.log(this.props);
    const { id } = this.props.match.params;
    return (
      <div>
        <Card
          title={
            <div>
              <ArrowLeftOutlined
                onClick={() => {
                  this.props.history.goBack();
                }}
                style={{ color: "green", marginRight: "5px" }}
              />
              <span>{id ? "商品修改" : "商品添加"}</span>
            </div>
          }
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Item
              name="name"
              label="商品名称"
              wrapperCol={{ span: 6 }}
              rules={[{ required: true, message: "商品名称不能为空" }]}
            >
              <Input placeholder="商品名称" />
            </Item>
            <Item
              name="desc"
              label="商品描述"
              wrapperCol={{ span: 6 }}
              rules={[{ required: true, message: "商品描述不能为空" }]}
            >
              <Input placeholder="商品描述" />
            </Item>
            <Item
              name="price"
              label="商品价格"
              rules={[{ required: true, message: "商品价格不能为空" }]}
              wrapperCol={{ span: 6 }}
            >
              <Input
                type="number"
                placeholder="商品价格"
                prefix="￥"
                suffix="元"
              />
            </Item>
            <Item
              name="categoryId"
              label="商品分类"
              rules={[
                {
                  required: true,
                  message: "必须选择一个分类",
                },
              ]}
              wrapperCol={{ span: 6 }}
            >
              <Select placeholder="请选择分类">
                {this.props.categoryList.map((item, index) => {
                  return (
                    <Option value={item._id} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Item>
            <Item name="imgs" label="商品图片" wrapperCol={{ span: 6 }}>
              <PictureWall ref={this.picRef} />
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 12 }}>
              <RichText ref={this.textRef} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}
export default connect((state) => ({ categoryList: state.categoryList }), {
  saveCategoryListAsync,
})(AddUpdate);

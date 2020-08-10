import React, { Component } from "react";
import { Card, Form, Select, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PictureWall from "./pictureWall";
import RichText from "./richText";
const { Item } = Form;
const { Option } = Select;
export default class AddUpdate extends Component {
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
          <Form>
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
              <Select>
                <Option value="请选择分类"></Option>
              </Select>
            </Item>
            <Item name="imgs" label="商品图片" wrapperCol={{ span: 6 }}>
              <PictureWall />
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 12 }}>
              <RichText />
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

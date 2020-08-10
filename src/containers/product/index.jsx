import React, { Component } from "react";
import { Card, Button, Select, Table, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  reqProductList,
  reqSearchProduct,
  reqUpdateProductStatus,
} from "../../api";
const { Option } = Select;
export default class Product extends Component {
  state = {
    productList: [],
    pageNum: 0,
    total: 0,
    pageSize: 5,
    searchType: "productName",
    keyWord: "",
  };
  changeStatus = async (id, currentStatus) => {
    console.log(currentStatus);
    if (currentStatus === 1) currentStatus = 0;
    else currentStatus = 1;
    let res = await reqUpdateProductStatus(id, currentStatus);
    const { status, msg } = res;
    if (status === 0) {
      message.success(currentStatus === 1 ? "上架成功" : "下架成功");
      this.getProductList(this.setState.pageNum);
    } else {
      message.error(msg);
    }
  };
  getProductList = async (pageNum = 1) => {
    let res;
    if (this.isSearch) {
      const { searchType, keyWord } = this.state;
      res = await reqSearchProduct(
        pageNum,
        this.state.pageSize,
        searchType,
        keyWord
      );
    } else {
      res = await reqProductList(pageNum, this.state.pageSize);
    }
    const { status, data, msg } = res;
    if (status === 0) {
      this.setState({
        productList: data.list,
        pageNum: data.pageNum,
        total: data.total,
      });
    } else {
      message.error(msg, 1);
    }
  };
  componentDidMount() {
    this.getProductList();
  }

  render() {
    const { total, pageNum, pageSize } = this.state;
    const dataSource = this.state.productList;
    // console.log(dataSource);
    const columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (currentStatus, productObj) => {
          console.log(currentStatus);
          const { _id } = productObj;
          return (
            <div>
              <Button
                onClick={() => {
                  this.changeStatus(_id, currentStatus);
                }}
                type={currentStatus === 1 ? "danger" : "primary"}
              >
                {currentStatus === 1 ? "下架" : "上架"}
              </Button>
              <br />
              <Button type={currentStatus === 1 ? "text" : "danger"}>
                {currentStatus === 1 ? "在售" : "售罄"}
              </Button>
            </div>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "_id",
        key: "action",
        render: (id) => {
          return (
            <div>
              <Button type="link">详情</Button>
              <br />
              <Button
                type="link"
                onClick={() => {
                  this.props.history.push(
                    `/admin/prod_about/product/update/${id}`
                  );
                }}
              >
                修改
              </Button>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card
          title={
            <div>
              <Select
                defaultValue="productName"
                onChange={(value) => this.setState({ searchType: value })}
                style={{ width: 120 }}
              >
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>

              <Input
                name="keyWord"
                placeholder="关键字"
                onChange={(event) =>
                  this.setState({ keyWord: event.target.value })
                }
                style={{ width: "20%", margin: "0 10px" }}
              />
              <Button
                type="primary"
                onClick={() => {
                  this.isSearch = true;
                  this.getProductList();
                }}
              >
                搜索
              </Button>
            </div>
          }
          extra={
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push("/admin/prod_about/product/add");
              }}
              icon={<PlusOutlined />}
            >
              添加商品
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="_id"
            bordered={true}
            pagination={{
              current: pageNum,
              total,
              pageSize,
              onChange: (page, pageSize) => {
                this.getProductList(page, pageSize);
              },
            }}
          />
          ;
        </Card>
      </div>
    );
  }
}

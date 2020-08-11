import React, { Component } from "react";
import { Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveCategoryListAsync } from "../../../redux/actions/category";
import { reqPorductById } from "../../../api";
import "./css/detail.less";
const IMG_BASE_URL = "http://localhost:4000/upload/";
const { Item } = List;
class Detail extends Component {
  state = {
    productObj: { imgs: [] },
    isLoading: false,
  };
  getCurrentProduct = async (id) => {
    this.setState({ isLoading: true });
    let res = await reqPorductById(id);
    const { status, data, msg } = res;
    if (status === 0) {
      this.setState({
        productObj: data,
        isLoading: false,
      });
    } else message.error(msg, 1);
  };
  findCategoryById = (id) => {
    let res = this.props.categoryList.find((item, index) => {
      return item._id === id;
    });
    if (res) return res.name;
  };
  componentDidMount() {
    const { categoryList, saveCategoryListAsync } = this.props;

    const id = this.props.match.params.id;
    // console.log(id);
    if (id) {
      this.getCurrentProduct(id);
    }
    if (categoryList.length === 0) saveCategoryListAsync();
  }
  render() {
    const {
      name,
      desc,
      price,
      categoryId,
      imgs,
      detail,
    } = this.state.productObj;
    // console.log(this.state.productObj);
    return (
      <Card
        loading={this.state.isLoading}
        title={
          <div>
            <ArrowLeftOutlined
              onClick={() => {
                this.props.history.goBack();
              }}
              style={{ color: "green", marginRight: "5px" }}
            />
            <span>商品详情</span>
          </div>
        }
      >
        <List>
          <Item className="detailItem">
            <span className="title">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item className="detailItem">
            <span className="title">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item className="detailItem">
            <span className="title">商品价格:</span>
            <span>{price + "元"}</span>
          </Item>
          <Item className="detailItem">
            <span className="title">所属分类:</span>
            {this.findCategoryById(categoryId)}
          </Item>
          <Item className="detailItem">
            <span className="title">商品图片:</span>
            {imgs.map((item) => {
              return (
                <img key={item} src={IMG_BASE_URL + item} alt="productImg" />
              );
            })}
          </Item>
          <Item className="detailItem">
            <span className="title">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
export default connect((state) => ({ categoryList: state.categoryList }), {
  saveCategoryListAsync,
})(Detail);

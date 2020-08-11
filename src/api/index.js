/** 请求地址*/
import ajax from "./ajax";

//请求登录

export const reqLogin = (username, password) =>
  ajax.post("/login", { username, password });

//获取分类列表

export const reqCategoryList = () => ajax.get("/manage/category/list");

//新增分类
export const reqAddCategory = (categoryName) =>
  ajax.post("/manage/category/add", { categoryName });

//修改分类

export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax.post("/manage/category/update", { categoryId, categoryName });

//商品列表
export const reqProductList = (pageNum, pageSize) =>
  ajax.get("/manage/product/list", { params: { pageNum, pageSize } });

//根据Name/desc搜索产品分页列表
export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord) =>
  ajax.get("/manage/product/search", {
    params: { [searchType]: keyWord, pageNum, pageSize },
  });
//商品上下架处理
export const reqUpdateProductStatus = (productId, status) =>
  ajax.post("/manage/product/updateStatus", { productId, status });

//添加商品
export const reqAddProduct = (productObj) =>
  ajax.post("/manage/product/add", productObj);

//删除图片

export const reqDelImg = (name) => ajax.post("/manage/img/delete", { name });

//根据商品id获取商品信息

export const reqPorductById = (productId) =>
  ajax.get("/manage/product/info", { params: { productId } });

//更新商品
export const reqUpdateProduct = (productObj) =>
  ajax.post("/manage/product/update", productObj);

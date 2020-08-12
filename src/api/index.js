/** 请求地址*/
import ajax from "./ajax";
import store from "../redux/store";
//请求登录
const { username } = store.getState().userInfo.user;
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

//角色列表
export const reqRoleList = () => ajax.get("manage/role/list");

//添加角色
export const reqAddRole = (roleName) =>
  ajax.post("/manage/role/add", { roleName });

//更新角色
export const reqUpdateRole = (_id, menus) =>
  ajax.post("/manage/role/update", {
    _id,
    menus,
    auth_name: username,
    auth_time: Date.now(),
  });

//用户列表
export const reqUserList = () => ajax.get("/manage/user/list");

//删除用户

export const reqDelUser = (userId) =>
  ajax.post("/manage/user/delete", { userId });

//添加用户
export const reqAddUser = (userObj) => ajax.post("/manage/user/add", userObj);

//更新用户
export const reqUpdateUser = (userObj) =>
  ajax.post("/manage/user/update", userObj);

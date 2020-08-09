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

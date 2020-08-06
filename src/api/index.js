/** 请求地址*/
import ajax from "./ajax";

//请求登录

export const reqLogin = (username, password) =>
  ajax.post("/login", { username, password });

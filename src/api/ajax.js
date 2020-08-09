import axios from "axios";
import qs from "querystring";
import store from "../redux/store";
import { delUserInfo } from "../redux/actions/login";
import { saveTitle } from "../redux/actions/header";
import { message as msg } from "antd";
const ajax = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

ajax.interceptors.request.use((config) => {
  let { method, data } = config;
  if (method.toLowerCase() === "post" && data instanceof Object) {
    config.data = qs.stringify(data);
  }
  const { token } = store.getState().userInfo;
  if (token) {
    config.headers.Authorization = "atguigu_" + token;
  }
  return config;
});

ajax.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    let errMsg = "未知错误，请联系管理员";
    let { message } = error;
    if (message.indexOf("401") !== -1) {
      store.dispatch(delUserInfo());
      store.dispatch(saveTitle(""));
      errMsg = "身份过期，请重新登录";
    } else if (message.indexOf("Network Error") !== -1) errMsg = "网络错误";
    else if (message.indexOf("timeout") !== -1) errMsg = "连接超时";
    msg.error(errMsg, 1);
    return new Promise(() => {});
  }
);

export default ajax;

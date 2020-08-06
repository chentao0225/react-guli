import axios from "axios";
import qs from "querystring";
const ajax = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 2000,
});

ajax.interceptors.request.use((config) => {
  let { data } = config;
  if (data instanceof Object) {
    config.data = qs.stringify(data);
  }
  return config;
});

ajax.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    return new Promise(() => {});
  }
);

export default ajax;

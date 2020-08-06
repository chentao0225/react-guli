import { SAVE_USER_INFO } from "../action_types";

let _user = localStorage.getItem("user");
let _token = localStorage.getItem("token");

let initState = {
  user: _user || {},
  token: _token || "",
  inLogin: _user && _token ? true : false,
};
export default function (preState = initState, action) {
  const { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      const { user, token } = data;
      newState = { user, token, isLogin: true };
      return newState;

    default:
      return preState;
  }
}

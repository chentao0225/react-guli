import { SAVE_USER_INFO } from "../action_types";
export const saveUserInfo = (userObj) => {
  console.log(userObj);
  //向local 存入数据
  localStorage.setItem("user", JSON.stringify(userObj.user));
  localStorage.setItem("token", userObj.token);
  return { type: SAVE_USER_INFO, data: userObj };
};

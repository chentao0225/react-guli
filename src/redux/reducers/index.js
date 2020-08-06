import { combineReducers } from "redux";
import loginRouter from "./login";
export default combineReducers({
  userInfo: loginRouter,
});

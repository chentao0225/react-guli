import { combineReducers } from "redux";
import loginReducer from "./login";
import headerReducer from "./header";
export default combineReducers({
  userInfo: loginReducer,
  header: headerReducer,
});

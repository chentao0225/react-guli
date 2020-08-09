import { combineReducers } from "redux";
import loginReducer from "./login";
import headerReducer from "./header";
import categoryReducer from "./category";
export default combineReducers({
  userInfo: loginReducer,
  header: headerReducer,
  categoryList: categoryReducer,
});

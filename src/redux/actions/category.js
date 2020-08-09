import { SAVE_CATEGORY_LIST } from "../action_types";
import { reqCategoryList } from "../../api";
import { message } from "antd";
const saveCategoryList = (cateArr) => ({
  type: SAVE_CATEGORY_LIST,
  data: cateArr,
});

export const saveCategoryListAsync = () => {
  return async (dispatch) => {
    let res = await reqCategoryList();
    // console.log(res.data);
    const { msg, status, data } = res;
    if (status === 0) {
      dispatch(saveCategoryList(data));
    } else {
      message.error(msg, 1);
    }
  };
};

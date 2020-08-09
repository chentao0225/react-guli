import { SAVE_CATEGORY_LIST } from "../action_types";

const initState = [];
export default function (state = initState, action) {
  const { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_CATEGORY_LIST:
      //   console.log(data);
      newState = [...data].reverse();
      return newState;
    default:
      return state;
  }
}

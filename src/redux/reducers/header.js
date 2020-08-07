import { SAVE_HEADER_TITLE } from "../action_types";

const initState = "";

export default function (state = initState, action) {
  const { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_HEADER_TITLE:
      newState = data;
      return newState;
    default:
      return initState;
  }
}

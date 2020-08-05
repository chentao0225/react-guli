import { INCREMENT, DECREMENT } from "../action_types";
const initState = 0;
export default function (state = initState, action) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return state + data;
    case DECREMENT:
      return state - data;
    default:
      return initState;
  }
}

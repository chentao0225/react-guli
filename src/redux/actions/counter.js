import { INCREMENT, DECREMENT } from "../action_types";
export const increment = (num) => ({ type: INCREMENT, data: num });
export const decrement = (num) => ({ type: DECREMENT, data: num });

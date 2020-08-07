import { SAVE_HEADER_TITLE } from "../action_types";

export const saveTitle = (title) => {
  return { type: SAVE_HEADER_TITLE, data: title };
};

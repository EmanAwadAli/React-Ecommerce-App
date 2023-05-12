import { toast } from "react-toastify";

export const notify = (msg, type) => {
  return toast[type](msg);
};

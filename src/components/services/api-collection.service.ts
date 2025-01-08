import { apiGet } from "./api.services";

export const getState = () => {
  return apiGet("http://localhost:8014/attendance/count-details");
};

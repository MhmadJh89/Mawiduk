import axios from "axios";
import baseURL from "./baseURL";
import token from "./token";

export const getData = async (path: string) => {
  const fullUrl = `${baseURL}/${path}`;
  const response = await axios.get(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

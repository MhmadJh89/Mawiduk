import axios from "axios";
import baseURL from "./baseURL";
import token from "./token";

export const postData = async (path: string, body: object) => {
  const fullUrl = `${baseURL}/${path}`;
  console.log(fullUrl);
  const response = await axios.post(fullUrl, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

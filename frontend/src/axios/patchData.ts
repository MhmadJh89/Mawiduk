import axios from "axios";
import baseURL from "./baseURL";
import token from "./token";

export const patchData = async (path: string, body: object) => {
  const fullUrl = `${baseURL}/${path}`;
  console.log(fullUrl);
  const response = await axios.patch(fullUrl, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

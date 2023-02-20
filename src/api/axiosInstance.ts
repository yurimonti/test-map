import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { getExpirationTime } from "./jwtDecoder";
import dayjs from "dayjs";
import { MY_IP } from "../MyTypes/types";


const baseURL = "http://"+MY_IP+":8080/api/v1";

axios.defaults.baseURL = baseURL;
axios.defaults.responseType = "json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const privateInstance = axios.create({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "multipart/form-data",
  },
});

const publicInstance = axios.create();

const refreshToken = async (refresh: string) => {
  let payload = {
    refresh_token: refresh,
  };
  console.log(localStorage.getItem("access_token"));
  try {
    const { data } = await publicInstance.post("/auth/refresh", payload);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    console.log(error);
  }
};

privateInstance.interceptors.request.use(
  async function (req: any) {
    // Do something before request is sent
    console.log(localStorage.getItem("access_token"));
    const expiration = getExpirationTime(
      localStorage.getItem("access_token") as string
    );
    if (dayjs.unix(expiration as number).diff(dayjs()) < 1) {
      await refreshToken(localStorage.getItem("refresh_token") as string);
      req.headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
    }
    return req;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

export { privateInstance, publicInstance };

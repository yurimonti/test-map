import {
  CapacitorHttp,
  HttpResponse,
  HttpHeaders,
  HttpOptions,
  HttpParams,
} from "@capacitor/core";
import { MY_IP } from "../MyTypes/types";
import dayjs from "dayjs";
import { getExpirationTime } from "./jwtDecoder";
const baseUrl: string = "http://" + MY_IP + ":8080/api/v1";
let baseHeader: HttpHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const getToken = async () => {
  /* console.log("is_executed");
  const current_access = localStorage.getItem("access_token");
  console.log("current access : " + current_access);
  const current_refresh = localStorage.getItem("refresh_token");
  console.log("current refresh : " + current_refresh); */
  const local = localStorage.getItem('access_token');
  const expiration = getExpirationTime(local);
  if (dayjs.unix(expiration as number).diff(dayjs()) < 1) {
    try {
      const newToken = await makePublicRequest({
        url: "/auth/real_refresh",
        method: "post",
        payload: { refresh_token: localStorage.getItem("refresh_token") },
      });
      const tokens: Tokens = newToken.data;
      /* console.log("new access : " + tokens.access_token);
    console.log("new refresh : " + tokens.refresh_token); */
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      return tokens.access_token;
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  } else return local;
};

/* const authHeader = () => {
  return {
    ...baseHeader,
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
}; */

/* console.log(authHeader()); */

const authHeader = (token: any) => {
  return {
    ...baseHeader,
    Authorization: "Bearer " + token,
  };
};

interface RequestParams {
  url: string;
  method: string;
  payload?: any;
  params?: HttpParams;
}

/* const refreshToken = async (refresh: string) => {
  console.log(localStorage.getItem("access_token"));
  try {
    const { data } = await makePublicRequest({url:"/auth/real_refresh", method:'post',payload: {refresh_token: refresh}});
    console.log(data);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    console.log(error);
  }
}; */

export const makePublicRequest = async (
  requestParams: RequestParams
): Promise<HttpResponse> => {
  const options: HttpOptions = {
    url: baseUrl + requestParams.url,
    headers: baseHeader,
    data: requestParams.payload,
    params: requestParams.params,
    method: requestParams.method.toUpperCase(),
  };
  const response: HttpResponse = await CapacitorHttp.request(options);
  return response;
};

export const makePrivateRequest = async (
  requestParams: RequestParams,
  token: string
): Promise<HttpResponse> => {
  /* const token = await asyncLocalStorage.getItem("access_token"); */
  const options: HttpOptions = {
    url: baseUrl + requestParams.url,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: requestParams.payload,
    params: requestParams.params,
    method: requestParams.method.toUpperCase(),
  };
  const response: HttpResponse = await CapacitorHttp.request(options);
  return response;
};

/* function stampa(obj1: any) {
  console.table(obj1);
}
 */
const asyncLocalStorage = {
  setItem: async (key: string, value: string) => {
    await Promise.resolve();
    localStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    await Promise.resolve();
    return localStorage.getItem(key);
  },
};

export const privateRequest = async (option: RequestParams) => {
  const token = await getToken();
  return await makePrivateRequest(option, token!);
};

/* const refreshToken = async () => {
  const ref = localStorage.getItem("refresh_token");
  const response: HttpResponse = await makePublicRequest({
    url: "/auth/real_refresh",
    method: "post",
    payload: { refresh_token: ref },
  });
  console.log(response);
  const data = await response.data;
  await asyncLocalStorage.setItem("access_token", data.access_token);
  await asyncLocalStorage.setItem("refresh_token", data.refresh_token);
}; */

/* export async function requestWithInterceptor(requestParams: RequestParams) {
  try {
    await refTok(localStorage.getItem("refresh_token") as string); */
/* const acc = await asyncLocalStorage.getItem("access_token");
    const ref = await asyncLocalStorage.getItem("refresh_token");
    console.log(acc);
    const response: HttpResponse = await makePublicRequest({
      url: "/auth/real_refresh",
      method: "post",
      payload: { refresh_token: ref },
    });
    console.log(response);
    const data = await response.data;
    await asyncLocalStorage.setItem("access_token", data.access_token);
    await asyncLocalStorage.setItem("refresh_token", data.refresh_token); */
/* await refreshToken(); */
/* const newTokens = {
      previous: {
        access: acc,
        refresh: ref,
      },
      new: {
        access: data.access_token,
        refresh: data.refresh_token,
      },
    };
    stampa(newTokens); */
/*   return await makePrivateRequest(
      requestParams,
      localStorage.getItem("access_token") as string
    );
  } catch (error) {
    console.log(error);
  }
} */

/* export async function requestWithInterceptor(requestParams: RequestParams) {
  console.log(localStorage.getItem("access_token"));
  const expiration = getExpirationTime(
    localStorage.getItem("access_token") as string
  );
  if (dayjs.unix(expiration as number).diff(dayjs()) < 1) {
    try {
      await refreshToken(localStorage.getItem("refresh_token") as string);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  return await makePrivateRequest(requestParams);
} */

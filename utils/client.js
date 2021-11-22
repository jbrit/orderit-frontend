import axios from "axios";
import { logout } from "../actions/auth";
import Config from "../config";
import { LocalStorage } from "./storage";

export class Client {
  baseUrl = Config.BaseApiUrl;
  authUrl = Config.AuthApiUrl;
  accessTokenKey = Config.AccessTokenKey;
  refreshTokenKey = Config.RefreshTokenKey;
  storage = new LocalStorage();

  constructor(storage) {
    if (storage) this.storage = storage;
    axios.defaults.baseURL = this.baseUrl;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.interceptors.response.use(null, async (error) => {
      if (error.config && error.response && error.response.status === 401) {
        if (error?.response?.data?.message?.includes("refresh")) {
          return Promise.reject(error);
        }
        // Correct Later
        if (
          error.response.data.message.includes("token not valid") ||
          error.response.data.message.includes("Token is invalid")
        ) {
          if (error.config.url.includes("/token/refresh/")) {
            logout();
            return Promise.reject(error);
          }
          const refreshToken = await this.storage.getItem(this.refreshTokenKey);

          let token = {};

          const request = await axios({
            method: "post",
            data: { refresh: refreshToken },
            responseType: "json",
            url: "/token/refresh/",
            baseURL: this.authUrl,
          });

          token = request.data;

          await this.storage.setItem(this.accessTokenKey, token.access);

          if (token.refresh) {
            this.storage.setItem(this.refreshTokenKey, token.refresh);
          }

          error.config.headers.Authorization = `Bearer ${token.access}`;
          return axios.request(error.config);
        }
      }
      return Promise.reject(error);
    });
  }

  async request(url, method, data, headers) {
    const options = {
      data,
      headers,
      method,
      responseType: "json",
      url,
    };

    try {
      const response = await axios(options);

      return Promise.resolve(this.getResponse(response));
    } catch (error) {
      if (!error.json) {
        return Promise.reject(this.getResponse({ error, status: -1 }));
      }

      const errorText = error.text();

      return Promise.reject(this.getResponse(error, errorText));
    }
  }

  getResponse(response, text = "") {
    if (response && response.error) {
      const { error } = response;
      if (!error.response) {
        return {
          body: "Network error",
          headers: {},
          status: -1,
        };
      }

      return {
        body: error.response.data,
        headers: error.response.headers,
        status: error.response.status,
      };
    }

    return {
      data: response ? response.data : text,
      headers: response ? response.headers : {},
      status: response ? response.status : 200,
    };
  }
}

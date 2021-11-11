import axios from "axios";
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
        if (error.config.data && error.config.data.includes("refreshToken")) {
          return Promise.reject(error);
        }
        // Correct Later
        if (error.response.status === "400") {
          const refreshToken = await this.storage.getItem(this.refreshTokenKey);

          let token = {};

          const request = await axios({
            method: "post",
            data: { refreshToken },
            responseType: "json",
            url: "token/refresh",
            baseURL: this.authUrl,
          });

          token = request.data;

          await this.storage.setItem(this.accessTokenKey, token.accessToken);

          if (token.refreshToken) {
            this.storage.setItem(this.refreshTokenKey, token.refreshToken);
          }

          error.config.headers.Authorization = `Bearer ${token.accessToken}`;
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
      body: response ? response.data : text,
      headers: response ? response.headers : {},
      status: response ? response.status : 200,
    };
  }
}

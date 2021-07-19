import { Client } from "./client";
import Config from '../config';
import { LocalStorage } from "./storage";

export function createAuthorizationHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

export function createUrl(uri, baseUrl, query) {
  let url = uri[0] !== "/" ? uri : uri.slice(1);
  const domainUrl =
    baseUrl[baseUrl.length - 1] !== "/"
      ? baseUrl
      : baseUrl.slice(0, baseUrl.length - 1);

  if (query) {
    url = `${url}?${stringify(query)}`;
  }

  return `${domainUrl}/${url}`;
}

export class Api {
  storage = new LocalStorage();
  client;

  accessTokenKey = Config.AccessTokenKey;
  refreshTokenKey = Config.RefreshTokenKey;
  authUrl = Config.AuthApiUrl;
  baseUrl = Config.BaseApiUrl;

  constructor() {
    this.client = new Client(this.storage);
  }

  async request(
    uri,
    { requiresAuthentication, body, headers = {}, method = "get", queryParams }
  ) {
    const url = createUrl(
      uri,
      requiresAuthentication ? this.baseUrl : this.authUrl,
      queryParams
    );

    let request;

    if (requiresAuthentication && !headers.authorization) {
      const tokens = await this.getToken();

      request = this.client.request(url, method, body, {
        ...createAuthorizationHeader(tokens.accessToken),
        ...headers,
      });
    } else {
      request = this.client.request(url, method, body, headers);
    }

    const data = await request;

    return data;
  }

  async getToken() {
    let refreshToken;

    try {
      const accessToken = await this.storage.getItem(this.accessTokenKey);

      if (accessToken === null) {
        throw new Error("InvalidAccessToken");
      }

      try {
        refreshToken = await this.storage.getItem(this.refreshTokenKey);

        if (refreshToken === null) {
          throw new Error("InvalidRefreshToken");
        }
      } catch (error) {
        return {
          accessToken,
        };
      }

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return Promise.reject();
    }
  }

  removeToken() {
    return Promise.all([
      this.storage.removeItem(this.accessTokenKey),
      this.storage.removeItem(this.refreshTokenKey),
    ]);
  }

  async refreshToken() {
    const { refreshToken } = await this.getToken();

    try {
      const token = await this.request("/token/refresh", {
        body: { refreshToken },
        method: "post",
      });

      await this.setToken({ token });

      return token;
    } catch (error) {
      return Promise.reject();
    }
  }

  async setToken({ token }) {
    await this.storage.setItem(this.accessTokenKey, token.accessToken);

    if (token.refreshToken) {
      await this.storage.setItem(this.refreshTokenKey, token.refreshToken);
    }

    return token;
  }

  async setItem(key, value) {
    try {
      await this.storage.setItem(key, JSON.stringify(value));

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getItem(key) {
    return this.storage.getItem(key);
  }
}

const api = new Api();

export { api };

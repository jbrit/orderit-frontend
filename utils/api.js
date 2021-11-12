import { Client } from "./client";
import Config from "../config";
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
    const [accessToken, refreshToken] = await Promise.all([
      this.storage.getItem(this.accessTokenKey),
      this.storage.getItem(this.refreshTokenKey),
    ]);

    return { accessToken, refreshToken };
  }

  removeToken() {
    return Promise.all([
      this.storage.removeItem(this.accessTokenKey),
      this.storage.removeItem(this.refreshTokenKey),
    ]);
  }

  async setToken({ token }) {
    console.log(this, this.storage);
    await Promise.all([
      this.storage.setItem(this.accessTokenKey, token.accessToken),
      this.storage.setItem(this.refreshTokenKey, token.refreshToken),
    ]);
    return token;
  }
}

const api = new Api();

export { api };

import { api } from "../utils/api";

export async function login(email, password) {
  const response = await api.request(`/login/`, {
    method: "POST",
    body: { email, password },
  });
  return response.data;
}

export async function register(email, password, confirm_password) {
  const response = await api.request(`/register/`, {
    method: "POST",
    body: { email, password, confirm_password },
  });
  return response.data;
}

export async function refreshToken(refresh) {
  const response = await api.request(`/token/refresh/`, {
    method: "POST",
    body: { refresh },
  });
  return response.data;
}

export async function activateAccount(uid, token) {
  const response = await api.request(`/api/auth/activate/${uid}/${token}/`, {
    method: "GET",
  });
  return response.data;
}

import { api } from "../utils/api";

export async function getOrderItems() {
  const response = await api.request("/orders/items/", {
    method: "GET",
    requiresAuthentication: true
  });
  return response.data;
}

export async function getMeals() {
  const response = await api.request("/orders/meals/", {
    method: "GET",
    requiresAuthentication: true
  });
  return response.data;
}

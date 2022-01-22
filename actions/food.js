import { api } from "../utils/api";

export async function getOrderItems() {
  const response = await api.request("/orders/items/", {
    method: "GET",
    requiresAuthentication: true,
  });
  return response.data;
}

export async function getMeals() {
  const response = await api.request("/orders/meals/", {
    method: "GET",
    requiresAuthentication: true,
  });
  return response.data;
}

export async function placeOrder(order) {
  const response = await api.request("/orders/make-order/", {
    method: "POST",
    requiresAuthentication: true,
    body: order,
  });
  return response.data;
}

export async function getMyOrders() {
  const response = await api.request("/orders/orders/", {
    method: "GET",
    requiresAuthentication: true,
  });
  return response.data;
}

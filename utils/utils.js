import router from "next/router";
import { api } from "./api";

export const getError = (error) => {
  const message = error?.body?.message;
  if (!message) return null;
  if (typeof message === "string") return message;
  return message[Object.keys(message)[0]][0];
};

export const capitalize = (word) => {
  return word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const redirectLoggedOut = () =>
  api.getToken().catch(() => router.push("/login"));

export const getMonth = (date = new Date()) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.getMonth()];
};

export const getCategory = (item) => {
  switch (item.category) {
    case "Main Dish":
      return "Food";
    case "Swallow":
      return "Food";
    case "Drinks and Beverages":
      return "Drink";
    case "Garnish":
      return "Extra";
    case "Snacks":
      return "Snack";
    default:
      return item.category;
  }
};

import axios from "axios";

export const http = axios.create({
  baseURL: "https://randomuser.me/api/?results=12",
  timeout: 15000,
});
import Axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const token = cookies["pombo-token"];

const api = Axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default api;

import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'recycleit.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://10.0.0.5:3333'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

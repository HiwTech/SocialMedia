import axios from 'axios'

export const makeRequest = axios.create({
  baseURL: "http://localhost:8880/api",
  withCredentials: true,// we want to sent our access token to our backend
});
import axios, {AxiosInstance} from "axios";

const Api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export default Api;

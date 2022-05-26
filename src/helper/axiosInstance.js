import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api.bitpin.ir/v1/mkt",
});
export default axiosInstance;

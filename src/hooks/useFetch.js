import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";

const AxiosInstance = (router = null) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (!error.response) {
        toast.warn("Network Error", {
          toastId: "custom-id-network",
        });
      } else {
        if (error.response.status === 400) {
          toast.warn(error.response.data.message, {
            toastId: "custom-id-400",
          });
        }

        if (error.response.status === 401) {
          toast.warn(error.response.data.message, {
            toastId: "custom-id-401",
          });
          router.push("/auth?https://camp.roocket.ir/camps");
        }

        if (error.response.status === 403) {
          toast.warn(error.response.data.message, {
            toastId: "custom-id-403",
          });
        }
        if (error.response.status === 432) {
          router.push("/auth/acceptPhone");
          toast.warn(error.response.data.message.user[0], {
            toastId: "custom-id-403",
          });
        }
        if (error.response.status === 404) {
          toast.warn("404 Internal Server Error", {
            toastId: "custom-id-404",
          });
        }

        if (error.response.status === 500) {
          toast.warn("500 Internal Server Error", {
            toastId: "custom-id-500",
          });
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default AxiosInstance;

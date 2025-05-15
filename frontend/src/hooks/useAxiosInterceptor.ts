import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Clear local state if needed
          localStorage.removeItem("user"); // optional

          // Redirect to login page
          navigate("/", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Eject interceptor on unmount
    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);
};

export default useAxiosInterceptor;
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://asset-management-api-tf4m.onrender.com'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    //     // request interceptor to add authorization header for every secure call to the API
    //     axiosSecure.interceptors.request.use(function(config) {

    //         const token = localStorage.getItem('access-token');

    //         config.headers.authorization = `Bearer ${token}`;

    //         return config;
    //     }, function (error) {
    //         return Promise.reject(error);
    //     });

    //     // response interceptor (401 and 403 status)
    //     axiosSecure.interceptors.response.use(function(response) {
    //         return response;
    //     }, async (error) => {
    //         const status = error.response.status;
    //         console.log('status error in the interceptor', status);

    //         // for 401 or 403 logOut the user and move the user to the login page
    //         if(status === 401 || status === 403) {
    //             await logOut();
    //             navigate('/login')
    //         }
    //         return Promise.reject(error)
    //     })

    //     return axiosSecure;
    // };
    useEffect(() => {
        // request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                console.log('status error in the interceptor', status);

                if (status === 401 || status === 403) {
                    await logOut();
                    navigate('/login', { replace: true });
                }
                return Promise.reject(error);
            }
        );

        // cleanup
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};


export default useAxiosSecure;
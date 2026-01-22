import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://asset-management-api-tf4m.onrender.com'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
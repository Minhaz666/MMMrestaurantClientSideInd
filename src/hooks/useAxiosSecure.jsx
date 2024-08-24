import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

 const axiosSecure = axios.create({
    baseURL:'http://localhost:5000/',
    // 'https://minhaz-restau-rant-practice-server.vercel.app/' todo******
})

const useAxiosSecure = () => {

    const {signOutUser}=useContext(AuthContext);
    const navigate = useNavigate();

    // Add a request interceptor
axiosSecure.interceptors.request.use( (config) => {
    const token = localStorage.getItem('access-token');
    // console.log(token)
    //send headers so that i don't need to send headers manually every time after api
    //just when i use axios secure instance its automatically send to backend
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, 
  // async (error) => {
  //   const status = error.response.status;
  //   console.log('status error in the interceptor',status)
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   if(status === 401 || status === 403){
  //     await  signOutUser();
  //       navigate('/login')
  //   }
   
  //   return Promise.reject(error);
  //   }
);

    return axiosSecure;
};

export default useAxiosSecure;
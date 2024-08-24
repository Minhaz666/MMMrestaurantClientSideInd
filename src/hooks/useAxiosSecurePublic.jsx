import axios from 'axios';
import React from 'react';

const axioxSecurePublic=axios.create({
    baseURL:'http://localhost:5000/',
})

const useAxiosSecurePublic = () => {

    return axioxSecurePublic;
};

export default useAxiosSecurePublic;
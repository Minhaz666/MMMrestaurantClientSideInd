import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user,loading}=useContext(AuthContext)
    // console.log(user)
    const AxiosSecure = useAxiosSecure()

    //ekhane data hishebe ashe sob data data:admin means datar nam cng kore deoa hoise admin
    const {data: admin,isPending : isAdminLoading}=useQuery({
        queryKey:['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const data = await AxiosSecure.get(`/users/admin/${user?.email}`)
            return data.data;        
        }
    })

    return {admin,isAdminLoading}
};

export default useAdmin;
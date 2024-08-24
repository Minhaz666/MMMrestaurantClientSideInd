import { useQuery, useQueryClient } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecurePublic from "./useAxiosSecurePublic";

const useCarts = () => {

    const axiosSecurePublic = useAxiosSecurePublic()
    const {user} = useContext(AuthContext)

    const {isPending,error,data: cart=[],refetch} = useQuery({ 
        //query key te ja ja diye data load korbo ta ta pathabo 
        queryKey: ['carts',user?.email], 
        queryFn: async () => {
            const res = await axiosSecurePublic.get(`/carts?email=${user.email}`)
            return res.data;
          }, })
          
    return [cart,refetch];
};

export default useCarts;
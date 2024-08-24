import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecurePublic from "./useAxiosSecurePublic";


const useMenu = () => {

        // data load by useEffect

//     const [menu,setMenu]=useState([])
//     const [loading,setLoading]=useState(true)
    

//     useEffect(() => {
//         fetch("http://localhost:5000/menu")
//             .then(res => res.json())
//             .then(data =>{
            
//                 setMenu(data);
//                 setLoading(false)

//             });
// },[]);

        //Data load by tanStack

        const axiosSecurePublic=useAxiosSecurePublic()

 const {data: menu=[],refetch}=useQuery({
    queryKey:['menu'],
    queryFn: async ()=>{
    const res = await axiosSecurePublic.get('/menu')
    return res.data  

    }
 })       
// console.log(menu)
return [menu,refetch]
}
export default useMenu;
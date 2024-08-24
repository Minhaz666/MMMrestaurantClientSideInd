import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaAdn, FaTrashAlt, FaUser, FaUserAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAdmin from '../../../hooks/useAdmin';

const AllUsers = () => {
    const AxiosSecure = useAxiosSecure();
    const {admin}=useAdmin()

    // tanStack ( for data load )
    const { data: users = [], refetch } = useQuery({
        queryKey: ['/users'],
        queryFn: async () => {
            const data = await AxiosSecure.get('/users',
                // {
                // //this part is sent from axiosSecure
                // headers:{
                //     'Authorization' : `bearer ${localStorage.getItem('access-token')}`
                // }
                //  }
        )
            return data.data;
        },
    })



    const handleAdmin = (user) => {
        AxiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            // console.log(res)
            if(res.data.matchedCount>0)
                {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now admin`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }

              refetch();
        })

    }


    const handleDlete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            AxiosSecure.delete(`/users/${id}`)
            .then(res=>{
             
            if (res.data.deletedCount>0) {
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
            })

        })
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">{users.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 'admin' ?
                                                <>
                                                  admin
                                                </>
                                                :
                                                <>
                                                <button className='btn bg-orange-500 text-xl' onClick={() => { handleAdmin(user) }}>
                                                <FaUsers></FaUsers>
                                            </button>
                                                </>
                                            }
                                        </td>
                                        <td>
                                        <button onClick={() =>{ handleDlete(user._id)}} className="btn btn-ghost btn-xs"><FaTrashAlt className='text-xl text-red-600'></FaTrashAlt></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
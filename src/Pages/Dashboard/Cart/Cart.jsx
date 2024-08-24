import React from 'react';
import useCarts from '../../../hooks/useCarts';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Cart = () => {

    const [cart,refetch] = useCarts()
    const AxiosSecure = useAxiosSecure();

    const totalPrice = cart.reduce((price, iteam) => price + iteam.price, 0)
    // console.log(totalPrice)

    const handleDlete = (id) => {
        

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            AxiosSecure.delete(`/carts/${id}`)
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

        });
    }

    return (
        <div className='p-4  '>
            <div className=' flex gap-6 justify-between'>
                <h1 className='text-3xl'>Items : {cart.length}</h1>
                <h1 className='text-3xl'>Total Price : {totalPrice}</h1>
                {
                    cart.length ?
                    <>
                    <Link to={'/dashboard/payment'}><button className='btn btn-primary'>Pay</button></Link>
                    </>:
                    <>
                    <button className='btn btn-primary' disabled>Pay</button>
                    </>
                }
            </div>

            <div>
                {/*table content */}
                <div className="overflow-x-auto ">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Item</th>
                                <th>Name</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((item, index) =>
                                    <tr key={item._id}>
                                        {/* <th>{index+1}</th> */}
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </td>
                                        <td>{item.price}</td>
                                        <th>
                                            <button onClick={() => handleDlete(item._id)} className="btn btn-ghost btn-xs"><FaTrashAlt className='text-xl text-red-600'></FaTrashAlt></button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
                {/* table end */}
            </div>

        </div>
    );
};

export default Cart;
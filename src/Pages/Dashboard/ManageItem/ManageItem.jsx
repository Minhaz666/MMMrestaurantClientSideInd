import React from 'react';
import SectionTitle from '../../../Shared/components/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItem = () => {

    const [menu,refetch]=useMenu()
    const axiosSecure=useAxiosSecure()

    const handleUpdate=(id)=>{

    }

    const handleDelete= (id)=>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {

            const res = await axiosSecure.delete(`/menu/delete/${id}`)
            console.log(res.data)
            if (res.data.deletedCount>0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                refetch()
            }
        })
    }

    return (
        <div>
            <SectionTitle heading={'Manage All Items'} subHeading={'Hurry uppp'}></SectionTitle>

            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>List</th>
        <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        menu.map((item,index)=>
      <tr key={item._id}>
      {/* //image */}
      <td>
        {index+1}
      </td>
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
      {/* item name */}
      <td>
        {
            item.name
        }
      </td>
      {/* price */}
      <td>{item.price}</td>
      {/* update */}
      <th>
      <Link to={`/dashboard/manageItems/update/${item._id}`}>
      <button  className="btn btn-ghost btn-xs"><FaEdit className='text-xl  text-blue-500'></FaEdit></button>
      </Link> 
      </th>
      {/* delete */}
      <th>
      <button onClick={()=>{handleDelete(item._id)}} className="btn btn-ghost btn-xs"><FaTrashAlt className='text-xl text-red-600'></FaTrashAlt></button>
      </th>
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

export default ManageItem;
import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Shared/components/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import useAxiosSecurePublic from '../../../hooks/useAxiosSecurePublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateItems = () => {
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const axiosSecurePublic = useAxiosSecurePublic();
    const axiosSecure = useAxiosSecure()
    const navigate=useNavigate()

    //create image api from imagebb
    const image_hosting_api_key = import.meta.env.VITE_IMAGE_hosting_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`


    const item =useLoaderData()
    const {category,image,name,price,recipe,_id} = item
    // console.log(item)

    const onSubmit= async (data)=>{
        // console.log(data)

             //image upload to imagebb and get url
             const imageFile={image: data.image[0]} 
             const res = await axiosSecurePublic.post(image_hosting_api,imageFile,{
                 headers:{
                     'Content-Type': 'multipart/form-data'
                 }
             })
     
    
        
        const updatemenuItem = {
            name:data.name,
            category: data.category,
            price:parseFloat(data.price),
            recipe:data.recipe,
            image:res.data.data.display_url
        }

          //patching manuItem and update data to the menu server

          const resforUpdatemenu = await axiosSecure.patch(`/menus/${_id}`,updatemenuItem)
        //   console.log(resforUpdatemenu.data.modifiedCount)
          if(resforUpdatemenu.data.modifiedCount)
              {
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `${updatemenuItem.name} has been added`,
                      showConfirmButton: false,
                      timer: 3000
                    });
  
                    reset()
                    navigate('/dashboard/manageItems')

              }
    }

    return (
        <div className='p-6'>
           <SectionTitle heading={'update an Item'} subHeading={'refresh info'}></SectionTitle>
       
       
        {/* form related */}
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* for name */}

        <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text">Recipe Name*</span>
                </label>
                <input
                    type="text"
                    defaultValue={name}
                    placeholder="Recipe Name"
                    {...register('name', { required: true })}
                    required
                    className="input input-bordered w-full" />
            </div>

          
                {/* category and price */}

                <div className="flex gap-6">
                {/* category */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Category*</span>
                    </label>
                    <select defaultValue={category} {...register('category', { required: true })}
                        className="select select-bordered w-full">
                        <option disabled value="default">Select a category</option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                    </select>
                </div>

                {/* price */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Price*</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={price}
                        placeholder="Price"
                        {...register('price', { required: true })}
                        className="input input-bordered w-full" />
                </div>

            </div>

                         {/* recipe details */}
               <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipe Details</span>
                </label>
                <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
            </div>

            {/* for image field */}
            <div className="form-control w-full my-6">
                <input  {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
            </div>
            
            <button className="btn bg-green-800">
              UPDATE
            </button>
   
    </form>
       
        </div>
    );
};

export default UpdateItems;
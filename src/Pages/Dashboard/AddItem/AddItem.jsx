import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Shared/components/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import useAxiosSecurePublic from '../../../hooks/useAxiosSecurePublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddItem = () => {
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const axiosSecurePublic = useAxiosSecurePublic();
    const axiosSecure = useAxiosSecure()

    const image_hosting_api_key = import.meta.env.VITE_IMAGE_hosting_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`


    const onSubmit = async (data) => {
        // console.log(data)

        //image upload to imagebb and get url
        const imageFile={image: data.image[0]} 
        const res = await axiosSecurePublic.post(image_hosting_api,imageFile,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })

        // console.log(res.data)

        const menuItem = {
            name:data.name,
            category: data.category,
            price:parseFloat(data.price),
            recipe:data.recipe,
            image:res.data.data.display_url
        }

        // console.log(menuItem)

        //posting manuItem data to the menu server

        const resformenu = await axiosSecure.post('/menus',menuItem)
        console.log(resformenu)
        if(resformenu.data.insertedId)
            {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${menuItem.name} has been added`,
                    showConfirmButton: false,
                    timer: 1500
                  });

                  reset()
            }

    };


    return (
        <div className='p-6 '>

        {/* section title */}

        <SectionTitle heading={'add an item'} subHeading={"what's new..??"}></SectionTitle>

        {/* form related */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* for name */}

                <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
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
                            <select defaultValue="default" {...register('category', { required: true })}
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
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    {/* for image field */}
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    
                    <button className="btn bg-green-800">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
           
            </form>
        </div>
    );
};

export default AddItem;
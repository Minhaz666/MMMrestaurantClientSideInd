import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCarts from '../../hooks/useCarts';

const ItemCards = ({ item }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const {user} = useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [,refetch] = useCarts();

    const { name, recipe, image, price, category,_id } = item

    const handleCart = (item)=>{
        // console.log(item)
        if(user && user.email)
        {
            // console.log(user.email)

            const cartItem={
                manuId: _id,
                email: user.email,
                name,image,price,
            }
            // console.log(cartItem)

            axiosSecure.post('/carts',cartItem)
            .then(res=>{
                // console.log(res)
                refetch();
            })
        }
        else
        {
            navigate('/login', {state : {from:location}})
        }
    }

    return (
        <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={image} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{name}</h2>
                        <p>{recipe}</p>
                        <p> <small className=' uppercase text-orange-300'>Item type:</small> {category}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary uppercase" onClick={()=>handleCart(item)}>add to the cart</button>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default ItemCards;
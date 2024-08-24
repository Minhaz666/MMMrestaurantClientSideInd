import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Shared/components/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import useCarts from '../../../hooks/useCarts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosSecurePublic from '../../../hooks/useAxiosSecurePublic';

//todo
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log(stripePromise)


const Payment = () => {
    const axiosSecurePublic=useAxiosSecurePublic()
    const [clientSecret, setClientSecret] = useState("");

   const [cart,refetch]=useCarts()
   const totalPrice = cart.reduce((total,iteam)=>total+iteam.price,0)
   
// payment intent
// return new StripeInvalidRequestError(rawStripeError) for total price;
    if(totalPrice){
        useEffect(() => {
            axiosSecurePublic.post('/create-payment-intent',{totalPrice})
            .then(res=>setClientSecret(res.data.clientSecret))
           }, [axiosSecurePublic, totalPrice]);
    }

      const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };
    

    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'please pay to eat'}></SectionTitle>

            <div>
            {
                clientSecret &&(
                    <Elements options={options} stripe={stripePromise} >
                    <CheckOutForm clientSecret={clientSecret}></CheckOutForm>
                </Elements>
                )
            }
            </div>

        </div>
    );
};

export default Payment;
import React, { useContext, useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { AuthContext } from '../../../Provider/AuthProvider';
import useCarts from '../../../hooks/useCarts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosSecurePublic from '../../../hooks/useAxiosSecurePublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckOutForm = ({clientSecret}) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const{user}=useContext(AuthContext)
    const [transactionId, setTransactionId] = useState('');
    const [cart,refetch] = useCarts()
    const [errorMessage, setErrorMessage] = useState(null);
    const AxiosSecure=useAxiosSecure();
    const AxiosSecurePublic=useAxiosSecurePublic();
    const navigate= useNavigate()
   

    const totalPrice = cart.reduce((total,item)=>total+item.price,0)

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log( error.message);
            setErrorMessage(error.message)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setErrorMessage('');
        }
          // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            setErrorMessage(confirmError.message)
        }

        else{
            // console.log('payment intent: ', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                
                
                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.manuId),
                    status: 'pending'
                }

                const res = await AxiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch()
                
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "payment success",
                        title: "Thank you for payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')

                }
            }
        }
    };


    return (
        <div className='mx-3'>
            <form onSubmit={handleSubmit}>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#FFAE42',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                >
                </CardElement>

                <button className='btn btn-primary text-2xl my-4 ' type="submit" disabled={!stripe || !elements}>
                    Pay
                </button>
                {/* Show error message to your customers */}
                
                  
                    <p className='text-red-600'>{errorMessage}</p>
                    <p className="text-red-600">{errorMessage}</p>
                  {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                  
            </form>
        </div>
    );
};

export default CheckOutForm;
import React, { useContext } from 'react';
import SectionTitle from '../../../Shared/components/SectionTitle';
import { AuthContext } from '../../../Provider/AuthProvider';
import useCarts from '../../../hooks/useCarts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const {user}=useContext(AuthContext);
    const [cart,refetch]=useCarts()
    const AxiosSecure=useAxiosSecure();

    //data load for paymentHistory
    const {data : payment=[] }=useQuery({
        queryKey:['paymentHistory',user?.email],
        queryFn:async ()=>{
            const res = await AxiosSecure.get(`/paymentHistory/${user.email}`) 
            return res.data;
        }
    })
    // console.log(payment,cart.length)
    return (
        <div className='p-6'>
            <SectionTitle heading={'Payment History'} subHeading={'check your payment details'}></SectionTitle>
            <h1 className='text text-3xl'>Total Payment History : {payment.length}</h1>
            
            {/* table of payment history */}
            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr className='text text-2xl'>
        <th>No</th>
        <th>Price</th>
        <th>Transiction Id</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        payment.map((item,index)=> <tr className='text text-xl'>
            <th>{index + 1}</th>
            <td>{item.price}</td>
            <td>{item.transactionId}</td>
            <td>{item.status}</td>
          </tr>)
     }
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default PaymentHistory;
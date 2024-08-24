import React from 'react';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCarts from '../hooks/useCarts';
import useAdmin from '../hooks/useAdmin';

const DashBoard = () => {
    const [cart]=useCarts();
    const {admin}=useAdmin()
    // console.log(admin)
    // const isAdmin = true;  this one is harCoded
    const isAdmin = admin; //this one is dynamical from database by useAdmin hook

    return (
        <div className='flex'>
            
            <div className='w-64 min-h-screen bg-orange-400 text-blue-800 p-5'>
                  <ul className='menu p-3'> 
                       {
                        isAdmin ?
                        // for admin
                        <>

                         <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/adminHome'}> <FaHome></FaHome> Admin Home</NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/addItem'}> <FaUtensils></FaUtensils> Add Items</NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/manageItems'}> <FaList></FaList> Manage Items </NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/bookings'}> <FaBook></FaBook> Manage Bookings</NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/users'}> <FaList></FaList>  All Users </NavLink>
                        </li>

                        </>

                        :

                        // for user

                        <>
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/userHome'}> <FaUser></FaUser> User Home</NavLink>
                        </li>
                        
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/reservation'}> <FaCalendar></FaCalendar> reservation</NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/cart'}> <FaShoppingCart></FaShoppingCart> Cart ({cart.length}) </NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/review'}> <FaAd></FaAd> Add Review</NavLink>
                        </li>
                       
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/bookings'}> <FaList></FaList>  My Bookings </NavLink>
                        </li>

                        </>
                       }

                        <div className='divider bg-white'></div>

                        <li className='py-1 text-sm'>
                            <NavLink to={'/'}> <FaUser></FaUser> Home</NavLink>
                        </li>
                        <li className='py-1 text-sm'>
                            <NavLink to={'/dashboard/paymentHistory'}> <FaList></FaList> Patment History</NavLink>
                        </li>
                  </ul>
            </div>

            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashBoard;
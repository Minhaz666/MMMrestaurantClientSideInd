import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecurePublic from '../../hooks/useAxiosSecurePublic';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const {GoogleSignIn}=useContext(AuthContext)
    const axiosSecurePublic=useAxiosSecurePublic() 
    const navigate=useNavigate()

    const handleSignIn =()=>{
        GoogleSignIn()
        .then((result) => {
            const user = result.user;
            // console.log(user)
            const userInfo={email:user?.email,name:user?.displayName}
            axiosSecurePublic.post('/users',userInfo)
            .then(res=>{
                // console.log(res.data)
                navigate('/')
            })
        })
          .catch((error) => {
            const errorMessage = error.message;
          });
    }

    return (
        <div className='p-4 '>
            <button onClick={handleSignIn} className='btn btn-circle btn-outline'><FaGoogle></FaGoogle></button>
        </div>
    );
};

export default GoogleLogin;
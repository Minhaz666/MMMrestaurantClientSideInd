import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../Shared/SocialLogin/GoogleLogin';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosSecurePublic from '../../hooks/useAxiosSecurePublic';

const Login = () => {

    const {signinUser}= useContext(AuthContext)
    const axiosSecurePublic = useAxiosSecurePublic()

    const [disable,setDesable]=useState(true);

    const location =useLocation()
    // console.log(location)
    const from = location.state?.from?.pathname || '/' ;

    const navigateTo= useNavigate()

    useEffect(()=>{
        loadCaptchaEnginge(4); 
    },[])

    const handleLogin=(event)=>
    {
        event.preventDefault();
       const email = event.target.email.value;
       const password = event.target.password.value;
       signinUser(email,password)
        .then(res=>{
          
            const userInfo={email :res.user.email, name:res.user.displayName}
            axiosSecurePublic.post('/users',userInfo)
            .then(res=>{
                // console.log(res)
                navigateTo(from)
            })
        })
    }

    const doSubmit = (event) => {
        // <! --   let's assume there is an HTML input text box with id 'user_captcha_input' to get user input -->   
        event.preventDefault()    
        const  user_captcha_value = document.getElementById('user_captcha_input').value;
        
             if (validateCaptcha(user_captcha_value)==true) {
                 setDesable(false)
             }
        
             else {
                 alert('Captcha Does Not Match');
             }
         };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-1/2">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0  max-w-sm shadow-2xl bg-base-100 w-1/2">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                           
                            <div className="form-control ">
                                <label className="label">
                                <LoadCanvasTemplate />
                                </label>
                                <input  type="trxt"  onBlur={doSubmit} id='user_captcha_input' placeholder="write the above text" className="input input-bordered" required />
                            </div>
                           
                            <div className="form-control mt-6">
                                <input type="submit" disabled={disable} className="btn btn-primary" required />
                            </div>
                        </form>
                           {/* google sign in */}
                       <div className="mx-auto p-5 text-2xl text-yellow-300">
                       <GoogleLogin></GoogleLogin>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
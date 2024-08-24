import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";
// import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";

const SignUp = () => {

    const {creatUser, profileUpdate}=useContext(AuthContext)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        creatUser(data.email,data.password)
        .then((result) => { 
            const user = result.user;
            console.log(user)
            profileUpdate(data?.name ,data?.photo )
            .then((result) => {
              console.log(result)
              navigate('/')
              reset()
              }).catch((error) => {
                // An error occurred
                // ...
              });
              // [END auth_update_user_profile_modular]
          })
    }

    return (
        <div>
            {/* signup */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-1/2">
                        <h1 className="text-5xl font-bold">SignUp !!!!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                            {/* name     */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered"  {...register("name", { required: true })} />

                                {errors.name?.type === "required" && (
                                    <p className=" text-red-500 mt-2" role="alert">name is required</p>
                                )}

                            </div>

                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered"  {...register("email", { required: true })} />

                                {errors.email?.type === "required" && (
                                    <p className=" text-red-500 mt-2" role="alert">email is required</p>
                                )}

                            </div>

                            {/* photo url */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="photoURL" className="input input-bordered" {...register('photo')} />
                            </div>

                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"  {...register("password",{ required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/ })} />

                                {errors.password?.type === "required" && (
                                    <p className=" text-red-500 mt-2" role="alert">password is required</p>
                                )}
                            
                                {errors.password?.type === "minLength" && (
                                    <p className=" text-red-500 mt-2" role="alert">password have to more then 6 character</p>
                                )}
                                
                                {errors.password?.type === "maxLength" && (
                                    <p className=" text-red-500 mt-2" role="alert">password have to within 20 character</p>
                                )}

                                {errors.password?.type === "pattern" && (
                                    <p className=" text-red-500 mt-2" role="alert">password have to one uppercase one specialcase letter, one lowercase,   letter</p>
                                )}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary"></input>
                            </div>
                        </form>
                        {/* google sign in */}
                       <div className="">
                        <GoogleLogin></GoogleLogin>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SignUp;
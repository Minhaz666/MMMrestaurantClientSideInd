import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCarts from "../../hooks/useCarts";
import { FaCartPlus } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";

const Header = () => {

    const { signOutUser, user } = useContext(AuthContext)
    const [carts] = useCarts();
    const {admin}=useAdmin()
    // console.log(carts)

    const handleLogOut = () => {
        signOutUser()
    }

    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/ourshop'}>Our Shop</Link></li>
        <li><Link to={'/signup'}>SignUp</Link></li>
        {
            user && !admin &&
            <li><Link to={'/dashboard/userHome'}>Dashboard</Link></li>
        }
        {
            user && admin &&
            <li><Link to={'/dashboard/adminHome'}>Dashboard</Link></li>
        }
        <li>
                <Link to={'/dashboard/cart'}>
                    {user?.email ?
                        <>
                            <li><button onClick={handleLogOut}>Logout</button>  </li>

                            <li className="flex justify-center">
                                <button className="btn text-lg text-white">
                                    <p className="text-xl"><FaCartPlus />
                                    </p>
                                    <div className="badge badge-warning text-center bg-slate-900 text-white text-xl p-3">{carts.length}</div>
                                </button>
                            </li>

                            <li className="flex justify-center ">{user?.displayName}</li>
                        </>
                        :
                        <>
                            <li><Link to={'/login'}>Login</Link> </li>
                        </>}
                </Link>
        </li>
    </>

    return (
        <div>


            <div className="navbar bg-base-100 opacity-50 text-white z-10 fixed ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navOptions
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">MMM Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navOptions
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>


        </div>
    );
};

export default Header;
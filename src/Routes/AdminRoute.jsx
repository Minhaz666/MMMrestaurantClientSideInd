import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {

    const {admin,isAdminLoading} = useAdmin()
    const {user,loading} =useContext(AuthContext);
    const location =useLocation()

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && admin){
        return children;
    }

    return <Navigate to={'/login'} state={{from:location}}></Navigate>
};

export default AdminRoute;
import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const UserHome = () => {

    const { user } = useContext(AuthContext)

    return (
        <div>
            <h2 className='text-3xl'>Hi wellcome {user?.displayName} back</h2>
        </div>
    );
};

export default UserHome;
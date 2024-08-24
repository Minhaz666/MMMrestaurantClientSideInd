// import React from 'react';

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";


const Main = () => {

    const location = useLocation()
    const currentLocation = location.pathname.includes('login')
    // console.log(currentLocation)

    return (
        <div>
            { <Header></Header>}
            <Outlet>   </Outlet>
            {currentLocation || <Footer></Footer>}
        </div>
    );
};

export default Main;
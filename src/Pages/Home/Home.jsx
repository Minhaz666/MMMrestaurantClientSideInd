// import React from 'react';

import Banner from "./Banner";
import Categories from "./Categories";
import Moto from "./Moto";
import PopularMenue from "./PopularMenue";
import FeaturedIteam from "./FeaturedItem";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            {/* <Moto></Moto> */}
            <PopularMenue></PopularMenue>
            <FeaturedIteam></FeaturedIteam>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;
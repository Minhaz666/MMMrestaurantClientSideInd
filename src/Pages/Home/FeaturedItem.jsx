import React from 'react';
import featured from '../../assets/home/featured.jpg'
import SectionTitle from '../../Shared/components/SectionTitle';
import  './FeaturedItem.css'
// import from '../../assets/home/'

const FeaturedIteam = () => {
    return (
        <div className=' mt-3 pt-5 backgroundImgCustomCss bg-fixed text-white'  >
            <div className=' '>
            <SectionTitle  subHeading={'check it out'} heading={'from our manue'}  ></SectionTitle>
            </div>
           <div className=' flex items-center justify-center m-5 p-20'>
           <div>
                <img src={featured} alt="" />
            </div>
            <div className=' ml-5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A ipsam dignissimos aliquam provident, ratione perspiciatis, vero ab maiores, animi et hic autem maxime. Dignissimos, accusantium veritatis. Quis facere quasi magni.</p>

                <button className='btn btn-outline border-0 border-b-2 mt-7 flex '>Read More</button>
            </div>
           </div>
        </div>
    );
};

export default FeaturedIteam; 
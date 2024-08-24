// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import slider1 from '../../assets/home/slide1.jpg'
import slider2 from '../../assets/home/slide2.jpg'
import slider3 from '../../assets/home/slide3.jpg'
import slider4 from '../../assets/home/slide4.jpg'
import slider5 from '../../assets/home/slide5.jpg'

import { Pagination } from 'swiper/modules';
import SectionTitle from '../../Shared/components/SectionTitle';


const Categories = () => {
    return (
        <div>
            <SectionTitle heading={'ORDER ONLINE'} subHeading={'From 11.00am to 10.00pm'}></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slider1} alt="" />
                    <h1 className='text-white uppercase text-4xl -mt-16 text-center '>salad</h1>
                    </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <h1 className='text-white uppercase text-4xl -mt-16 text-center '>pizza</h1>
                    </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h1 className='text-white uppercase text-4xl -mt-16 text-center '>soup</h1>
                    </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <h1 className='text-white uppercase text-4xl -mt-16 text-center '>Desert</h1>
                    </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <h1 className='text-white uppercase text-4xl -mt-16 text-center '>salad</h1>
                    </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Categories;

{/* */ }
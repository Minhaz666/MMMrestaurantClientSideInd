import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SectionTitle from '../../Shared/components/SectionTitle';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonial = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className=' mb-10'>
            <SectionTitle subHeading={'What Our Client Say'} heading={'testimonials'}></SectionTitle>


            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide key={review._id}>

                        <div className='flex flex-col items-center'>
                            <div className=''>
                            <Rating className='text-center'
                             style={{ maxWidth: 200}}
                             value={review.rating}
                            >
                            </Rating>
                            </div>
                            <p className='text-center p-14'>
                                {
                                    review.details
                                }
                            </p>
                            <h3 className='text-3xl text-center text-orange-400'>
                                {
                                    review.name
                                }
                            </h3>
                        </div>

                    </SwiperSlide>

                    )
                }

            </Swiper>

        </div>
    );
};

export default Testimonial;
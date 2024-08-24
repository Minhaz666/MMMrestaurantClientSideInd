import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Shared/components/SectionTitle';
import MenuItem from '../../Shared/components/MenuItem';
import useMenu from '../../hooks/useMenu';

const PopularMenue = () => {
    
    const [menu]= useMenu();
    const popularMenu=menu.filter(item=>item.category === 'popular')



    return (
        <div>
            <section>
                <SectionTitle heading={'from our menu'} subHeading={'check it out'} ></SectionTitle>
            </section>

            <div className='grid md:grid-cols-2 gap-9 m-5 p-4'>
                {
                    popularMenu.map(item => {
                        // console.log(item)
                        return <MenuItem key={item._id} item={item}></MenuItem>
                              
                    })
                }
            </div>
        </div>
    );
};

export default PopularMenue;

// name={item.name} recipe={item.recipe} image={item.image} price={item.price}
// import React from 'react';

import Cover from "../../Shared/components/Cover";
import MenuItem from "../../Shared/components/MenuItem";
import SectionTitle from "../../Shared/components/SectionTitle";
import banner from '../../assets/menu/banner3.jpg'
import dessert from '../../assets/menu/dessert-bg.jpeg'
import pizzaa from '../../assets/menu/pizza-bg.jpg'
import saladd from '../../assets/menu/soup-bg.jpg'
import soupp from '../../assets/menu/salad-bg.jpg'
import useMenu from "../../hooks/useMenu";
import { Link } from "react-router-dom";
import MenuCategory from "./MenuCategory";

const Menu = () => {

    const [menu] = useMenu();
    // console.log(menu)
    const offered = menu.filter(item => item.category === 'offered')
    const Desserts = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')

    return (
        <div>
            <Cover img={banner} title={'our menu'} des={'would you like to try our dish...?????'} ></Cover>
            <SectionTitle heading={'todays offer'} subHeading={'dont miss'}></SectionTitle>

            {/* offer item */}
        
                <MenuCategory items={offered} title={'offer'}></MenuCategory>

         
            {/* dessert item */}

            <Cover img={dessert} title={'Desserts'} des={'jkhvdu luwjdvjd uywjvdiw d yujkwvd jwm dvi3dvb jw uyidv wjm d uyjdv jw ;l ejfk kjebfk fjhkbef jhmb e'}></Cover>

            <MenuCategory items={Desserts} title={'Desserts'}  ></MenuCategory>

          
            {/* Pizza item */}

            <Cover img={pizzaa} title={'pizza'} des={'jkhvdu luwjdvjd uywjvdiw d yujkwvd jwm dvi3dvb jw uyidv wjm d uyjdv jw ;l ejfk kjebfk fjhkbef jhmb e'}></Cover>

            <MenuCategory items={pizza} title={'pizza'}></MenuCategory>
           


            {/* Salad item */}

            <Cover img={saladd} title={'salad'} des={'jkhvdu luwjdvjd uywjvdiw d yujkwvd jwm dvi3dvb jw uyidv wjm d uyjdv jw ;l ejfk kjebfk fjhkbef jhmb e'}></Cover>

            <MenuCategory items={salad} title={'salad'}></MenuCategory>
           
            
            {/* SOUP item */}

            <Cover img={soupp} title={'soup'} des={'jkhvdu luwjdvjd uywjvdiw d yujkwvd jwm dvi3dvb jw uyidv wjm d uyjdv jw ;l ejfk kjebfk fjhkbef jhmb e'}></Cover>
            <MenuCategory items={soup} title={'soup'}></MenuCategory>

        </div>
    );
};

export default Menu;
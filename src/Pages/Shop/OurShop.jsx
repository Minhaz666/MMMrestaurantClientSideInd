import React, { useState } from 'react';
import Cover from '../../Shared/components/Cover';
import shop from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import ItemShop from './ItemShop';
import { useParams } from 'react-router-dom';

const OurShop = () => {

    const [menu]=useMenu();
    const allCategory=['salad','pizza','soup','Desserts','drinks','offer']
    const {category} =useParams()
    console.log(category)
    const initialItem=allCategory.indexOf(category)
    console.log(initialItem)

    const [tabIndex, setTabIndex] = useState(initialItem);

    const offered = menu.filter(item => item.category === 'offered')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup= menu.filter(item => item.category === 'soup')
    const desserts = menu.filter(item => item.category === 'dessert')
    const drink= menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Cover img={shop} title={'our shop'} des={'would you like to try a dish...??'}></Cover>

            <div className='text-center'>
                {/* tab item */}

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className={'uppercase'}>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                        <Tab>Offer</Tab>
                    </TabList>
                    <TabPanel >
                        {
                            <ItemShop items={salad}></ItemShop>
                        }
                    </TabPanel>

                    <TabPanel >
                        {
                           <ItemShop items={pizza}></ItemShop>
                        }
                    </TabPanel>

                    <TabPanel >
                        {
                            <ItemShop items={soup}></ItemShop>
                        }
                    </TabPanel>

                    <TabPanel >
                        {
                           <ItemShop items={desserts}></ItemShop>
                        }
                    </TabPanel>

                    <TabPanel >
                        {
                            <ItemShop items={drink}></ItemShop>
                        }
                    </TabPanel>
                  
                    <TabPanel >
                        {
                            <ItemShop items={offered}></ItemShop>
                        }
                    </TabPanel>
                </Tabs>

            </div>

        </div>
    );
};

export default OurShop;
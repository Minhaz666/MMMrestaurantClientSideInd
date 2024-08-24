import React from 'react';
import ItemCards from '../../Shared/components/ItemCards';

const ItemShop = ({items}) => {
    return (
        <div className='grid md:grid-cols-3'>
            {
                items.map(item=><ItemCards item={item}></ItemCards>)
            }
        </div>
    );
};

export default ItemShop;
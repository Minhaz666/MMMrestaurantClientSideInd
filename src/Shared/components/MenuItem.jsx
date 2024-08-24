import React from 'react';

const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item
    return (
     <div>
           <div className='flex space-x-4'>
           <div>
             <img className=' w-[120px] ' style={{borderRadius: '0px 200px 200px 200px'}} src={image} alt="" />

            <div>
                <div>
                    <h1 className=' uppercase'>
                        {name}--------
                    </h1>
                    <p>
                        {recipe}
                    </p>
                </div>
            </div>

            <div>
                <p className=' text-yellow-500 items-center'>${price}</p>
            </div>
           </div>

        </div>
     </div>
    );
};

export default MenuItem;
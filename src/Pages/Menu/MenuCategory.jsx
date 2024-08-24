import React from 'react';
import MenuItem from '../../Shared/components/MenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items , title }) => {
    // console.log(items)
    return (
      <div>
          <div className='grid md:grid-cols-2 gap-9 m-3 p-4'>
            {
                items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
            }
           
        </div>
         <div className="flex justify-center items-center">
         <Link to={`/ourshop/${title}`}><button className=' btn btn-outline border-0 border-b-2  mb-12 w-60'>order from here</button></Link>
     </div>
      </div>
    );
};

export default MenuCategory;
import React from 'react';
import {Link} from 'react-router-dom';
const Header = () => {
    return (
        <div className='header' style={{margin: '50px'}}>
            <div>Header 영역입니다.</div>
            <Link to='/'>Home</Link>
            <Link to='/comp1'>Comp1</Link>
            <Link to='/comp2'>Comp2</Link>
            <Link to='/comp3'>Comp3</Link>
        </div>
    );
};
export default Header;
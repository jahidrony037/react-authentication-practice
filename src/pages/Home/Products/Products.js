import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <h2>This is Products Page</h2>
            <Link to='/checkout'><Button className='btn btn-primary '>CheckOUT</Button></Link>
        </div>
    );
};

export default Products;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

export default function ProductList({ type }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/products/').then(res => res.json()).then(setProducts).catch(e => {
            setProducts([]);
        })
    }, [type]);
    return (
        <div className="ProductList">
            <h2>Products</h2>
            <ul>
                {products.map(({ id, name, thumb }) => 
                    <li key={`product-${id}`}>
                        <Link to={`/${id}`}>
                            <img src={thumb} alt={name} />
                            <strong>{name}</strong>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}
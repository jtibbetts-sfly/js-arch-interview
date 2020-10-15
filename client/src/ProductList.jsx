import React, { useEffect, useState } from 'react';

export default function ProductList({ type }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/products/').then(res => res.json()).then(setProducts).catch(e => {
            setProducts([]);
        })
    }, [type]);
    return (
        <ul className="ProductList">
            {products.map(({ id, name }) => 
                <li key={id}>
                    <a href={`/${id}`}>{name}</a>
                </li>
            )}
        </ul>
    );
}
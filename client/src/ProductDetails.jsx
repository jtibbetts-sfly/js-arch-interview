import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/products/${productId}`).then(res => res.json()).then(setProductData).catch(e => setProductData(undefined))
    }, [productId])

    return (
        <div className="ProductDetails">
            { productData === undefined && <p>Oops</p> }
            { productData === null && <p>loading&hellip;</p> }
            { productData && 
                <>
                    <h1>{productData.name}</h1>
                    <span>price goes here bruh</span>
                </>
            }
        </div>
    );
}
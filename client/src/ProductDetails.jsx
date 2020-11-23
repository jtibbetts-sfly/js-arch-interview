import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Option from "./Option";
import { Link } from 'react-router-dom';
import "./ProductDetails.css";

function initSelection(options) {
    return options.reduce((accum, { key, values }) => ({
        ...accum,
        [key]: values[0] || ''
    }), {});
}

export default function ProductDetails() {
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [priceData, setPriceData] = useState(null);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/products/${productId}`).then(res => res.json()).then((data) => {
            setSelection(initSelection(data.options));
            setProductData(data);
        }).catch(e => setProductData(undefined))
    }, [productId]);

    useEffect(() => {
        if (selection && productData) {
            const productType = productData.type;
            fetch(`http://localhost:3001/products/${productType}/price`, {
                method: 'POST',
                "Content-Type": "application/json",
                body: JSON.stringify(selection)
            }).then(res => res.json()).then(data => {
                setPriceData(data);
            }).catch(e => setPriceData(undefined))
        }
    }, [selection, productData])

    const { name, options, img } = productData || {};
    const { price } = priceData || {};

    const handleChange = (key, value) => {
        setSelection({
            ...selection,
            [key]: value
        });
    }

    return (
        <div className="ProductDetails">
            <h2><Link to="/">Products</Link> { name || 'Loading...' }</h2>
            { productData === undefined && <p>Oops</p> }
            { productData === null && <p>loading&hellip;</p> }
            { productData && 
                <div className="product">
                    <div>
                        <img src={img} alt={name}/>
                    </div>
                    <div>
                        <div className="price">
                            <span>Price</span>
                            {!priceData && <>loading&hellip;</>}
                            {priceData && <>${price}</>}
                        </div>
                        <ul className="options">
                            { options.map(
                                ({key, values}) => 
                                    <li key={key}>
                                        <Option name={key} 
                                                values={values} 
                                                selected={selection[key]} 
                                                onChange={handleChange} 
                                        />
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}
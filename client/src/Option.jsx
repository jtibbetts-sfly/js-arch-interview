import React from 'react';
import './Option.css';

export default function Option({ name, values = [], selected, onChange }) {
    const handleChange = evt => {
        if(onChange) {
            onChange(name, evt.target.value);
        }
    };
    return (
        <div className="Option">
            <label htmlFor={`option-${name}`}>{name}</label>
            <select name={name} id={`option-${name}`} value={selected} onChange={handleChange}>
                {values.map(value => <option key={`value-${value}`} value={value}>{value}</option>)}
            </select>
        </div>
    );  
}
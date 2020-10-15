const options = [
    {
        id: 1,
        name: 'fancy option',
        price: 0.5,
        type: 'card'
    },
    {
        id: 2,
        name: 'simple option',
        price: 0.2,
        type: 'card'
    },
    {
        id: 3,
        name: 'fancy option',
        price: 0.3,
        type: 'photobook'
    },
    {
        id: 4,
        name: 'simple option',
        price: 0.1,
        type: 'photobook'
    }
];

export default function getOptions() {
    return options;
}

export function getOption(option) {
    return options.find(o => o.id === option);
}
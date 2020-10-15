const products = [
    {
        "id": 1,
        "name": "product 1",
        "options": {
            "size": ["small", "medium", "large"]
        },
        "images": {
            "small": [],
            "medium": [],
            "large": []
        }
    },
    {
        "id": 2,
        "name": "product 2"
    },
    {
        "id": 3,
        "name": "product 3"
    }
];

export default function getProducts() {
    return products;
}

export function getProduct(id) {
    return products.find(p => p.id === id);
}
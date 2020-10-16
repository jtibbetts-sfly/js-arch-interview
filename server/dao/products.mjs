import { readFile } from "fs/promises";

export default async function getProducts() {
    const data = await readFile('./data/products.json');
    if (!data) {
        return [];
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export async function getProduct(id) {
    const products = await getProducts();
    return products.find(p => p.id === id);
}
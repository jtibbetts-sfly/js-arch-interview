import { readFile } from "fs/promises";

export default async function getPrice(options) {
    try {
        const data = await readFile('./data/price.json');
        const prices = JSON.parse(data);
        return Object.entries(options).reduce((accum, [key, value]) => {
            if (prices[key]) {
                return accum + prices[key][value];
            }
            return accum;
        }, 0);
    } catch (e) {
        console.log(e);
    }
    return 0;
}
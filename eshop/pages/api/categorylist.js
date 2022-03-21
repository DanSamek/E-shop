import { connPromise } from '../../utils/DB';
export default async function handler(req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let data =  await db.collection("products").find().toArray();
    let cats = [];
    for (const i of data) {
        if (!cats.includes(i.category))
            cats.push(i.category);
    }
    return res.json(cats)
}
import { connPromise } from '../../../utils/DB';


export default async function handler (req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let products = db.collection("products");
    let cat = req.query.cat_name;
    let data = await products.find({"category": cat}).toArray();
    res.json({prods: data});
}
import { connPromise } from '../../../utils/DB';


export default async function handler (req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let products = db.collection("products");
    let cat = req.query.cat_name;
    let page = Number(req.query.p) ?? 1;
    page = page > 0 ? page : 1;
    let data = await products.find({"category": cat}).toArray();
    res.json({prods: data.slice(((page -1) * 10), page * 10 + 10)});
}
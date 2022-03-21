import { connPromise } from '../../utils/DB';
export default async function handler(req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let data =  await db.collection("products").find({"action": 1}).toArray();
    res.json({data})
}
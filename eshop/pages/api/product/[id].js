import { connPromise } from '../../../utils/DB';

export default async function handler(req, res){
    let val =  parseInt(req.query.id);
    let client = await connPromise; 
    let db = client.db("eshop");
    let data =  await db.collection("products").find({"code": val}).toArray();
    return res.json({data});
}

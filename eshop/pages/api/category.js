import { connPromise } from '../../utils/DB';


export default async function handler (req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let products = db.collection("products");
    console.log(products)
}
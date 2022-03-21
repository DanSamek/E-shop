import { connPromise } from '../../utils/DB';

export default async function handler (req, res) {
    let client = await connPromise;
    let db = client.db("eshop");
    let products = db.collection("products");
    let data = await products.find().toArray();
    let rss_string = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<SHOP>"
    for (const item of data) {
        rss_string += "\n   <SHOPITEM>"
        rss_string += `\n       <ITEMID>${item.id}</ITEMID>`
        rss_string += `\n       <PRODUCTNAME>${item.name}</PRODUCTNAME>`
        rss_string += `\n       <URL>http://127.0.0.1:3000/product/${item.id}</URL>`
        rss_string += `\n       <PRICE>${item.price}</PRICE>`
        rss_string += `\n       <IMGURL>${item.imagename}</IMGURL>`
        rss_string += `\n       <MANUFACTURER>${item.maker}</MANUFACTURER>`
        rss_string += `\n       <CATEGORYTEXT>${item.category}</CATEGORYTEXT>`
        rss_string += `\n       <DESCRIPTION>${encodeURIComponent(item.description)}</DESCRIPTION>`
        rss_string += `\n       <AVAILIBILITY>${item.availability > 0 ? "Skladem" : "Není"}</AVAILIBILITY>`
        rss_string += "\n   </SHOPITEM>"
    }
    rss_string += "\n</SHOP>"
    res.send(rss_string);
}
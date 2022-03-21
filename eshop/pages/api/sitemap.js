import {connPromise} from "../../utils/DB";
export default async function handler (req, res) {
    let map = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<urlset>"
    let client = await connPromise;
    let db = client.db("eshop");
    let data =  await db.collection("products").find().toArray();
    let cats = [];
    map += "\n  <url>"
    map += `\n      <loc>http://localhost:3000/</loc>`
    map += `\n      <priority>0.8</priority>`
    map += `\n  </url>`
    for (const i of data) {
        if (!cats.includes(i.category))
            cats.push(i.category);
        map += "\n  <url>"
        map += `\n      <loc>http://localhost:3000/product/${i.id}</loc>`
        map += `\n      <priority>0.7</priority>`
        map += `\n  </url>`
    }
    for (const cat of cats) {
        map += "\n  <url>"
        map += `\n      <loc>http://localhost:3000/category/${cat}</loc>`
        map += `\n      <priority>0.5</priority>`
        map += `\n  </url>`
    }

    map += "\n</urlset>"
    res.send(map)
    
    
}   
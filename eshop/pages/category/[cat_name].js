import { useRouter } from 'next/router';
import Header from '../../components/header';
import Link from "next/link";
import useSWR from 'swr'
import { useState } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Category() {
    const router = useRouter();
    const category = router.query.cat_name;
    const [razeni, setRazeni] = useState("price-low-high");
    let prods = [];
    const { data, error } = useSWR(`/api/category/${category}`, fetcher);
    if (data) {
        prods = data.prods;
        if (razeni == "price-high-low") {
            prods.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
        }
        if (razeni == "price-low-high") {
            prods.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
        }
    }
    if (error) return <h1>Error</h1>;
    if (!data) return <><Header/><h1>Loading</h1></>;
    return (
     <>
     <Header/>
    <div> 
        <select value={razeni} onChange={(e) => { setRazeni(e.target.value)}}>
            <option value="price-high-low">Cena Sestupně</option>
            <option value="price-low-high">Cena Vzestupně</option>
        </select>
    </div>

     <div>
     {
         prods.map((e) => {
             return (
                <div className="product-tile">
                    <img width="100px" src={e.imagename} />
                    <strong>{e.name}</strong>
                    <p>{e.description.replace(/<[^>]*>?/gm, '').slice(0,60)}</p>
                    <p>Cena: {e.price}</p>
                    <p>{e.availability > 0 ? "Skladem" : "Vyprodáno"}</p>
                    <Link href={`/product/${e.id}`}><button>Koupit</button></Link>
                </div>
             )
         })
     }
     </div>
     </>
    )
  }
  
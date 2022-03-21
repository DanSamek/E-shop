import Breadcrumbs from "./nav"
import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr"
const fetcher = (url) => fetch(url).then((res) => res.json())

function Header(){
    let [ amount, setAmount ] = useState(0);
    let [ price, setPrice ] = useState(0);
    const { data, error } = useSWR(`/api/categorylist`, fetcher);
    
    useEffect(() =>{        
        let items = localStorage.getItem("products");
        if(!items){
            items = "[]";
            localStorage.setItem("products", "[]");
        }
        items = JSON.parse(items);
        let amnt = 0;
        let price = 0;
        for (const item of items) {
            amnt += Number(item.count);
            price += Number(item.count) * item.prod.price;
        }
        setAmount(amnt);
        setPrice(price);
    }, [])
    if (!data) return null;
    if (error) return null;
    return( 
        <div className="header">
         <a href="/"><img src="" alt="" /></a>
        <a href="/kosik">Košík {amount} ({price} Kč)</a><br/>
        {data.map((e)=> {
            return <a href={`/category/${e}`}>{e}{" "}</a>
        })
            }
        <Breadcrumbs />
        </div>
    )
}

module.exports = Header;



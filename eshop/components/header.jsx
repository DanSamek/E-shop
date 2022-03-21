import Breadcrumbs from "./nav"
import { useEffect } from "react";
import { useState } from "react";

function Header(){
    let [ amount, setAmount ] = useState(0);
    let [ price, setPrice ] = useState(0);
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
    return( 
        <div className="header">
         <a href="/"><img src="" alt="" /></a>
        <a href="/kosik">Košík {amount} ({price} Kč)</a>
        <Breadcrumbs />
        </div>
    )
}

module.exports = Header;



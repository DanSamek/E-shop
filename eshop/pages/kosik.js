import { useEffect } from "react"
import { useState } from "react";
import Header from "../components/header"
export default function kostatko(){

    let [data, getdata] = useState([]);
    useEffect(() =>{
        getdata(JSON.parse(localStorage.getItem("products")));
    }, [])
    if(!data){
        return(Header())
    }
    
    function calculate(count, ){

    }

    return(
        <div>
        {Header()}
        <h1>Košík</h1>
        {data.map((item) => (
            <div>
            <img src={item.prod.imagename}></img>
            <p>Název: {item.prod.name}</p>            
            <p>Kód: {item.prod.code}</p>
            <p>Dostupnost: {item.prod.availability}</p>
            <p>Jednotková cena: {item.prod.price}</p>
            <p>Celková cena: {calculate()}</p>
            </div>
        ))}
        </div>
    )

}
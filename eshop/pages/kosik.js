import { useEffect } from "react"
import { useState } from "react";
import Header from "../components/header"
export default function kostatko(){
    let [data, getdata] = useState([]);
    let prices=0;
    useEffect(() =>{
        getdata(JSON.parse(localStorage.getItem("products")));
    }, [])
    if(!data){
        return(Header())
    }
    function calculate(count, price){
        prices += Number(count)*Number(price);
        return Number(count)*Number(price);
    }

    const removeProduct = (event) =>{
        event.preventDefault();
        let id = event.target.product.value;
        let arr =[];
        data.forEach(item =>{
           if(item.prod.id == id)
           {
                item.count = 0;
                arr.push(item);
           }    
           else{
               arr.push(item);
           }
        })  
        localStorage.setItem("products", JSON.stringify(arr));
    }

    const changeValue = (event) =>{
        event.preventDefault();
        let id = event.target.id.value;
        let arr =  [];
        data.forEach(item =>{
            if(item.prod.id == id)
            {
                 item.count = event.target.number.value;
                 arr.push(item);
            }    
            else{
                arr.push(item);
            }
         })  
         localStorage.setItem("products", JSON.stringify(arr));

    }

    return(
        <div>
        {Header()}
        <h1>Košík</h1>
        {data.map((item) => item.count > 0 ?(
            <div>
            <img src={item.prod.imagename}></img>
            <p>Název: {item.prod.name}</p>            
            <p>Kód: {item.prod.code}</p>
            <p>Dostupnost: {item.prod.availability}</p>
            <p>Množství: {item.count}</p>
            <p>Jednotková cena: {item.prod.price}</p>
            <p>Celková cena: {calculate(item.count, item.prod.price)}</p>
            <form onSubmit={removeProduct}>
                <input type="hidden" name="product" value={item.prod.id} ></input>
                <input type="submit"></input>
            </form>
            <form onSubmit={changeValue}>
                <input type="number" name="number" max={item.prod.availability} min="1" ></input>
                <input type="hidden" name="id" value={item.prod.id}></input>
                <input type="hidden" name="item" value={item} ></input>
                <input type="submit"></input>
            </form>
            </div>
        ): (null))}
        <p>Celkem: {prices}</p>
        </div>
    )
}
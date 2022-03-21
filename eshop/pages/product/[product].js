
import useSWR from "swr"
import { useEffect } from "react";
import { useRouter } from 'next/router';
const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Product(){
    const addtoCart = (event) =>{
        event.preventDefault();
        let lc = localStorage.getItem("value");
        localStorage.setItem("value", lc);
        }

    const router = useRouter();
    let product = router.query.product;
    const { data, error } = useSWR(`/api/product/${product}`, fetcher);
    useEffect(() => {
      if(!localStorage.getItem("value")){
        localStorage.setItem("value", "0");
      }       
    })
    if (error) {
        return <p>Error</p>
    }
    if(!data){
        return <p>načítání</p>
    }

    if(data) {
        const item = data.data[0];
        let kostatko;
        if(!item){
            return(<p>Error</p>)
        }
        else{
            if(item.availability >0) {
                kostatko = (
                    <form onSubmit={addtoCart}>
                        <input value={data} name="id" type="hidden"></input>
                        <input type="number" name="number" placeholder="Počet" max={item.availability}></input>
                        <input type="submit"></input>
                    </form>
                )
            }
            else{
                kostatko = (
                    <p>Není skladem</p>
                )
            }
            return(         
                <div className="product">
                <h1>{item.name}</h1>
                <p>Kód produktu: {item.code}</p>
                <p>Dostupnost: {item.availability}</p>
                <p>Cena: {item.price} </p>
                {kostatko}
                <img src={item.imagename}></img>    
                <div dangerouslySetInnerHTML={{ __html:item.description  }} />   
                </div>
            )
        }
    }
}
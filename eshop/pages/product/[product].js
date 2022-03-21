
import useSWR from "swr"
import { useEffect } from "react";
import { useRouter } from 'next/router';


const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Product(){
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
    const addtoCart = (event) =>{
        event.preventDefault();
        let lc = localStorage.getItem("value");

        localStorage.setItem("value", lc);
        }
    if(data) {
        console.log(data);
        return( 
            <form onSubmit={addtoCart}>
            <input value={data} name="id" type="hidden"></input>
            <input type="number" name="number" placeholder="Počet" max="5"></input>
            <input type="submit"></input>
            </form>
        )
    }
}
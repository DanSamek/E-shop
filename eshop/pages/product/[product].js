
import useSWR from "swr"
import { useRouter } from 'next/router';
import Header from "../../components/header"
import Router from 'next/router'
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Product(){
    const addtoCart = (event) =>{
        event.preventDefault();
        let lc = localStorage.getItem("products") ?? "[]";
        lc = JSON.parse(lc);
        let found = -1;
        let prod = JSON.parse(event.target.item.value);
        
        for (const p in lc) {
            if (lc[p].prod.id === prod.id) {
                found = p;
                break;
            }
        }
        if (found != -1) {
            let amnt = lc[found].count;
            lc[found].prod = prod,
            lc[found].count = amnt + event.target.number.value <= prod.availability ? amnt + event.target.number.value : prod.availability;
        } else {
            product = {
                "prod": prod,
                "count": event.target.number.value <= prod.availability ? event.target.number.value : prod.availability,
            }
            lc.push(product)
        }

        
        localStorage.setItem("products", JSON.stringify(lc));
        alert("Přidáno do košíku");

        Router.reload(window.location.pathname)
    }
    const router = useRouter();
    let product = router.query.product;
    const { data, error } = useSWR(`/api/product/${product}`, fetcher);
    if (error) {
        return (
        <div>
        {Header()}
        <p>Error</p>
        </div>)
    }
    if(!data){
        return (
        <div>
        {Header()}
        <p>načítání</p></div>)
    }

    if(data) {
        const item = data.data[0];
        let kostatko;
        if(!item){
            return(
            <div>
            {Header()}
            <p>Error</p>
            </div>)
        }
        else{
            if(item.availability >0) {
                kostatko = (
                    <form onSubmit={addtoCart}>
                        <input value={data} name="id" type="hidden"></input>
                        <input type="number" name="number" placeholder="Počet" max={item.availability} min="1"></input>
                        <input type="hidden" name="price" max={item.price}></input>
                        <input type="hidden" name="item" value= {JSON.stringify(item)}></input>
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
                <div>
                {Header()}
                <div  className="product">
                <h1>{item.name}</h1>
                <p>Kód produktu: {item.code}</p>
                <p>Dostupnost: {item.availability}</p>
                <p>Cena: {item.price} </p>
                {kostatko}
                <img src={item.imagename}></img>    
                <div dangerouslySetInnerHTML={{ __html:item.description  }} />   
                </div>
                </div>
            )
        }
    }
}
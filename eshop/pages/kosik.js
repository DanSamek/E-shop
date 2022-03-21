import { useEffect } from "react"
import { useState } from "react";
import Header from "../components/header"
export default function kostatko(){

    let [data, getdata] = useState("0")


    useEffect(() =>{
        getdata(localStorage.getItem("products"))
    })

    return(
        <div>
        {Header()}
        <h1>Košík</h1>
        {data.map((item) =>{
            <p>{item}</p>
        })}
        </div>
    )

}
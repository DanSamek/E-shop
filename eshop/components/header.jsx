import Breadcrumbs from "./nav"
import { useEffect } from "react";
import { useState } from "react";

function Header(){
    let [ value, Getvalue ]= useState("");
    useEffect(() =>{        
        if(!localStorage.getItem("product")){
            localStorage.setItem("product", "0");
        }      
        Getvalue(localStorage.getItem("product"))
        console.log(value);
    }, [])
    return( 
        <div className="header">
         <a href="/"><img src="" alt="" /></a>
        <a href="/kosik">Košík {value}</a>
        <Breadcrumbs />
        </div>
    )
}


module.exports = Header;



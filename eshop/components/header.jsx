

import react from "react";
import Breadcrumbs from "./nav"

function Header(){
    return( 
        <div className="header">
         <a href="/"><img src="" alt="" /></a>
        <a href="/kosik">Kosik</a>
        <Breadcrumbs />
        </div>
    )
}


module.exports = Header;



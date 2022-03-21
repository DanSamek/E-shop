
import react from "react";
import { useRouter } from 'next/router';
import { route } from "next/dist/server/router";

function Breadcrumbs(){
    const router = useRouter();
    const path = router.asPath.split('/');
    let crumbs = []
    for (const i in path) {
        if (path[i] === "")
            continue;
        console.log(path.slice(0, i+1).join("/"), i)
        crumbs.push(<a href={path.slice(0, i+1).join("/")}>{decodeURI(path[i])}</a>)
    }
    console.log(crumbs)
    return( 
        <nav>
            <a href="/">Home</a> {crumbs.map((e) => {
                return (<>
                {">"} {e}
                </>)
            })}
        </nav>
    )
}


module.exports = Breadcrumbs;



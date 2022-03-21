
import react from "react";
import { useRouter } from 'next/router';
import { route } from "next/dist/server/router";

function Breadcrumbs(){
    const router = useRouter();
    const path = router.asPath.split('/');
    let crumbs = []
    for (let i in path) {
        i = Number(i)
        if (path[i] === "")
            continue;
        if (path.length - 1 === i){
            crumbs.push(<span>{decodeURI(path[i])}</span>)
            continue;
        }

        crumbs.push(<a href={path.slice(0, i+1).join("/")}>{decodeURI(path[i])}</a>)
    }
    console.log(crumbs)
    if (crumbs.length < 1)
        return null;
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



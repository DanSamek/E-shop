import Header from "../components/header"
import useSWR from "swr"
import { useEffect } from "react";


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR(`/api/action`, fetcher);
  if (error) {
    return (
      <div>
      {Header()}
    <p>Error</p></div>)
  }
  if(!data){
    return (
    <div>
      {Header()}
    <p>načítání</p>
    </div>)
  }
  if (data) {
    console.log(data);
    return (
      <div>
        {Header()}
        <h1>localhost:3000</h1>
        <div className="lorem">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla quis diam. Nunc tincidunt ante vitae massa. Fusce wisi. Aenean placerat. Pellentesque arcu. Nulla pulvinar eleifend sem. Proin mattis lacinia justo. Maecenas lorem. Integer malesuada. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Curabitur sagittis hendrerit ante. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Vivamus porttitor turpis ac leo. Vivamus ac leo pretium faucibus. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Suspendisse sagittis ultrices augue. Pellentesque pretium lectus id turpis. Etiam commodo dui eget wisi.
        </div>
        <div className="Products">
        {data.data.map((item) => (
          <div className="product">
          <p>{item.code}</p>
          <p>{item.availability}</p>
          <img src={item.imagename}></img>
          <p>Cena: {item.price} </p>
          <div dangerouslySetInnerHTML={{ __html:item.description  }} />   
          </div>
          ))}
        </div>
      </div>
    )
  }
}

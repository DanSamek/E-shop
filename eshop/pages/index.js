import Header from "../components/header"
import useSWR from "swr"


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR(`/api/action`, fetcher);

  const addtoCart = () =>{

  }





  if (error) {
    return <p>Error</p>
  }
  if(!data){
    return <p>a</p>
  }
  if (data) {
    console.log(data);
    return (
      <div>
        {Header()}
        <div className="lorem">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla quis diam. Nunc tincidunt ante vitae massa. Fusce wisi. Aenean placerat. Pellentesque arcu. Nulla pulvinar eleifend sem. Proin mattis lacinia justo. Maecenas lorem. Integer malesuada. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Curabitur sagittis hendrerit ante. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Vivamus porttitor turpis ac leo. Vivamus ac leo pretium faucibus. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Suspendisse sagittis ultrices augue. Pellentesque pretium lectus id turpis. Etiam commodo dui eget wisi.
        </div>
        <div className="Products">
        {data.data.map((item) =>  (
          <div className="product">
          <p>{item.code}</p>
          <p>{item.availability}</p>
          <img src={item.imagename}></img>
          <img src={item.imagename}></img>
          <p>Cena: {item.price} </p>
          <form onSubmit={addtoCart}>
             <input type="submit"></input>
          </form>
          </div>

          ))}
        </div>
      </div>
    )
  }
}

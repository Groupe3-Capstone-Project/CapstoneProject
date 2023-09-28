import{ useState, useEffect} from "react"
import { fetchSingleProduct } from "../api/ajaxHelper"
import { useParams } from "react-router"

export default function SingleProduct() {
    const [product, setProduct] = useState({})
    let {id} = useParams()

    function renderSingleProduct() {
        return (
            <div key={product.id}>
                 <div>
                     <img
                      src={product.imgUrl}
                         alt=""
                       />
                </div>
                <div>
                    <div className=" text-sm capitalize text-gray-500 mb-1">{product.period}</div>
                    <h3 className="font-semibold mb-1">{product.title}</h3>
                    <h2 className="font-semibold">{product.artist}</h2>
                    <h2>{product.description}</h2>
                    <h2>Year: {product.year}</h2>
                    <h2>{product.dimension}</h2>
                    <p className="font-semibold">$ {product.price}</p>
                </div>
            </div>
        )
    };

 
    useEffect(() => {
    async function singlePlayerHandle() {
        const data = await fetchSingleProduct(id);
        console.log(data);
        setProduct(data);  
    }
    singlePlayerHandle();
 }, []);


 return (
    <div>
        {renderSingleProduct()}
    </div>
 );

}


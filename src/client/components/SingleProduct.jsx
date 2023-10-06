import{ useState, useEffect} from "react"
import { fetchSingleProduct } from "../api/ajaxHelper"
import { useParams } from "react-router"
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SingleProduct() {
    const [product, setProduct] = useState({})
    let {id} = useParams()
    const navigate = useNavigate();
   
    useEffect(() => {
    async function singlePlayerHandle() {
        const data = await fetchSingleProduct(id);
        console.log(data);
        setProduct(data);  
    }
    singlePlayerHandle();
 }, [id]);

 function renderSingleProduct() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-screen-md mx-auto flex relative">
          <div className="w-96 mx-auto pr-4">
            <img
              src={product.imgUrl}
              alt={product.title}
            />
          </div>
          <div className="flex-1 px-4 bg-white rounded-lg shadow-md p-4 relative">
            <Link to={`/products`}>
              <VscChromeClose className="text-xl text-red-500 hover:text-red-700 absolute top-2 right-2 focus:outline-none" />
            </Link>
            <p className="text-sm capitalize text-gray-500 mb-1">Period: {product.period}</p>
            <h3 className="font-semibold mb-1">{product.title}</h3>
            <h2 className="font-semibold">Artist: {product.artist}</h2>
            <p className="whitespace-pre-line">{product.description}</p>
            <h2>Year: {product.year}</h2>
            <h2>Dimensions: {product.dimensions}</h2>
            <p className="font-semibold">$ {product.price}</p>
          </div>
        </div>
      </div>
    );
  }
  
  
  
  
  
  

 


 return (
    <div>
        {renderSingleProduct()}
    </div>
 );

}


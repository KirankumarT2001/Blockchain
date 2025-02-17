import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Header, Footer, Button } from "../index.js";
import { FaRupeeSign } from "react-icons/fa";
import useProduct from "../../Customhooks/products.jsx";

const ProductDetail = () => {
  const { getProducts } = useProduct();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProducts();
        setProducts(result);
      } catch (error) {
        //TODO: show Error 
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    return () => { };
  }, []);

  const { id } = useParams(); // Extracting the product id from URL params
  const product = products.find((p) => p.id === id); // Finding the product by id

  if (!product) {
    return (
      <>
        <div className="min-h-screen">
          <Header />
          <div className="flex place-content-center text-9xl font-bold">
            Product not found
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />

      <div className="flex place-content-center w-full bg-[#D8F3DC]">
        <div className="grid grid-cols-2 w-5/6">
          <div>
            <img
              src="/images/feature.png"
              alt="image"
              className="bg-cover h-full w-full"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center p-4">
            <div className="font-bold text-2xl">{product.name}</div>
            <div>
              <div className="font-medium">Description</div>
              <div>{product.desc}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-medium">Category :</div>
              <div>{product.category}</div>
            </div>
            <div className="flex items-center ">
              <div className="font-medium">Price : </div>
              <FaRupeeSign className="text-sm relative top-[1px]" />
              <div className="text-xl ">{product.price}</div>
            </div>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

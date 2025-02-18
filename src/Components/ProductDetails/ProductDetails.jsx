import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "./../Context/WishlistContext";

const ProductDetails = () => {
  const { addProductToWishlist, products: wishlistItems } =
    useContext(WishlistContext);

  async function addToWishlist(id) {
    const data = await addProductToWishlist(id);
    if (data?.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Error adding product to wishlist");
    }
  }

  const { id } = useParams();

  const { addProductToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  async function addToCart() {
    setLoading(true);
    const data = await addProductToCart(id);

    if (data.status === "success") {
      toast.success(data.message);

      setLoading(false);
    } else {
      toast.error("Error adding product to cart");

      setLoading(false);
    }
  }

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { data, isLoading } = useQuery(
    `productDetails${id}`,
    getProductDetails
  );

  console.log(data);

  if (isLoading) {
    return (
      <div className="h-screen bg-green-700 flex flex-wrap justify-center items-center">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const product = data?.data?.data;
  const isInWishlist = wishlistItems.some((item) => item._id === id);

  return (
    <div className="md:w[80%] mx-auto">
      <div className="flex flex-wrap justify-center items-center">
        <div className="md:w-1/3 p-5">
          <div>
            <img src={data.data.data.imageCover} className="w-full" alt="" />
          </div>
        </div>

        <div className="ms:w-2/3 p-5">
          <div>
            <h1 className="text-3xl font-bold mb-3">{data.data.data.title}</h1>
            <p className="mb-3">{data.data.data.description}</p>
            <h3 className="mb-3">{data.data.data.category.name}</h3>

            <div className="mb-3 flex flex-wrap justify-between items-center">
              <div>
                <h2>{data.data.data.price} EGP</h2>
              </div>

              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => addToWishlist(product.id)}
                  className=" w-full flex justify-center items-center focus:outline-none text-white font-medium rounded-lg text-sm px-2 bg-transparent"
                >
                  <i
                    className={`fa-heart ${
                      isInWishlist
                        ? "fa-solid text-red-500"
                        : "fa-regular text-gray-400 hover:text-red-300"
                    }`}
                  ></i>
                </button>
                <i className="fa-solid fa-star text-yellow-500"></i>
                {data.data.data.ratingAverage}
              </div>
            </div>
          </div>

          <button
            onClick={addToCart}
            className={`w-full focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-green-500 hover:bg-green-600`}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

const Products = () => {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, products: wishlistItems } =
    useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState("");

  async function addToWishlist(id) {
    const data = await addProductToWishlist(id);
    if (data?.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Error adding product to wishlist");
    }
  }

  async function addToCart(id) {
    const data = await addProductToCart(id);
    if (data?.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Error adding product to cart");
    }
  }

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isLoading, data } = useQuery("products", getAllProducts);

  if (isLoading) {
    return (
      <div className="h-screen bg-green-700 flex justify-center items-center">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  const products = data?.data.data;
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto">
      <div className="my-5 flex justify-center px-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            No matching products found.
          </p>
        ) : (
          filteredProducts.map((product, idx) => {
            const isInWishlist = wishlistItems.some(
              (item) => item.id === product.id
            );

            return (
              <div key={idx} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                <div className="bg-slate-100 p-3">
                  <Link to={`productDetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="w-full"
                      alt={product.title}
                    />
                    <h3 className="mt-3 text-green-700">
                      {product.category.name}
                    </h3>
                    <h3 className="mt-3">
                      {product.title.split(" ").splice(0, 1).join(" ")}
                    </h3>
                  </Link>
                  <div className="mt-3 flex justify-between items-center">
                    <h2>{product.price} EGP</h2>
                    <div className="flex justify-center items-center">
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
                      <i className="fa-solid fa-star text-yellow-500 mx-1"></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="mt-3 w-full focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-green-500 hover:bg-green-600"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;

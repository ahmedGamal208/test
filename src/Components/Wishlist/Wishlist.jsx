import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";

const Wishlist = () => {
  const { products, loading, removeItem } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const [processingId, setProcessingId] = useState(null);

  async function handleAddToCart(id) {
    setProcessingId(id);
    try {
      const data = await addProductToCart(id);
      if (data.status === "success") {
        toast.success("Added to cart successfully");
        await removeItem(id);
      } else {
        toast.error("Error adding product to cart");
      }
    } catch (error) {
      toast.error("An error occurred while adding to cart.");
      console.error("Error in handleAddToCart:", error);
    }
    setProcessingId(null);
  }

  if (loading) {
    return (
      <div className="h-screen bg-green-700 flex flex-wrap justify-center items-center">
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

  return (
    <div className="p-5 mx-auto md:w-[90%] mt-5 bg-slate-100">
      {products.length === 0 ? (
        <h1 className="text-center text-4xl text-green-700 py-5">
          NO DATA TO DISPLAY
        </h1>
      ) : (
        <>
          <h1 className="font-bold text-2xl mb-3">Wishlist</h1>
          <div className="parent mt-3">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="child flex flex-col lg:flex-row lg:justify-between px-10 items-center pb-3 border-b border-slate-500 border-dotted"
              >
                <div className="child1 flex flex-col lg:flex-row justify-between items-center w-full">
                  <div className="w-full lg:w-2/6 p-4">
                    <img
                      src={item.imageCover}
                      className="w-full"
                      alt={item.title}
                    />
                  </div>
                  <div className="w-full lg:w-4/6 p-4">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <h3 className="my-3 font-bold text-green-600">
                      {item.price} EGP
                    </h3>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="focus:outline-none w-full lg:w-2/6 xl:w-1/6 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-red-500 hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="child2 w-full lg:w-2/6 flex justify-end items-center p-4">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="w-full focus:outline-none text-white lg:w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-green-500 hover:bg-green-600"
                    disabled={processingId === item._id}
                  >
                    {processingId === item._id ? (
                      <i className="fa-solid fa-spin fa-spinner text-white"></i>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;

import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    products,
    totalPrice,
    Loading,
    updateCount,
    removeItem,
    clearCart,
    totalCartItems,
  } = useContext(CartContext);

  if (Loading) {
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

  return (
    <div className="p-5 mx-auto md:w-[80%] mt-5 bg-slate-100">
      {products?.length == 0 ? (
        <h1 className="text-center text-4xl text-green-700 py-5">
          NO DATA TO DISPLAY
        </h1>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center px-5">
            <div>
              <h1 className="font-bold text-2xl mb-3">Shop Cart</h1>
              <h3 className="font-semibold">
                Total Price : 
                <span className="font-mono text-green-600 ms-1">
                   {totalPrice} EGP
                </span>
              </h3>
              <button
                onClick={clearCart}
                className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5  py-2.5 mb-2 bg-red-500`}
              >
                Clear Cart
              </button>
              <Link
                to={"/payment"}
                className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 mx-2 py-2.5 mb-2 bg-sky-500`}
              >
                Checkout
              </Link>
            </div>
            <div className="font-semibold">
              Total Cart Items :
              <span className="font-mono text-green-600 ms-1">{totalCartItems}</span>
            </div>
          </div>
          <div className="parent mt-3">
            {products?.map(function (item, idx) {
              return (
                <div
                  key={idx}
                  className="child flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-500 border-solid"
                >
                  <div className="sm:w-full  lg:w-1/6 p-4">
                    <div>
                      <img
                        src={item.product.imageCover}
                        className="w-full"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="sm:w-full  lg:w-4/6 p-4">
                    <h2 className="text-3xl font-bold">{item.product.title}</h2>
                    <h3 className="my-3 font-bold text-green-600">
                      {item.price} EGP
                    </h3>

                    <button
                      onClick={function () {
                        removeItem(item.product._id);
                      }}
                      className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-red-500`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="sm:w-full  lg:w-1/6 p-4">
                    <div className="flex  justify-center items-center gap-2">
                      <button
                        onClick={function () {
                          updateCount(item.product._id, item.count + 1);
                        }}
                        className={`focus:outline-none  text-green-500 font-bold hover:bg-green-500 hover:text-white rounded-lg  px-5 py-2.5 mb-2 border border-green-500`}
                      >
                        +
                      </button>
                      <h3 className="mx-1 font-semibold text-xl">
                        {item.count}
                      </h3>
                      <button
                        onClick={function () {
                          updateCount(item.product._id, item.count - 1);
                        }}
                        className={`focus:outline-none  text-green-500 font-bold hover:bg-green-500 hover:text-white rounded-lg  px-5 py-2.5 mb-2 border border-green-500`}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("token"));

  const { isLoading, data } = useQuery("allOrders", getAllOrders);


  async function getAllOrders() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

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

  return (
    <div className="p-5 mx-auto md:w-[90%] mt-5">
      {data?.data.length > 0 ? (
        data?.data.map((order, idx) => (
          <div key={idx} className="p-6 my-5 bg-slate-100 ">
            <h2>Total Order Price: {order.totalOrderPrice} EGP</h2>
            <h2>Payment Method: {order.paymentMethodType}</h2>

            <div className="flex flex-wrap justify-center items-center">
              {order.cartItems?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/6"
                >
                  <img
                    src={item.product.imageCover}
                    className="w-full"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-4xl text-green-700 py-5">
          NO ORDERS TO DISPLAY
        </h1>
      )}
    </div>
  );
};

export default AllOrders;

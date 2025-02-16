import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cartId, setNumOfItems, setProducts, setTotalPrice } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          { shippingAddress: values },
          { headers: { token: localStorage.getItem("token") } }
        );
        setNumOfItems(0);
        setProducts([]);
        resetForm();
        toast.success("Payment successful");
        navigate("/");
      } catch (error) {
        console.error("Error placing cash order:", error);
      }
      setLoading(false);
    },
  });

  async function onlineOrder() {
    try {
      if (
        !formik.values.details ||
        !formik.values.phone ||
        !formik.values.city
      ) {
        toast.error("Please fill in all required fields before proceeding.");
        return;
      }
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: formik.values },
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "http://localhost:5173" },
        }
      );
      window.open(data.session.url);
    } catch (error) {
      console.error("Error placing online order:", error);
    }
  }

  return (
    <div className="py-10 md:w-[60%] mx-auto px-5">
      <form onSubmit={formik.handleSubmit}>
        {["details", "phone", "city"].map((field) => (
          <div className="mb-5" key={field}>
            <label
              htmlFor={field}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === "phone" ? "tel" : "text"}
              {...formik.getFieldProps(field)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                <span className="font-medium">Error! </span>
                {formik.errors[field]}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-green-500"
        >
          {loading ? (
            <i className="fa-solid fa-spin fa-spinner text-white"></i>
          ) : (
            "Cash Payment"
          )}
        </button>

        <button
          type="button"
          onClick={onlineOrder}
          className="focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2 bg-green-500"
        >
          Online Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;

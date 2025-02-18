import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validYup = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min chars 3")
      .max(20, "max chars 20"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter Valid Email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,10}$/,
        `Password must Start with a letter (either uppercase or lowercase).
Or Be between 6 and 10 characters in total.
Or Can only contain letters (A-Z or a-z) and numbers (0-9)`
      ),
    rePassword: Yup.string()
      .required("re-Password is required")
      .oneOf([Yup.ref("password")], "re-Password doesn't match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Egyptian phone Number"),
  });

  async function signup(values) {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(data.message);

      setisLoading(false);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: signup,
    validationSchema: validYup,
  });

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

  return (
    <div className="py-7 ">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
          Register Now
        </h1>

        <div className="w-[80%] lg:w-[60%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name :
              </label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
              />
              {formik.touched.name && formik.errors.name && (
                <div
                  class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">Error!</span> {formik.errors.name}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email :
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
              />
              {formik.touched.email && formik.errors.email && (
                <div
                  class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">Error!</span> {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password :
              </label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="password"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
              />
              {formik.touched.password && formik.errors.password && (
                <div
                  class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">Error! </span>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* re-Password Input */}
            <div className="mb-5">
              <label
                htmlFor="rePassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Re-Password :
              </label>
              <input
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="rePassword"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div
                  class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">Error! </span>
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone :
              </label>
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                id="phone"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
              />
              {formik.touched.phone && formik.errors.phone && (
                <div
                  class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">Error!</span> {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="flex justify-center md:justify-end items-center">
            <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={`focus:outline-none w-full md:w-1/4 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
      ${
        formik.isValid && formik.dirty
          ? "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
          : "bg-gray-400 cursor-not-allowed"
      }`}
              >
                {isLoading? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Register Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

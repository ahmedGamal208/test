import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetCodeExists, setResetCodeExists] = useState(true);

  useEffect(() => {
    const resetCode = localStorage.getItem("resetCode");
    if (!resetCode) {
      toast.error("Unauthorized access! Please enter the verification code.");
      setResetCodeExists(false);
    }

    // Remove reset code when user leaves the page
    return () => {
      localStorage.removeItem("resetCode");
    };
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,9}$/,
        `Password must Start with a letter (either uppercase or lowercase).
         Or Be between 6 and 10 characters in total.
         Or Can only contain letters (A-Z or a-z) and numbers (0-9)`
      ),
  });

  async function handleResetPassword(values) {
    if (!resetCodeExists) {
      toast.error("Verification code is missing. Please restart the process.");
      return;
    }

    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      toast.success("Password reset successful!");

      localStorage.removeItem("resetCode");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="py-7">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
          Reset Password
        </h1>
        <div className="w-[80%] lg:w-[60%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-900">Email:</label>
              <input
                type="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-gray-900">New Password:</label>
              <input
                type="password"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                {...formik.getFieldProps("newPassword")}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-red-500">{formik.errors.newPassword}</div>
              )}
            </div>
            <div className="flex justify-center md:justify-end items-center">
            <button
              type="submit"
              className={`focus:outline-none w-full md:w-2/6 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2  ${
                formik.isValid && formik.dirty
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!(formik.isValid && formik.dirty)}
              >
              Reset Password
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

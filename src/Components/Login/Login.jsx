import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^[A-Za-z][A-Za-z0-9]{5,8}$/,
          "Password must start with a letter and be 6-9 characters."
        ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
      setIsLoading(false);
    },
  });

  // Forgot Password Request
  const forgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: forgotEmail }
      );
      toast.success("Reset code sent to your email");
      setShowForgotPassword(false);
      setShowVerifyCode(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link");
    }
    setIsLoading(false);
  };

  // Verify Reset Code
  const verifyResetCode = async () => {
    if (!verificationCode) {
      toast.error("Enter the verification code");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: verificationCode }
      );

      toast.success("Code verified successfully!");

      // Store reset code in local storage
      localStorage.setItem("resetCode", verificationCode);

      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired code");
    }
    setIsLoading(false);
  };

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
    <div className="py-7">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
          Login Now
        </h1>

        {/* Login Form */}
        <div className="w-[80%] lg:w-[60%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
              {formik.touched.email && formik.errors.email && (
                <div
                  className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
              {formik.touched.password && formik.errors.password && (
                <div
                  className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="text-green-700 text-sm hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center md:justify-end items-center">
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={`focus:outline-none w-full md:w-1/6 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
                ${
                  formik.isValid && formik.dirty
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4 focus:ring-green-500 focus:border-green-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowForgotPassword(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 hover:bg-green-800  text-white px-4 py-2 rounded"
                onClick={forgotPassword}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Code Modal */}
      {showVerifyCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Verification Code</h2>
            <input
              type="text"
              placeholder="Enter the code sent to your email"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4 focus:ring-green-500 focus:border-green-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setShowVerifyCode(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                onClick={verifyResetCode}
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

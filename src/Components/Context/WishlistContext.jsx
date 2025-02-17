import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getUserWishlist() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoading(false);
    }
  }

  async function addProductToWishlist(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers: { token } }
      );
      getUserWishlist();
      return data;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  }

  async function removeItem(id) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token } }
      );
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        products,
        loading,
        removeItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;

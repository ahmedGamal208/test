import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [totalCartItems, setTotalCartItems] = useState(null);

  // add product

  async function addProductToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      getUserCart();

      return data;
    } catch (error) {
      console.log(error, "Error adding product to cart");
    }
  }

  // get User cart

  async function getUserCart() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setLoading(false);
      setCartId(data?.data._id);
    } catch (error) {
      console.log(error, "getAllCart Context");
      setLoading(false);
    }
  }

  // update count

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
    } catch (error) {
      console.log(error, "error updating count");
    }
  }

  // removeItem

  async function removeItem(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
    } catch (error) {
      console.log(error, "error removing item");
    }
  }

  // ClearItems

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart/",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);
      setTotalCartItems(null);
    } catch (error) {
      console.log(error, "error clearing items");
    }
  }

  useEffect(
    function () {
      if (token !== null) {
        getUserCart();
      }
    },
    [token]
  );

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        products,
        numOfItems,
        totalPrice,
        Loading,
        updateCount,
        removeItem,
        clearCart,
        cartId,
        setNumOfItems,
        setProducts,
        setTotalPrice,
        totalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./../../utils/baseUrl";

export const CartContext = createContext(null);
export default function CartContextProvider({ children }) {
  const [cartId, setCartId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  let userToken = localStorage.getItem("userToken");

  // Get User Cart
  function getUserCart(token) {
    return axios
      .get(`${baseUrl}/cart`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  // Upadate Cart Items Quantity
  function updateCartQuantity(productId, count, token) {
    return axios
      .put(
        `${baseUrl}/cart/${productId}`,
        { count },
        {
          headers: {
            token,
          },
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  // Add Product To Cart
  function addToCart(token, productId) {
    return axios
      .post(
        `${baseUrl}/cart`,
        { productId },
        {
          headers: {
            token,
          },
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  // Remove Product From Cart
  function removeProduct(id, token) {
    return axios
      .delete(`${baseUrl}/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  // Clear Cart
  function clearCart(token) {
    return axios
      .delete(`${baseUrl}/cart/`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  // Get Cart Id and Cart Items Quantity
  async function getCart() {
    if (userToken) {
      let response = await getUserCart(userToken);
      if (response.status === 200) {
        setCartId(response.data.data._id);
        setCartCount(response.data.numOfCartItems);
      }
    }
  }

  // Online Payment
  function onlinePayment(token, cartId, shippingAddress) {
    return axios
      .post(
        `${baseUrl}/orders/checkout-session/${cartId}?url=https://react-ecommerce-app-beta.vercel.app/`,
        {
          shippingAddress,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  useEffect(() => {
    getCart();
  }, [userToken]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        cartId,
        cartCount,
        setCartCount,
        updateCartQuantity,
        removeProduct,
        clearCart,
        onlinePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

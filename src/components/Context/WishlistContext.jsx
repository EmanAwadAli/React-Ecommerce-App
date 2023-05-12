import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./../../utils/baseUrl";

export const WishListContext = createContext(null);

export default function WishListContextProvider({ children }) {
  const [whishlistItemsCount, setWhishlistItemsCount] = useState(0);
  let userToken = localStorage.getItem("userToken");

  // Get User WishList
  function getUserWishList(token) {
    return axios
      .get(`${baseUrl}/wishlist`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  // Add Item To WishList
  function addToWishList(productId, token) {
    return axios
      .post(
        `${baseUrl}/wishlist`,
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

  // Remove Item From WishList
  function removeFromWishList(productId, token) {
    return axios
      .delete(`${baseUrl}/wishlist/${productId}`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  // Get WishList Items Count
  async function getWhishList() {
    if (userToken) {
      let response = await getUserWishList(userToken);
      if (response.status === 200) {
        setWhishlistItemsCount(response.data.data.length);
      }
    }
  }

  useEffect(() => {
    getWhishList();
  }, [userToken]);

  return (
    <WishListContext.Provider
      value={{
        getUserWishList,
        addToWishList,
        removeFromWishList,
        whishlistItemsCount,
        setWhishlistItemsCount,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

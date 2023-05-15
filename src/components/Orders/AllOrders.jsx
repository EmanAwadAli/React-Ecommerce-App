import React, { useEffect, useState } from "react";
import { baseUrl } from "./../../utils/baseUrl";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  let id = jwtDecode(localStorage.getItem("userToken")).id;

  console.log(id);

  // Get All User Orders
  async function getAllOrders() {
    await axios
      .get(`${baseUrl}/orders/user/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAllOrders(response.data);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="all_orders py-5">
        <div className="container">
          {allOrders.map((order, index) => (
            <div key={order.id} className="p-2 mb-3 border rounded-4 bg-light">
              <h2 className="border-bottom py-2">Order #{index + 1}</h2>
              <ul className="list-unstyled">
                <li>
                  <strong className="main-color2 me-1"> Total price : </strong>
                  {order.totalOrderPrice}
                </li>
                <li>
                  <strong className="main-color2 me-1">City :</strong>
                  {order.shippingAddress?.city}
                </li>
                <li>
                  <strong className="main-color2 me-1">Address :</strong>
                  {order.shippingAddress?.details}
                </li>
                <li>
                  <strong className="main-color2 me-1">Phone :</strong>{" "}
                  {order.shippingAddress?.phone}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

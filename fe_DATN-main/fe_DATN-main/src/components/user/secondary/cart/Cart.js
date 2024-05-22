// Home.js

import React, { useContext, useEffect, useState } from "react";
import { CountOrderItemByID } from "../../../../Services/OrderServices";
import io from "socket.io-client";
import env from "react-dotenv";
import { AppContext } from "../../../../context/AppContext";
// const SOCKET_PORT = env.SOCKET_SERVER_PORT || 8081;
// const ENDPOINT = SOCKET_PORT;
// const socket = io(ENDPOINT);
function Cart() {
  const [listcoutcart, setlistcoutcart] = useState([]);
  const [s_status, set_s_status] = useState(false);
  const { isCartChange } = useContext(AppContext);
  // useEffect(() => {
  //     getcoutcart();
  //     console.log("count: ",s_status);
  //     const handlechangecart = (data) => {
  //         set_s_status(data);
  //       };
  //     socket.on('count cart', handlechangecart);

  //     return () => {
  //         socket.off('count cart', handlechangecart);
  //       };
  // }, [s_status]);
  useEffect(() => {
    getcoutcart();
    console.log("cart: ", isCartChange);
  }, [isCartChange]);
  const getcoutcart = async () => {
    try {
      let res = await CountOrderItemByID(localStorage.getItem("id666"));
      if (res && res.data) {
        setlistcoutcart(res.data);
      }
    } catch (error) {
      setlistcoutcart({ orderItemCount: 0 });
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <div className="fa-cart-shopping-container">
        <i
          className="fa-solid fa-cart-shopping cart-logo"
          data-count={listcoutcart.orderItemCount}
        ></i>
      </div>
      {/* {s_status && <p>{s_status}</p>} */}
    </>
  );
}

export default Cart;

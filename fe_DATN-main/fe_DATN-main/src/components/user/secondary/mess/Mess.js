// Home.js

import React, { useContext, useEffect, useState } from 'react';
import { CountOrderItemByID } from '../../../../Services/OrderServices';
import io from 'socket.io-client';
import env from "react-dotenv";
import { AppContext } from '../../../../context/AppContext';
// const SOCKET_PORT = env.SOCKET_SERVER_PORT || 8081;
// const ENDPOINT = SOCKET_PORT;
// const socket = io(ENDPOINT);
function Mess() {
    // const [listcoutMess, setlistcoutMess] = useState([]);
    // const [s_status, set_s_status] = useState(false);
    // const {isMessChange} = useContext(AppContext);


    // useEffect(() => {
    //     getcoutMess();
    //     console.log("count: ",s_status);
    //     const handlechangeMess = (data) => {
    //         set_s_status(data);
    //       };
    //     socket.on('count Mess', handlechangeMess);
       
    //     return () => {
    //         socket.off('count Mess', handlechangeMess);
    //       };
    // }, [s_status]);
    // useEffect(() => {
    //     getcoutMess();
    //     console.log('Mess: ', isMessChange);
    // }, [isMessChange]);
    // const getcoutMess = async () => {
    //     try {
    //         let res = await CountOrderItemByID(localStorage.getItem('id666'));
    //         if (res && res.data) {
    //             setlistcoutMess(res.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };
    return (
        <>
            <div className="fa-cart-shopping-container">
                {/* <i className="fa-solid fa-Mess-shopping Mess-logo" data-count={listcoutMess.orderItemCount}></i> */}
                {/* <i className="fa-solid fa-cart-shopping cart-logo"></i> */}
                <i className="fa-regular fa-message cart-logo" data-count={2}></i>
            </div>
            {/* {s_status && <p>{s_status}</p>} */}
        </>
    );
}

export default Mess;

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import env from "react-dotenv";
// import SOCKET_SERVER_PORT from '../../../Services/socket-env';

// // const SOCKET_PORT = process.env.SOCKET_SERVER_PORT || "http://localhost:808111";
// const ENDPOINT = SOCKET_SERVER_PORT;
// const socket = io(ENDPOINT);

// function StoreCustomer() {
//   const [response, setResponse] = useState("");
//   const [s_mess, set_s_mess] = useState("");

//   useEffect(() => {
//     const handleTest1 = (data) => {
//       setResponse(data);
//     };

//     const handleChatMessage = (data) => {
//       set_s_mess(data);
//     };

//     socket.on('test1', handleTest1);
//     socket.on('chat message', handleChatMessage);

//     return () => {
//       socket.off('test1', handleTest1);
//       socket.off('chat message', handleChatMessage);
//     };
//   }, []);

//   const handleSendMess = (data) => {
//     socket.emit('chat message', data);
//   };

//   return (
//     <>
//       this is chat store & customer
//       <div>
//         <button onClick={() => socket.emit('test1')}>Press me</button>
//         {response && <p>{response}</p>}
//       </div>
//       <div>
//         <input type='text' value={s_mess} onChange={(e) => set_s_mess(e.target.value)} />
//         <button onClick={() => handleSendMess(s_mess)}>send mess</button>
//         {s_mess && <p>{s_mess}</p>}
//       </div>
//     </>
//   );
// }

// export default StoreCustomer;

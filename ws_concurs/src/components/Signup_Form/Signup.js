// import { useRef, useState } from "react";
// import { signup, useAuth, login, logout } from "../../firebase";

// const Signup = () => {
//   const [loading, setLoading] = useState(false);
//   const currentUser = useAuth();

//   const emailRef = useRef();
//   const passwordRef = useRef();
//   async function handleSignup() {
//     setLoading(true);
//     try {
//       await signup(emailRef.current.value, passwordRef.current.value);
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }
//   async function handleLogin() {
//     setLoading(true);
//     try {
//       await login(emailRef.current.value, passwordRef.current.value);
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }
//   async function handleLogout() {
//     setLoading(true);
//     try {
//       await logout();
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }
//   return (
//     <div>
//       <div>Currently logged in as:{currentUser?.email} </div>
//       <div id="fields">
//         <input ref={emailRef} placeholder="Email" />
//         <input ref={passwordRef} placeholder="Password" />
//       </div>
//       <button disabled={loading || currentUser} onClick={handleSignup}>
//         Sign Up
//       </button>
//       <button disabled={loading || currentUser} onClick={handleLogin}>
//         Log In
//       </button>
//       <button disabled={loading || !currentUser} onClick={handleLogout}>
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default Signup;

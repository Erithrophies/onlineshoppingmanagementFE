"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.username === username && parsedUser.password === password) {
        localStorage.setItem("loggedInUser", username);
        router.push("/");
      } else {
        setError("Invalid username or password!");
      }
    } else {
      setError("No user found, please register first.");
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "4px",
            background: "#32a1e0ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Sign In
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}






// import React from 'react';

// export default function LoginPage() {
//   return (
//     <div>
//       <h1>Login</h1>
//       <form>
      
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" />
//         </div>
//         <br />
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }
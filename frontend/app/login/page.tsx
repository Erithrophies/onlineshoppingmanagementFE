


import React from 'react';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
      
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
    
  );
}
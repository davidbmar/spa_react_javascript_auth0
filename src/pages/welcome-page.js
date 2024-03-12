import React, { useState } from 'react';
import './welcome-page.css';

const WelcomeForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="welcome-form">
      <h2>Welcome to TaskList Pro</h2>
      <p>Enter your email address to get started</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@yourcompany.com"
        />
        
        <button type="submit">Continue with Email</button>
        
        <div className="separator">OR</div>
        
        <button type="button" className="google-button">Continue with Google</button>
        <button type="button" className="apple-button">Continue with Apple</button>
      </form>

      <div className="signin-link">
        Already have an account? <a href="/signin">Sign In</a>
      </div>
    </div>
  );
};

export default WelcomeForm;

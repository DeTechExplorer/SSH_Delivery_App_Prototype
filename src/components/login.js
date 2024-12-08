import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.jpeg';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setError("");
  
      if (email && password) {
        // Set session storage to indicate user has visited
        sessionStorage.setItem('hasVisited', 'true');
        // Navigate to homepage
        navigate('/homepage');
      } else {
        setError("Please enter both email and password");
      }
    };
  

  return (
    <div style={styles.body}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logoImg} />
      </div>
      <div style={styles.loginContainer}>
        <h2 style={styles.h2}>Login</h2>
        <p style={styles.description}>Please enter your SSH credentials</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


// Inline styles
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    // backgroundColor: "#CAE9F5",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column", // Stack children (logo and form) vertically
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    height: "100vh",
  },
  logoContainer: {
    marginBottom: "40px", // Add spacing between the logo and the form
  },
  logoImg: {
    width: "150px", // Adjust as needed
    height: "150px", // Adjust as needed
    objectFit: "contain",
  },
  loginContainer: {
    backgroundColor: "#CAE9F5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
    padding: "20px",
    borderRadius: "8px",
    width: "45%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  h2: {
    color: "rgb(85, 147, 160)",
    marginBottom: "20px",
  },
  description: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "black",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "rgb(100, 155, 203)",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
  buttonHover: {
    backgroundColor: "#0f6bce",
  },
};


export default Login;
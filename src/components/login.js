import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.jpeg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  // Predefined valid users
  const validUsers = [
    { email: "johnsmith@ssh.ac.uk", password: "John_s2204" },
    { email: "sarahjohnson@ssh.ac.uk", password: "Sarah_j2567" },
    { email: "mikechen@ssh.ac.uk", password: "Mike_c2031" }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Reset previous messages
    setMessage("");
    setMessageType("");

    // Check if email is empty
    if (!email) {
      setMessage("Email cannot be empty");
      setMessageType("error");
      return;
    }

    // Check if password is empty
    if (!password) {
      setMessage("Password cannot be empty");
      setMessageType("error");
      return;
    }

    // Validate email and password
    const user = validUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Successful login
      setMessage("Logged in successfully!");
      setMessageType("success");
      
      // Set session storage to indicate user has visited
      sessionStorage.setItem('hasVisited', 'true');
      
      // Navigate to homepage after a short delay to show success message
      setTimeout(() => {
        navigate('/homepage');
      }, 1500);
    } else {
      // Check if email exists
      const emailExists = validUsers.some(u => u.email === email);
      
      if (emailExists) {
        setMessage("Incorrect password. Please try again.");
        setMessageType("error");
      } else {
        setMessage("Email not found. Please check your email address.");
        setMessageType("error");
      }
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
        
        {message && (
          <p style={messageType === 'error' ? styles.errorMessage : styles.successMessage}>
            {message}
          </p>
        )}
        
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

// Updated styles with new message styling
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  logoContainer: {
    marginBottom: "40px",
  },
  logoImg: {
    width: "150px",
    height: "150px",
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
  errorMessage: {
    color: "red",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  successMessage: {
    color: "green",
    marginBottom: "15px",
    fontWeight: "bold",
  }
};

export default Login;

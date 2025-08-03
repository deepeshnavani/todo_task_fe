import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password)
      return alert("Please enter email and password");

    try {
      setLoading(true);
      const res = await fetch("https://todo-task-be.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleLogin} disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "16px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "clamp(20px, 5vw, 40px)",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "450px",
    minWidth: "280px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    color: "#f5f5f5",
    border: "1px solid #333",
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: "clamp(20px, 4vw, 32px)",
    textAlign: "center",
    fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
    fontWeight: "700",
    color: "#f5f5f5",
    letterSpacing: "-0.02em",
  },
  input: {
    marginBottom: "clamp(14px, 3vw, 20px)",
    width: "100%",
    padding: "clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 18px)",
    borderRadius: "8px",
    border: "1px solid #404040",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    boxSizing: "border-box",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    minHeight: "44px",
  },
  button: {
    width: "100%",
    padding: "clamp(12px, 3.5vw, 16px)",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    marginTop: "clamp(6px, 1.5vw, 8px)",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    fontWeight: "600",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
    minHeight: "48px",
  },
  text: {
    marginTop: "clamp(16px, 4vw, 24px)",
    fontSize: "clamp(0.85rem, 2.2vw, 1rem)",
    textAlign: "center",
    color: "#bbb",
    fontWeight: "500",
    lineHeight: "1.4",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

// Add media query styles using CSS-in-JS approach
const mediaStyles = `
  @media (max-width: 480px) {
    input:focus {
      transform: scale(1.02);
    }
    
    button:active {
      transform: scale(0.98);
    }
  }
  
  @media (max-width: 320px) {
    .login-card {
      padding: 20px !important;
    }
  }
  
  @media (min-width: 768px) {
    input:hover {
      border-color: #555;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    button:hover:not(:disabled) {
      background-color: #5CBF60;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
    }
    
    a:hover {
      color: #5CBF60;
      text-decoration: underline;
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = mediaStyles;
  document.head.appendChild(styleElement);
}

export default Login;

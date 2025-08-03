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
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    maxWidth: "90vw",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    color: "#f5f5f5",
    border: "1px solid #333",
  },
  heading: {
    marginBottom: "32px",
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#f5f5f5",
    letterSpacing: "-0.02em",
  },
  input: {
    marginBottom: "20px",
    width: "100%",
    padding: "14px 18px",
    borderRadius: "8px",
    border: "1px solid #404040",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    boxSizing: "border-box",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    marginTop: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
  },
  text: {
    marginTop: "24px",
    fontSize: "1rem",
    textAlign: "center",
    color: "#bbb",
    fontWeight: "500",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default Login;

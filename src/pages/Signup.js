import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) return alert(t("fill_all_fields"));

    try {
      setLoading(true);
      const res = await fetch("https://todo-task-be.vercel.app/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.user_id) {
        alert(t("signup_success"));
        navigate("/login");
      } else {
        alert(data.message || t("signup_failed"));
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert(t("server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar title={t("signup")} />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>{t("signup")}</h2>
          <input
            name="name"
            type="text"
            placeholder={t("name")}
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button
            onClick={handleSignup}
            disabled={loading}
            style={styles.button}
          >
            {loading ? t("creating") : t("signup")}
          </button>
          <p style={styles.linkText}>
            {t("have_account")}{" "}
            <Link to="/login" style={styles.link}>
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    padding: "clamp(16px, 4vw, 32px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 80px)",
  },
  card: {
    backgroundColor: "#1a1a1a",
    width: "100%",
    maxWidth: "450px",
    minWidth: "280px",
    margin: "0 auto",
    padding: "clamp(24px, 5vw, 40px)",
    borderRadius: "12px",
    color: "#f5f5f5",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(16px, 3vw, 20px)",
    border: "1px solid #333",
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: "clamp(16px, 3vw, 32px)",
    textAlign: "center",
    fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
    fontWeight: "700",
    color: "#f5f5f5",
    letterSpacing: "-0.02em",
  },
  input: {
    padding: "clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 18px)",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    border: "1px solid #404040",
    borderRadius: "8px",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "44px",
  },
  button: {
    padding: "clamp(12px, 3.5vw, 16px)",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    fontWeight: "600",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
    minHeight: "48px",
    width: "100%",
    boxSizing: "border-box",
  },
  linkText: {
    marginTop: "clamp(12px, 2.5vw, 16px)",
    textAlign: "center",
    color: "#bbb",
    fontSize: "clamp(0.85rem, 2.2vw, 1rem)",
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

export default Signup;

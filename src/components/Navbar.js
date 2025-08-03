// Navbar.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>{t("Todo")}</h2>

      <div style={styles.right}>
        <select
          style={styles.dropdown}
          onChange={handleLanguageChange}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>

        {token ? (
          <button onClick={handleLogout} style={styles.button}>
            {t("logout")}
          </button>
        ) : (
          <Link to="/login" style={styles.link}>
            <button style={styles.button}>{t("login")}</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
    padding: "18px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
    position: "sticky",
    top: 0,
    zIndex: 999,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
  },
  title: {
    color: "#f5f5f5",
    margin: 0,
    fontSize: "1.75rem",
    fontWeight: "700",
    letterSpacing: "-0.02em",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  dropdown: {
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#2a2a2a",
    color: "#f1f1f1",
    border: "1px solid #404040",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    textTransform: "capitalize",
    letterSpacing: "0.02em",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
  },
  link: {
    textDecoration: "none",
  },
};

export default Navbar;

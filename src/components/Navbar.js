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
    padding: "clamp(12px, 3vw, 18px) clamp(16px, 4vw, 32px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
    position: "sticky",
    top: 0,
    zIndex: 999,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
    flexWrap: "wrap",
    gap: "clamp(8px, 2vw, 12px)",
    minHeight: "60px",
    boxSizing: "border-box",
  },
  title: {
    color: "#f5f5f5",
    margin: 0,
    fontSize: "clamp(1.2rem, 4vw, 1.75rem)",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    flexShrink: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 2.5vw, 18px)",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    minWidth: "fit-content",
  },
  dropdown: {
    padding: "clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)",
    borderRadius: "8px",
    backgroundColor: "#2a2a2a",
    color: "#f1f1f1",
    border: "1px solid #404040",
    fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    minHeight: "36px",
    boxSizing: "border-box",
  },
  button: {
    padding: "clamp(8px, 2vw, 10px) clamp(16px, 3.5vw, 20px)",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)",
    transition: "all 0.3s ease",
    textTransform: "capitalize",
    letterSpacing: "0.02em",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
    minHeight: "36px",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
  },
  link: {
    textDecoration: "none",
  },
};

// Media query styles for enhanced responsive behavior
const mediaStyles = `
  @media (max-width: 480px) {
    .navbar {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px !important;
      padding: 12px 16px !important;
    }
    
    .navbar-title {
      text-align: center !important;
      font-size: 1.3rem !important;
    }
    
    .navbar-right {
      justify-content: center !important;
      gap: 12px !important;
    }
  }
  
  @media (max-width: 380px) {
    .navbar-right {
      flex-direction: column !important;
      gap: 8px !important;
    }
    
    .navbar-dropdown,
    .navbar-button {
      width: 100% !important;
      text-align: center !important;
    }
  }
  
  @media (min-width: 769px) {
    .navbar-dropdown:hover {
      border-color: #555;
      background-color: #333;
      transform: translateY(-1px);
    }
    
    .navbar-button:hover {
      background-color: #5CBF60 !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4) !important;
    }
  }
  
  @media (max-width: 320px) {
    .navbar {
      padding: 8px 12px !important;
      gap: 8px !important;
    }
    
    .navbar-title {
      font-size: 1.1rem !important;
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = mediaStyles;
  document.head.appendChild(styleElement);
}

export default Navbar;

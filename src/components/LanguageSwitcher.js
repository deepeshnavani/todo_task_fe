import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={styles.container}>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={styles.select}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "inline-block",
  },
  select: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    border: "1px solid #444",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
};

export default LanguageSwitcher;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TodoForm = ({ onAdd }) => {
  const { t } = useTranslation();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || !description || !dueDate) return;

    setLoading(true);
    try {
      const taskData = {
        task_name: task,
        task_description: description,
        task_desc: description,
        due_date: dueDate,
        completed: false,
      };

      await onAdd(taskData);
      setTask("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      console.error("Error submitting task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>{t("task_name")} *</label>
        <input
          type="text"
          placeholder={t("task_name")}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>{t("task_desc")} *</label>
        <textarea
          placeholder={t("task_desc")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
          rows="4"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>{t("due_date")} *</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <button
        type="submit"
        style={{
          ...styles.button,
          ...(loading ? styles.buttonLoading : {}),
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <span style={styles.spinner}></span>
            {t("add_task")}...
          </>
        ) : (
          t("add_task")
        )}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(16px, 3vw, 24px)",
    width: "100%",
    boxSizing: "border-box",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(6px, 1.5vw, 8px)",
    width: "100%",
  },
  label: {
    color: "#f5f5f5",
    fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
    fontWeight: "600",
    marginBottom: "clamp(4px, 1vw, 6px)",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 18px)",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    border: "1px solid #404040",
    borderRadius: "8px",
    fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "44px",
  },
  textarea: {
    padding: "clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 18px)",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    border: "1px solid #404040",
    borderRadius: "8px",
    fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
    minHeight: "clamp(100px, 15vw, 120px)",
    resize: "vertical",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: "1.6",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "clamp(14px, 3.5vw, 16px) clamp(20px, 4vw, 24px)",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(6px, 1.5vw, 8px)",
    marginTop: "clamp(8px, 2vw, 12px)",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
    minHeight: "48px",
    width: "100%",
    boxSizing: "border-box",
  },
  buttonLoading: {
    backgroundColor: "#666",
    cursor: "not-allowed",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  spinner: {
    width: "clamp(14px, 2.5vw, 16px)",
    height: "clamp(14px, 2.5vw, 16px)",
    border: "2px solid transparent",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add keyframe animation
const keyframeStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (min-width: 768px) {
    input:hover, textarea:hover {
      border-color: #555 !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
    }
    
    button:hover:not(:disabled) {
      background-color: #5CBF60 !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4) !important;
    }
  }
  
  @media (max-width: 480px) {
    input:focus, textarea:focus {
      transform: scale(1.01);
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = keyframeStyles;
  document.head.appendChild(styleElement);
}

export default TodoForm;

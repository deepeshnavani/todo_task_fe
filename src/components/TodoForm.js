import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ Import this

const TodoForm = ({ onAdd }) => {
  const { t } = useTranslation(); // ✅ Initialize hook
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
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#f5f5f5",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "6px",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "14px 18px",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    border: "1px solid #404040",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  textarea: {
    padding: "14px 18px",
    backgroundColor: "#2a2a2a",
    color: "#f5f5f5",
    border: "1px solid #404040",
    borderRadius: "8px",
    fontSize: "1rem",
    minHeight: "120px",
    resize: "vertical",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: "1.6",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  button: {
    padding: "16px 24px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 12px rgba(76, 175, 80, 0.3)",
  },
  buttonLoading: {
    backgroundColor: "#666",
    cursor: "not-allowed",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default TodoForm;

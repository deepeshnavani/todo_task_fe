import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://todo-task-be.vercel.app/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [navigate]);

  const addTask = async (task) => {
    try {
      const res = await fetch("https://todo-task-be.vercel.app/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTask = async (todo_id) => {
    try {
      const res = await fetch(
        `https://todo-task-be.vercel.app/api/todos/${todo_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");
      setTodos((prev) => prev.filter((t) => t.todo_id !== todo_id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (todo_id, task_name, due_date, task_desc) => {
    const newTaskName = prompt(t("updateTaskName"), task_name);
    const newDueDate = prompt(t("updateDueDate"), due_date);
    const newDescription = prompt(t("updateDescription"), task_desc);

    if (!newTaskName || !newDueDate || !newDescription) return;

    try {
      const res = await fetch(
        `https://todo-task-be.vercel.app/api/todos/${todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            task_name: newTaskName,
            due_date: newDueDate,
            task_desc: newDescription,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.todo_id === todo_id ? updated : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>{t("addNewTask")}</h2>
          <TodoForm onAdd={addTask} />
        </div>

        <div style={styles.taskCard}>
          <h2 style={styles.heading}>{t("yourTasks")}</h2>

          {loading ? (
            <p style={styles.message}>{t("loading")}</p>
          ) : todos.length === 0 ? (
            <p style={styles.message}>{t("noTasks")}</p>
          ) : (
            <ul style={styles.list}>
              {todos.map((todo) => (
                <li key={todo.todo_id} style={styles.item}>
                  <div style={styles.details}>
                    <strong style={styles.title}>{todo.task_name}</strong>
                    <p style={styles.description}>{todo.task_desc}</p>
                    <div style={styles.date}>
                      {t("due")}: {todo.due_date}
                    </div>
                  </div>
                  <div style={styles.actions}>
                    <button
                      onClick={() =>
                        updateTask(
                          todo.todo_id,
                          todo.task_name,
                          todo.due_date,
                          todo.task_desc
                        )
                      }
                      style={styles.btn}
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => deleteTask(todo.todo_id)}
                      style={{ ...styles.btn, backgroundColor: "#f44336" }}
                    >
                      {t("delete")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    paddingBottom: "clamp(20px, 4vw, 40px)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "clamp(16px, 4vw, 32px) clamp(16px, 3vw, 24px)",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "clamp(20px, 4vw, 32px)",
    borderRadius: "12px",
    color: "#f5f5f5",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    marginBottom: "clamp(20px, 4vw, 32px)",
    border: "1px solid #333",
    boxSizing: "border-box",
  },
  taskCard: {
    backgroundColor: "#1a1a1a",
    padding: "clamp(20px, 4vw, 32px)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    border: "1px solid #333",
    boxSizing: "border-box",
  },
  heading: {
    color: "#f5f5f5",
    fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
    marginBottom: "clamp(16px, 3vw, 24px)",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: "-0.02em",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "clamp(16px, 3vw, 20px)",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: "clamp(16px, 3vw, 20px)",
    borderRadius: "8px",
    marginBottom: "clamp(12px, 2.5vw, 16px)",
    color: "#f5f5f5",
    border: "1px solid #404040",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    gap: "clamp(12px, 2vw, 16px)",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: "clamp(1rem, 2.8vw, 1.2rem)",
    color: "#f5f5f5",
    fontWeight: "600",
    lineHeight: "1.4",
    wordBreak: "break-word",
  },
  description: {
    fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
    color: "#bbb",
    marginTop: "clamp(6px, 1.5vw, 8px)",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    wordBreak: "break-word",
  },
  date: {
    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
    color: "#888",
    marginTop: "clamp(8px, 2vw, 12px)",
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    gap: "clamp(8px, 2vw, 10px)",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  btn: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    padding: "clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)",
    fontWeight: "600",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
    minHeight: "36px",
    flex: "0 1 auto",
    whiteSpace: "nowrap",
  },
  message: {
    textAlign: "center",
    color: "#aaa",
    marginTop: "clamp(20px, 4vw, 32px)",
    fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
    fontWeight: "500",
  },
};

// Media query styles for larger screens
const mediaStyles = `
  @media (min-width: 768px) {
    .todo-item {
      flex-direction: row !important;
      align-items: flex-start !important;
    }
    
    .todo-details {
      padding-right: 16px !important;
    }
    
    .todo-actions {
      flex-direction: column !important;
      min-width: 120px !important;
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = mediaStyles;
  document.head.appendChild(styleElement);
}

export default Home;

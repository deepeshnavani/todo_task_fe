// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      todo: "Todo",
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      signup: "Sign Up",
      name: "Name",
      email: "Email",
      password: "Password",
      creating: "Creating...",
      task_name: "Task Name",
      task_desc: "Task Description",
      due_date: "Due Date",
      add_task: "Add Task",
      fill_all_fields: "Please fill all fields",
      signup_success: "Signup successful! Please login.",
      signup_failed: "Signup failed",
      server_error: "Server error",
      Already_have_an_account: "Already have an account?",
      addNewTask: "Add a New Task",
      yourTasks: "Your To-Do List",
      loading: "Loading...",
      noTasks: "No tasks found.",
      due: "Due Date",
      edit: "Edit",
      delete: "Delete",
      updateTaskName: "Enter updated task name",
      updateDueDate: "Enter updated due date",
      updateDescription: "Enter updated task description",
    },
  },
  hi: {
    translation: {
      todo: "कार्य",
      welcome: "स्वागत है",
      login: "लॉगिन",
      logout: "लॉगआउट",
      signup: "साइन अप",
      name: "नाम",
      email: "ईमेल",
      password: "पासवर्ड",
      creating: "बना रहा है...",
      task_name: "कार्य का नाम",
      task_desc: "कार्य का विवरण",
      due_date: "नियत तिथि",
      add_task: "कार्य जोड़ें",
      fill_all_fields: "कृपया सभी फ़ील्ड भरें",
      signup_success: "साइन अप सफल! कृपया लॉगिन करें।",
      signup_failed: "साइन अप विफल",
      server_error: "सर्वर त्रुटि",
      Already_have_an_account: "पहले से खाता है?",
      addNewTask: "नया कार्य जोड़ें",
      yourTasks: "आपकी कार्य सूची",
      loading: "लोड हो रहा है...",
      noTasks: "कोई कार्य नहीं मिला।",
      due: "नियत तिथि",
      edit: "संपादित करें",
      delete: "हटाएं",
      updateTaskName: "अपडेटेड कार्य का नाम दर्ज करें",
      updateDueDate: "अपडेटेड नियत तिथि दर्ज करें",
      updateDescription: "अपडेटेड कार्य विवरण दर्ज करें",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

Todo App – Frontend
Features

- Login / Signup with JWT authentication
- Dark themed UI
- Add, update, delete tasks
- Multilingual support (English, Hindi)
- Auto redirect based on authentication

Tech Stack

- React
- React Router DOM
- i18next (for language translation)
- Axios (API calls)
- localStorage (JWT token management)
- Custom CSS (No Tailwind or external frameworks)

Setup Instructions
1. Clone the repo:
git clone <your-repo-url>
cd frontend
2. Install dependencies:
npm install
3. Update API URLs:
Set your backend base URL (e.g. https://todo-task-be.vercel.app)
4. Start the React app:
npm start
Language Support

- i18next is used for translation.
- Currently supports:
  - English (en)
  - Hindi (hi)
- You can switch languages from the dropdown in the navbar.

# 🚀 CoreX

![CoreX Banner](https://img.shields.io/badge/CoreX-ChatGPT_Clone-blueviolet)  

CoreX is a **ChatGPT clone** with a modern tech stack. It supports **temporary chats** for logged-out users and **persistent chat history** for logged-in users. The app integrates with **OpenRouter API** for AI responses and includes a points system for interactions.  

Check out the live project here: [CoreX Live](https://core-x-omega.vercel.app/)

---

## ✨ Features

- 🟢 Temporary chat sessions for logged-out users  
- 💾 Persistent chat history for logged-in users  
- 🆕 Create new chat threads  
- 🔐 Authentication with Firebase  
- 🎯 Points system connected to OpenRouter API  
- ⚡ Fast and responsive UI with React  

---

## 🛠 Technologies Used

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) 
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

- **Frontend:** React, Vite, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** Firebase  
- **AI Integration:** OpenRouter API  

---

## 🗂 Project Structure

backend/
├── admin/
│ ├── firebaseAdmin.js
│ └── serviceAccountKey.json
├── models/
│ ├── Thread.js
│ ├── temp.js
│ └── user.js
├── routes/
│ ├── Auth.js
│ └── chat.js
├── utils/
│ └── openai.js
└── server.js

frontend/
├── src/
│ ├── App.jsx
│ ├── Chat/
│ ├── ChatWindow/
│ ├── LogIn/
│ ├── Sidebar/
│ ├── MyContext.jsx
│ └── upgrade/
└── vite.config.js


---

## ⚡ Installation

### Backend

```bash
cd backend
npm install
Create a .env file with your credentials:

env
Copy code
FIREBASE_API_KEY=your_api_key
OPENROUTER_API_KEY=your_api_key
MONGO_URI=your_mongodb_uri
Start the backend server:

bash
Copy code
node server.js
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Access the app at http://localhost:5173.

💻 Usage
Temporary Chat: Start a chat without logging in; data won’t be saved.

Persistent Chat: Log in via Firebase to save your chat history.

Create New Chat: Begin a new thread for a different conversation.

👨‍💻 Author
Rishabh Negi

[LinkedIn](https://www.linkedin.com/in/rishabh-negi-877360286/)

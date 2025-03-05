# 🚀 Robot Assignment (Full-Stack Project)

A **full-stack robot movement simulator** with a **Node.js backend** and a **React frontend**.  
The user can enter movement commands (`L, R, F`), and the robot moves **visually in real-time** inside a grid.


## **📌 How to Run the Project**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/omarjaab/myrobot.git
cd myrobot
```

### **2️⃣ Install Dependencies**
Navigate to the backend and frontend folders and install dependencies:

#### **🔹 Backend**
```sh
cd backend
npm install
```

#### **🔹 Frontend**
```sh
cd ../frontend
npm install
```

---

## **📌 Running the Project**

### **🔹 Start the Backend Server**
```sh
cd backend
node server.js
```
✅ Runs the backend on **`http://localhost:5000`**  
✅ This handles robot movement logic

---

### **🔹 Start the Frontend (React App)**
```sh
cd ../frontend
npm start
```
✅ Opens the React app at **`http://localhost:3000`**  
✅ Sends movement commands to the backend  
✅ Animates the robot in real-time 🤖  

---

## **📌 How to Use**
1️⃣ Set **Room Width & Height**  
2️⃣ Set **Start Position & Direction (N, E, S, W)**  
3️⃣ Enter **Commands (L, R, F)**  
4️⃣ Click **"Move Robot"**  
5️⃣ Watch the robot **animate on the grid!**  

---

## **📌 API Endpoint (For Backend)**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/move-robot` | Accepts movement commands & returns the final position |

#### **Example Request (Sent from the Frontend)**
```json
{
  "roomWidth": 5,
  "roomHeight": 5,
  "startX": 0,
  "startY": 0,
  "startDir": "N",
  "commands": "LFFRF"
}
```

#### **Example Response (From the Backend)**
```json
{
  "x": 1,
  "y": 3,
  "direction": "N"
}
```

 

---



## **📌 License**
📜 This project is licensed under the **MIT License**.  

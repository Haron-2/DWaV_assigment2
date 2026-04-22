# Web Traffic Visualisation (Assignment 2)

This project is a full-stack application designed to visualize incoming web traffic on a 3D globe in real-time. The system consists of a data generator script, a Flask backend, and an interactive Three.js/Globe.gl frontend. All components are containerized using Docker.

## 🛠 Tech Stack
* **Sender:** Python, Pandas, Requests (CSV parsing and real-time data stream emulation).
* **Backend:** Python, Flask, Flask-SocketIO, Gunicorn + Eventlet (Data routing via WebSockets).
* **Frontend:** HTML/CSS/JS, Three.js, Globe.gl, Socket.IO (3D visualization).
* **DevOps:** Docker, Docker Compose.

## 📂 Project Structure
```text
.
├── docker-compose.yml       # Docker orchestration config
├── sender/                  # Traffic emulator (reads CSV, sends POST requests)
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── sender.py
│   └── ip_addresses.csv     # Raw dataset file (provided by user)
├── backend/                 # Flask Server
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app.py
└── frontend/                # Nginx server with Three.js client
    ├── Dockerfile
    ├── index.html
    ├── style.css
    └── app.js
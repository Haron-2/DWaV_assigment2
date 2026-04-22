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
```

## 🚀 How to Run

**Requirements:** Docker and Docker Compose must be installed on your machine.

1. Clone or extract the project repository.
2. Ensure your dataset file `ip_addresses.csv` is placed inside the `sender/` directory.
3. Open your terminal in the root directory and run:
   ```bash
   docker-compose up --build
   ```
4. Once all containers are running successfully, open your browser and go to:
   [http://localhost:8080](http://localhost:8080)

*Note: The sender script has an intentional 5-second delay on startup to ensure the Flask backend is fully initialized before sending data.*

## ✅ Implemented Features

1. **Data Generation (Python Script):** 
   Implemented `sender.py` which reads the `.csv` file, sorts records by `Timestamp`, and sends them to the Flask server in JSON format. It correctly calculates the time delta between timestamps to emulate a real-time data stream.
   
2. **Data Receiving (Flask Server):**
   A backend Flask application acts as a receiver. To ensure low-latency communication, the server utilizes `Flask-SocketIO` to instantly forward received packages to the frontend via WebSockets. The app runs on a production-ready `Gunicorn` WSGI server with an `Eventlet` worker class.

3. **Visualisation (Three.js):**
   * Visualization is built on a 3D globe using `Globe.gl` (Three.js wrapper).
   * Points represent the real locations from the dataset. Normal traffic is highlighted in green, while suspicious traffic (`suspicious: 1`) is highlighted in red and rendered larger.
   * **Interactivity:** A "Live Traffic" widget dynamically updates a list of the most recent connections, displaying IPs and threat statuses.
   * **Data Handling & Readability:** Per the assignment guidelines, the visualization is not overwhelmed, nor do points aggressively pop up and disappear. Instead, after 10 seconds, active points "cool down" (becoming small, semi-transparent grey dots). This maintains historical context for analysis while a strict limit (max 5000 points) prevents browser lag.

4. **Deployment (Docker):**
   The entire system is containerized into 3 independent Docker containers (`sender`, `backend`, `frontend`) and orchestrated via `docker-compose` on a shared custom bridge network.

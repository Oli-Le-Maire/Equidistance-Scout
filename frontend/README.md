# Equidistance Scout

The Equidistance Scout is a web app which is designed to find the midway point between two locations. The user is presented with a form. Within the first input field the user enters the first location, and within the second input field the user enters the second location.

Upon submitting the form, the user is shown the address of the location that is exactly midway between the two locations, and a map renders showing the user where this is. 


## Backend - Flask API

### 📦 Requirements

- Python 3.10+
- `pip` (Python package manager)

### 🛠️ Setup & Run

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install flask flask-cors
python main.py
```
The program will run at: http://127.0.0.1:5000

## FrontEnd - React

### 📦 Requirements
- Node.js (>= 18.x recommended)
- npm or yarn

### 🛠️ Setup & Run

Navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
The program will run at: http://localhost:5173/

Emergency Response Tool 🚑🩸
Overview

The Emergency Response Tool is a web-based platform designed to connect blood donors with patients in emergency situations. The system allows users to submit blood requests, donors to register their availability, and administrators to verify and manage emergency requests efficiently.

This project aims to reduce the time required to find suitable blood donors during critical situations by matching donors based on blood group and location.

Features
👤 User Module
User Registration & Login
Submit Emergency Blood Requests
Upload Proof Documents
Track Request Status
View Donor Assignment Updates
🩸 Donor Module
Register as a Blood Donor
Provide Blood Group Information
Specify Area and City
Accept Blood Donation Requests
🛡️ Admin Module
Secure Admin Login
View All Blood Requests
Verify Uploaded Proofs
Approve Emergency Requests
Manage Donor Assignments
🔍 Smart Donor Matching
Match donors based on:
Blood Group
City
Display eligible donors instantly
Tech Stack
Frontend
HTML5
CSS3
JavaScript
Backend
Python
Flask
Flask-CORS
Database
MongoDB
Additional Libraries
PyMongo
Werkzeug
Project Structure
Emergency-Response-Tool/
│
├── app.py
├── requirements.txt
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── admin.js
│   │   ├── donor.js
│   │   ├── user.js
│   │   └── main.js
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── admin_login.html
│   ├── user_dashboard.html
│   ├── donor_dashboard.html
│   └── admin_dashboard.html
│
└── uploads/
Workflow
User registers and logs in.
User submits an emergency blood request.
Proof document is uploaded for verification.
Admin reviews and approves the request.
System searches for matching donors.
Donors receive and accept requests.
Request status is updated to Donor Assigned.
Database Collections
Users Collection
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
Donors Collection
{
  "name": "Rahul",
  "blood_group": "O+",
  "area": "Vijayawada",
  "city": "Vijayawada"
}
Requests Collection
{
  "blood_group": "O+",
  "hospital": "Government Hospital",
  "area": "Benz Circle",
  "city": "Vijayawada",
  "status": "Pending",
  "proof": "document.pdf"
}
Installation
Clone Repository
git clone https://github.com/yourusername/emergency-response-tool.git
cd emergency-response-tool
Create Virtual Environment
python -m venv venv
Activate Environment

Windows:

venv\Scripts\activate

Linux/Mac:

source venv/bin/activate
Install Dependencies
pip install flask
pip install flask-cors
pip install pymongo
Start MongoDB
mongod
Run Application
python app.py

Application will run on:

http://127.0.0.1:5000
Future Enhancements
SMS Notifications using Twilio/Fast2SMS
GPS-Based Donor Search
Real-Time Emergency Alerts
Hospital Integration
AI-Based Donor Prioritization
Mobile Application Support
Blood Availability Analytics Dashboard
Email Notifications
Screenshots

Add screenshots of:

Home Page
User Dashboard
Donor Dashboard
Admin Dashboard
Blood Request Form
Donor Matching Results
Demo Video Content (For GitHub)
Introduction (20 sec)

"Hello everyone, this is my Emergency Response Tool project developed using Flask, MongoDB, HTML, CSS, and JavaScript. The objective is to help patients quickly find blood donors during emergencies."

User Module Demo (40 sec)
Register/Login
Submit blood request
Upload proof document
Admin Module Demo (40 sec)
Login as admin
View requests
Approve emergency request
Donor Module Demo (40 sec)
Register donor
View matched requests
Accept donation request
Matching Feature Demo (30 sec)
Show blood group matching
Display nearby donors
Conclusion (20 sec)

"This project demonstrates a complete emergency blood donation management system with user, donor, and admin workflows, helping save valuable time during critical situations."
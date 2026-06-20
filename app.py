from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from bson import ObjectId
import os
from flask import send_from_directory


app = Flask(__name__)
CORS(app)

# ---------------- DATABASE ----------------
client = MongoClient("mongodb://localhost:27017/")
db = client["emergency_db"]

# ---------------- UPLOAD FOLDER ----------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- FRONTEND ROUTES ----------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/register-page")
def register_page():
    return render_template("register.html")

@app.route("/admin-login")
def admin_login_page():
    return render_template("admin_login.html")

@app.route("/user")
def user_dashboard():
    return render_template("user_dashboard.html")

@app.route("/donor")
def donor_dashboard():
    return render_template("donor_dashboard.html")

@app.route("/admin")
def admin_dashboard():
    return render_template("admin_dashboard.html")

# ---------------- AUTH ----------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    db.users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": data["password"],
        "role": data["role"]
    })

    return jsonify({"msg": "Registered successfully"})


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if data["email"] == "admin@gmail.com" and data["password"] == "admin123":
        return jsonify({"role": "admin"})

    user = db.users.find_one({
        "email": data["email"],
        "password": data["password"]
    })

    if user:
        return jsonify({"role": user["role"]})

    return jsonify({"msg": "Invalid credentials"}), 401


# ---------------- USER REQUEST ----------------

@app.route("/request", methods=["POST"])
def create_request():
    file = request.files["proof"]
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))

    db.requests.insert_one({
        "blood_group": request.form["blood_group"],
        "hospital": request.form["hospital"],
        "area": request.form["area"],
        "city": request.form["city"],
        "status": "Pending",
        "proof": filename,
        "donor": None
    })

    return jsonify({"msg": "Request submitted"})


@app.route("/requests")
def get_requests():
    data = list(db.requests.find())
    for r in data:
        r["_id"] = str(r["_id"])
    return jsonify(data)


# ---------------- DONOR ----------------

@app.route("/donor/register", methods=["POST"])
def donor_register():
    data = request.json

    db.donors.insert_one({
        "name": data["name"],
        "blood_group": data["blood_group"],
        "area": data["area"],
        "city": data["city"]
    })

    return jsonify({"msg": "Donor registered"})


@app.route("/donors")
def get_donors():
    data = list(db.donors.find())
    for d in data:
        d["_id"] = str(d["_id"])
    return jsonify(data)


# ---------------- ADMIN ACTIONS ----------------

@app.route("/approve", methods=["POST"])
def approve():
    data = request.json

    db.requests.update_one(
        {"_id": ObjectId(data["id"])},
        {"$set": {"status": "Approved"}}
    )

    return jsonify({"msg": "Approved"})


@app.route("/reject", methods=["POST"])
def reject():
    data = request.json

    db.requests.update_one(
        {"_id": ObjectId(data["id"])},
        {"$set": {"status": "Rejected"}}
    )

    return jsonify({"msg": "Rejected"})


@app.route("/assign", methods=["POST"])
def assign():
    data = request.json

    db.requests.update_one(
        {"_id": ObjectId(data["id"])},
        {"$set": {
            "status": "Donor Assigned",
            "donor": data["donor"]
        }}
    )

    return jsonify({"msg": "Donor Assigned"})


# ---------------- USERS ----------------

@app.route("/users")
def users():
    data = list(db.users.find({}, {"password": 0}))
    for u in data:
        u["_id"] = str(u["_id"])
    return jsonify(data)


# ---------------- HISTORY ----------------

@app.route("/history")
def history():
    data = list(db.requests.find({"status": "Donor Assigned"}))
    for r in data:
        r["_id"] = str(r["_id"])
    return jsonify(data)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)



# ---------------- RUN ----------------

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
let role = localStorage.getItem("role");

document.getElementById("roleTitle").innerText =
    role.toUpperCase() + " Login";

function showRegister(){
    document.getElementById("registerBox").style.display = "block";
}

function register(){
    fetch("/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            name:rname.value,
            email:remail.value,
            password:rpass.value,
            role:localStorage.getItem("role")
        })
    })
    .then(res=>res.json())
    .then(d=>{
        alert("Registered successfully!");
        window.location = "/login";   // ✅ redirect to login
    });
}

function login(){
    fetch("/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            email:email.value,
            password:password.value
        })
    })
    .then(res=>res.json())
    .then(d=>{
        if(d.role==="user") location="/user";
        else if(d.role==="donor") location="/donor";
        else alert("Invalid login");
    });
}

function showStatus(){
    document.getElementById("requestForm").style.display = "none";
    document.getElementById("statusBox").style.display = "block";

    loadStatus();  // 🔥 IMPORTANT
}
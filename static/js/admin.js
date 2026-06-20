// SWITCH SECTIONS
function showSection(id){
    document.querySelectorAll(".section").forEach(s => s.style.display="none");
    document.getElementById(id).style.display = "block";

    if(id==="requests") loadRequests();
    if(id==="donors") loadDonors();
    if(id==="users") loadUsers();
    if(id==="history") loadHistory();
}


// ---------------- REQUESTS ----------------

function loadRequests(){
    fetch("/requests")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("requestList");
        list.innerHTML="";

        if(data.length===0){
            list.innerHTML="<li>No requests</li>";
            return;
        }

        data.forEach(r=>{
            list.innerHTML += `
                <li>
                    <b>${r.blood_group}</b> - ${r.city} <br>
                    Status: ${r.status} <br>

                    <img src="/uploads/${r.proof}" width="80"><br>

                    <button onclick="approve('${r._id}')">Approve</button>
                    <button onclick="reject('${r._id}')">Reject</button>
                    <button onclick="assign('${r._id}')">Assign Donor</button>
                </li><br>
            `;
        });
    });
}


// ---------------- ACTIONS ----------------

function approve(id){
    fetch("/approve",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id})
    }).then(()=>loadRequests());
}

function reject(id){
    fetch("/reject",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id})
    }).then(()=>loadRequests());
}

function assign(id){
    let donor = prompt("Enter donor name:");

    fetch("/assign",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id, donor})
    }).then(()=>loadRequests());
}


// ---------------- DONORS ----------------

function loadDonors(){
    fetch("/donors")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("donorList");
        list.innerHTML="";

        data.forEach(d=>{
            list.innerHTML += `<li>${d.name} - ${d.blood_group} (${d.city})</li>`;
        });
    });
}


// ---------------- USERS ----------------

function loadUsers(){
    fetch("/users")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("userList");
        list.innerHTML="";

        data.forEach(u=>{
            list.innerHTML += `<li>${u.name} (${u.role})</li>`;
        });
    });
}


// ---------------- HISTORY ----------------

function loadHistory(){
    fetch("/history")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("historyList");
        list.innerHTML="";

        data.forEach(r=>{
            list.innerHTML += `
                <li>
                    ${r.blood_group} - ${r.city} 
                    (Donor: ${r.donor || "N/A"})
                </li>
            `;
        });
    });
}
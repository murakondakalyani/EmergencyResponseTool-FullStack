const API = "http://127.0.0.1:5000";

function registerDonor() {
    fetch(API + "/donor/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name.value,
            blood_group: blood.value,
            area: area.value,
            city: city.value
        })
    }).then(res => res.json())
      .then(data => alert(data.msg));
}

// REGISTER DONOR
document.getElementById("donorForm").onsubmit = function(e){
    e.preventDefault();

    let data = Object.fromEntries(new FormData(this));

    fetch("/donor/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(d=> alert("Donor Registered"));
};

// LOAD REQUESTS
function loadRequests(){
    fetch("/requests")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("requestList");
        list.innerHTML="";

        data.forEach(r=>{
            list.innerHTML += `
                <li>
                    ${r.blood_group} - ${r.city}
                    <button onclick="acceptRequest('${r.city}')">Accept</button>
                </li>
            `;
        });
    });
}

// ACCEPT REQUEST
function acceptRequest(city){
    fetch("/accept", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({city})
    })
    .then(()=> alert("Accepted"));
}
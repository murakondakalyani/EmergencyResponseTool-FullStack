document.getElementById("form").onsubmit = async (e)=>{
    e.preventDefault();

    let data = new FormData(e.target);

    await fetch("/request", {
        method:"POST",
        body:data
    });

    alert("Request sent");
};

fetch("/requests")
.then(res=>res.json())
.then(data=>{
    let list = document.getElementById("list");
    data.forEach(r=>{
        list.innerHTML += `<li>${r.blood_group} - ${r.status}</li>`;
    });
});

document.getElementById("requestForm").onsubmit = function(e){
    e.preventDefault();   // 🚀 THIS IS MOST IMPORTANT

    let data = new FormData(this);

    fetch("/request", {
        method: "POST",
        body: data
    })
    .then(res => res.json())
    .then(d => {
        alert("Request submitted successfully!");

        // OPTIONAL: switch to status automatically
        showStatus();
    })
    .catch(err => console.log(err));
};

// LOAD STATUS
function loadStatus(){
    fetch("/requests")
    .then(res=>res.json())
    .then(data=>{
        let list = document.getElementById("statusList");
        list.innerHTML = "";

        if(data.length === 0){
            list.innerHTML = "<li>No requests found</li>";
            return;
        }

        data.forEach(r=>{
            list.innerHTML += `
                <li>
                    <b>${r.blood_group}</b> - ${r.city} <br>
                    Status: <span style="color:yellow">${r.status}</span>
                </li><br>
            `;
        });
    })
    .catch(err=>{
        console.log(err);
    });
}
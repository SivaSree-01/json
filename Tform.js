function addData() {
    var name = document.getElementById("name");
    var phno = document.getElementById("phno");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var state = document.getElementById("state");

    postData(name, phno, address, city, state);
}

function postData(name, phno, address, city, state) {
    if (name.value.trim() === "" || phno.value.trim() === "" || address.value.trim() === "" || city.value.trim() === "" || state.value.trim() === "") {
        alert("Fill the data");
        return;
    }

    var url = "https://snow-glimmer-rayon.glitch.me/users";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: name.value, 
            phno: phno.value, 
            address: address.value, 
            city: city.value, 
            state: state.value 
        })
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                console.log("Data added");
                
               
                name.value = "";
                phno.value = "";
                address.value = "";
                city.value = "";
                state.value = "";

                displayData();  
            }
        })
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
        });
}

function displayData() {
    var container = document.getElementById("container");
    container.innerHTML = "";  

    fetch("https://snow-glimmer-rayon.glitch.me/users")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); 

            if (data.length === 0) {
                container.innerHTML = "<p>No data available</p>";
            } else {
                for (var obj of data) {
                    var item = document.createElement("div");
                    item.className = "item m-2 p-2 border border-3 border-info fs-5 text-capitalize";

                    var namePara = document.createElement("p");
                    var phnoPara = document.createElement("p");
                    var addressPara = document.createElement("p");
                    var cityPara = document.createElement("p");
                    var statePara = document.createElement("p");

                    var { name, phno, address, city, state } = obj;

                    namePara.innerText = `Name: ${name}`;
                    phnoPara.innerText = `Phone: ${phno}`;
                    addressPara.innerText = `Address: ${address}`;
                    cityPara.innerText = `City: ${city}`;
                    statePara.innerText = `State: ${state}`;

                    item.appendChild(namePara);
                    item.appendChild(phnoPara);
                    item.appendChild(addressPara);
                    item.appendChild(cityPara);
                    item.appendChild(statePara);
                    container.appendChild(item);
                }
            }
        })
        .catch(err => console.error("Error fetching data:", err));
}

displayData();

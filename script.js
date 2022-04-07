// Variable declaration. Some on window load to catch DOM Elements
window.onload = function() {
    const loading = document.getElementById("loading");
    const hitsAmount = document.getElementById("hitsAmount");
    const tables = document.getElementById("tables");
}

// Loading-animation functions
function showLoading() {
    loading.style.display = "flex";
}
function hideLoading() {
    loading.style.display = "none";
}


// API call. Returns data from API.
let info; // Variable for fetched data (not used, consider deleting)
async function fetchInfo(name) {
    showLoading();
    let url = "https://code-challenge.stacc.dev/api/pep?name=" + name;
    
    const response = await fetch(url);
    const data = await response.json();
    hideLoading();
    console.log("Data received");
    info = data;
    console.log(data);

    return data;
}


// Search function. Runs on button click or enter key.
async function search(event) {
    input = document.getElementById("searchInput").value;

    if (event.key == "Enter" || event == "btn") {
        const response = await fetchInfo(input);
        const hitsNum = response.numberOfHits;
        tables.innerHTML = "";
        $('#tablesCont').addClass("border");

        if (hitsNum === 0) {
            hitsAmount.innerText = "Ingen treff";
        }
        else {
            hitsAmount.innerText = "Antall treff: " + hitsNum;
            
            for (let hits = 0; hits < hitsNum; hits++) {
                createTable(response.hits[hits], "#tables");
            }
        }
    }
}


// Function for constructing table from JSON
function createTable(data, selector) {
    let table = $('<table/>');
    table.append($('<tbody/>'));

    // adding Bootstrap classes
    table.addClass("table");
    table.addClass("table-hover");
    table.addClass("table-bordered");
    table.addClass("table-dark")

    for (const key in data) {
        let header = key;
        let value = data[key]
        
        let row = $('<tr/>');
        row.append($('<th/>').html(header));
        row.append($('<td/>').html(value));
        table.append(row);
    }

    $(selector).append(table);
}
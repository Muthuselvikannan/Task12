
function fetchCountryData() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "https://restcountries.com/v3.1/all";
        request.open('GET', url, true);
        request.responseType = 'json';
        request.onerror = function() {
            reject("Something went wrong with the API");
        };
        request.onload = function() {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject("Something went wrong with the API");
            }
        };
        request.send();
    });
}


function populateDropdown(data) {
    var select = document.getElementById('country');
    data.sort(function(a, b) {
        return a.name.common.localeCompare(b.name.common);
    });
    for (let i = 0; i < data.length; i++) {
        var opt = document.createElement('option');
        opt.text = data[i].name.common;
        opt.value = data[i].name.common;
        select.add(opt);
    }
    select.onchange = function() {
        getDetails(data);
    };
}


function getDetails(data) {
    var select = document.getElementById('country');
    var selectedOption = select.options[select.selectedIndex].text;
    for (let i = 0; i < data.length; i++) {
        if (selectedOption === data[i].name.common) {
            var countryData = data[i];
            document.getElementById('flag').src = countryData.flags.png;
            document.getElementById('capital').innerHTML = countryData.capital[0];
            document.getElementById('region').innerHTML = countryData.region;
            document.getElementById('latlng').innerHTML = `Latitude : ${countryData.latlng[0].toFixed(2)} Longitude : ${countryData.latlng[1].toFixed(2)}`;
            document.getElementById('name').innerHTML = `Name : ${countryData.currencies[Object.keys(countryData.currencies)[0]].name}`;
            document.getElementById('symbol').innerHTML = `Symbol : ${countryData.currencies[Object.keys(countryData.currencies)[0]].symbol}`;
        }
    }
}


fetchCountryData()
    .then(function(data) {
        populateDropdown(data);
    })
    .catch(function(err) {
        console.log(err);
    });

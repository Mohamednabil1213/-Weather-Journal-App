// Global variables
const apiKey = `2921871a0e3f464b70033de591ff9728&units=imperial`;
const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
let d = new Date();
let newDate = `${let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()}`;
/* Function to POST data */
document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    if (zipCode.length == 0) {
        alert("Please, enter the zipcode");
    } else {
        // get data from api
        getWeatherData(baseURL, zipCode, apiKey).then((data) => {
            // post data to server
            postData("http://localhost:8000/addWeather", {
                temperature: data,
                date: newDate,
                userResponse: feeling,
            });
        });
        // call update ui
        .then(function() {
          updatingUI()
    }
}
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(`Temperature: ${data.main.temp}`);
        return data.main.temp;
    } catch (error) {
        console.log("Error: ", error);
    }
};
// async post data
const postData = async (url = {}, data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error: ", error);
    }
};
const updateUi = async () => {
    const request = await fetch("http://localhost:8000/all");
    try {
        const all = await request.json();
        document.getElementById("date").innerHTML = all.date;
        document.getElementById("temp").innerHTML = all.temperature;
        document.getElementById("content").innerHTML = all.userResponse;
    } catch (error) {
        console.log("Error: " + error);
    }
};
//end of project

const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("city");
const city_name = document.getElementById("city_name");

const temp_value = document.getElementById("temp_value");
const temp_status = document.getElementById("temp_status");

const dataHideLayer = document.querySelector(".data_hide");


const getInfo = async(event) => {

    let cityValue = city.value;
    event.preventDefault();
    if ( cityValue === "" ) {

        city_name.innerText = "Please enter some name first";

        dataHideLayer.classList.add("data_hide");
    } else {
        
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=b03545f053e55f9e29fcd0588c43a7ef&units=metric`;
            const response = await fetch(url);
            const data =await response.json();
            const arrayData = [data];

            city_name.innerText = `${arrayData[0].name}, ${arrayData[0].sys.country}`;
            temp_value.innerText = arrayData[0].main.temp;
            const responseTempStatus = arrayData[0].weather[0].main;

            if ( responseTempStatus == "Clear" ) {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color : #eccc68;'></i>";
            } else if ( responseTempStatus == "Clouds" ) {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color : #f1f2f6;'></i>";
            } else if ( responseTempStatus == "Rains" ) {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color : #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color : #eccc68;'></i>";
            }

            //remove class on getting data
            dataHideLayer.classList.remove("data_hide");
        } catch {
            city_name.innerText = "Please enter correct values";
            dataHideLayer.classList.add("data_hide");
        }

    }
}

submitBtn.addEventListener('click',getInfo);
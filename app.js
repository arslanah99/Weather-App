window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimeZone = document.querySelector('.location-timezone')
    let degreeSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector('.degree-section span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/fcfdc36ca2fc60331f565d0eed275a2d/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimeZone.textContent = data.timezone
                //FORMULA
                let celsius = (temperature - 32) * (5/9);
                //set icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temp from C to F
                degreeSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                    } else {
                        temperatureSpan.textContent = "F";
                    }
                })
            })
        });
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});
//Current Year
// d = new Date()
// const year = d.getFullYear()
// const copyright = document.getElementById('copyright');
// copyright.innerHTML = year

document.querySelector('button').addEventListener('click', function () {

    let location = document.querySelector('input').value  
    let params = document.querySelector('section');

    

fetch(`/weather?location=${location}`).then((res) => {res.json().then((data) => {
    if (data.error) {
        console.log(data.error)
    } else {
        let forecast = data.forecast
        console.log(params)
        params.classList.remove('hide')
        document.getElementById('location-name').innerHTML = forecast.name
        document.getElementById('location-region').innerHTML = forecast.region
        document.getElementById('current-temperature').innerHTML = forecast.temperature
        document.getElementById('current-feelslike').innerHTML = forecast.feelslike
        document.getElementById('current-description').innerHTML = forecast.description

    }})
    
})
})



const getWeather = (location) => {
  fetch(`/weather?location=${encodeURIComponent(location)}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(weatherData => {
      console.log("Full API Response:", weatherData);
      // ...existing code to update DOM elements...

	  // Update Temperature Card
		    document.getElementById('temp').innerHTML = `${weatherData.current_observation.condition.temperature}°F`;
            document.getElementById('wind').innerHTML = `Wind Flow: ${weatherData.current_observation.wind.speed} mph`;
            document.getElementById('chill').innerHTML = `:  ${weatherData.current_observation.wind.chill}°F`;
            document.getElementById('direction').innerHTML = `:  ${weatherData.current_observation.wind.direction}°`;
            document.getElementById('speed').innerHTML = `:  ${weatherData.current_observation.wind.speed} mph`;
            document.getElementById('humidity').innerHTML = `:  ${weatherData.current_observation.atmosphere.humidity}%`;
            document.getElementById('visibility').innerHTML = `:  ${weatherData.current_observation.atmosphere.visibility} mi`;
            // document.getElementById('pressure').innerHTML = `${weatherData.atmosphere.pressure} in`;
            document.getElementById('tempe').innerHTML = `:  ${weatherData.current_observation.condition.temperature}°F`;

			// Update Location Card
			document.getElementById('city').innerText = `:  ${weatherData.location.city}`;
            document.getElementById('country').innerText = `:  ${weatherData.location.country}`;
            document.getElementById('lat').innerText = `:  ${weatherData.location.lat}°`;
            document.getElementById('long').innerText = `:  ${weatherData.location.long}°`;
            document.getElementById('sunrise').innerText = `:  ${weatherData.current_observation.astronomy.sunrise}`;
            document.getElementById('sunset').innerText = `:  ${weatherData.current_observation.astronomy.sunset}`;

			// Update Forecast Card With Date formating(for 2 days)
			const forecasts = weatherData.forecasts;
			const formatDate = (timestamp) => {
				return new Date(timestamp * 1000).toLocaleDateString('en-US', {
					weekday: 'short',
         		    month: 'short',
          			day: 'numeric',
          			year: 'numeric'
				});
			}; 

			if (forecasts && forecasts.length >= 2) {
			  // Day 1
			  document.getElementById('day').innerText = `:  ${forecasts[0].day}`;
			  document.getElementById('date').innerText = `:  ${formatDate(forecasts[0].date)}`;
			  document.getElementById('high').innerText = `:  ${forecasts[0].high}°F`;
			  document.getElementById('low').innerText = `:  ${forecasts[0].low}°F`;
			  document.getElementById('text').innerText = `:  ${forecasts[0].text}`;
			  document.getElementById('code').innerText = `:  ${forecasts[0].code}`;

			  // Day 2
			  document.getElementById('day2').innerText = `:  ${forecasts[1].day}`;
			  document.getElementById('date2').innerText = `:  ${formatDate(forecasts[1].date)}`;
			  document.getElementById('high2').innerText = `:  ${forecasts[1].high}°F`;
			  document.getElementById('low2').innerText = `:  ${forecasts[1].low}°F`;
			  document.getElementById('text2').innerText = `:  ${forecasts[1].text}`;
			  document.getElementById('code2').innerText = `:  ${forecasts[1].code}`;
			} else {
			  console.error('Insufficient forecasts data');
			}
	  
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
};
	
		
 
  
  // Test with a location

  let buttons = document.getElementById("submit");
  let Cityname = document.getElementById("cityname");
  
  function newcity (event){
	  event.preventDefault();
	  Cityname.innerHTML = document.getElementById("search").value
	//   getWeather(document.getElementById("search").value)
		getWeather(Cityname.innerHTML)	

  }
  buttons.addEventListener('click', newcity)



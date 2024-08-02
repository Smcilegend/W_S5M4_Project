async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  // Task 1: Set the footer text content to show the current year.
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // Task 2: Define weather descriptions.
  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ];

  // Task 3: Hide the weather widget initially.
  document.querySelector('#weatherWidget').style.display = 'none';

  // Task 4: Add an event listener to the #citySelect dropdown.
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('selection changed');
    try {
      // Task 5: When the selection changes, disable the dropdown.
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled');
      document.querySelector('#weatherWidget').style.display = 'none';
      document.querySelector('.info').textContent = 'Fetching weather data...';

      console.log(evt.target.value);
      let city = evt.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;

      const res = await axios.get(url);

      document.querySelector('#weatherWidget').style.display = 'block';
      document.querySelector('.info').textContent = '';
      evt.target.removeAttribute('disabled');

      let { data } = res;

      document.querySelector('#apparentTemp div:nth-child(2)')
        .textContent = `${data.current.apparent_temperature}`;
      document.querySelector('#todayDescription')
        .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector('#todayStats div:nth-child(1)')
        .textContent = `${data.current.apparent_temperature_min} / ${data.current.temperature_max}`;
      document.querySelector('#todayStats div:nth-child(2)')
        .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      document.querySelector('#todayStats div:nth-child(3)')
        .textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector('#todayStats div:nth-child(4)')
        .textContent = `Wind: ${data.current.wind_speed} m/s`;

        data.forecast.daily.forEach((day, idx) => {
          let card = document.querySelectorAll('.next-day')[idx]

          let weekDay = card.children[0]
          let apparent = card.children[1]
          let minMax = card.children[2]
          let precipit = card.children[3]

          weekDay.textContent = day.date
          apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
          mixMax.textContent = `${day.temperature_min} /${day.temperature_max}`
          precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
        })
        document.querySelector('#location').firstElementChild.textContent = data.location.city

    } catch (err) {
      console.error('Error disabling the select element:', err.message);
    }
  });

  function getWeekDay(data){
    return date
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 };
else moduleProject4();


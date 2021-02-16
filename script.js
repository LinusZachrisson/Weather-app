window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let city = document.querySelector(".city");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=77183e339754431b9494ef1d8558588f`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.data[0]);
          const { app_temp, timezone, city_name } = data.data[0];
          const { description } = data.data[0].weather;

          tempDegree.textContent = app_temp;
          tempDescription.textContent = description;
          locationTimezone.textContent = timezone;
          city.textContent = city_name;

          var skycons = new Skycons({ color: "white" });
          skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
          skycons.play();
        });
    });
  }
});

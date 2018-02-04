var API_KEY = "8c4ef766274d662c379e7f1cb93aef14";

$(document).ready(function() {

  $.getJSON('https://ipinfo.io', function(location) {
    console.log(location);

    $('#city').html(location.city + ', ' + location.region + ', ' + location.country);

    var api_url ='https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + location.city + ',' + location.country + '&appid=8c4ef766274d662c379e7f1cb93aef14&units=metric&callback=';
    console.log(api_url)
     $.getJSON(api_url, function(weather) {
      console.log(weather);

      var temperature = Math.round(weather.main.temp);
      $('#temperature').html(temperature + '°');
      var fahrenheittemp = Math.round(temperature * 9 / 5 + 32);
      $('#weather').html(weather.weather[0].description);

      var icon = weather.weather[0].icon;

      var iconSrc = "http://openweathermap.org/img/w/" + icon +
          ".png";
      $('#weatherdiv').prepend('<img src=' + iconSrc + '></img>');



      $('.unittoggle').click(function() {
        fahrenheit();
      })
      $('.celsius').click(function() {
        celsius();
      })

      function fahrenheit() {
        $('#temperature').html(fahrenheittemp + '°');
        $('.unittoggle').html('Celsius');
        $('.unittoggle').addClass('.celsius');
        $('.unittoggle').removeClass('.unittoggle');
      }

      function celsius() {
        $('#temperature').html(temperature + '°');
        $('.unittoggle').html('Celsius');
        $('.unittoggle').addClass('.unittoggle');
        $('.unittoggle').removeClass('.celsius');
      }

    })
  })
})


function sharetweet() {
  window.open("https://twitter.com/intent/tweet?text=Check%20out%20this%20local%20weather%20app%20at%20https://codepen.io/azbo400/pen/dpBOwG");
}
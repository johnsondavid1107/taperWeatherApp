$(document).ready(function () {

    var searchBtn = $(".searchBtn");
    var date = (moment().format("L"));

    searchBtn.on("click", function () {
        var appID = "6505ade685218bab7b6f73f294ad0301";
        var cityName = $(".inputF").val();

        var newEntry = ($(".inputF").val());
        var newLiItem = $("<li>");
        newLiItem.addClass("list-group-item");
        newLiItem.text(newEntry);
        $("#place").prepend(newLiItem);

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appID;
        $("input").val("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var humidity = response.main.humidity;
            var windS = response.wind.speed;
            var img = response.weather[0].icon;
            var imgTag = $("<img>");
            var imgUrl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
            imgTag.attr("src", imgUrl);
            console.log(imgTag);
            console.log(img);
            console.log(response);

            $(".city").text(cityName + " " + " " + "(" + date + ")");
            $(".city").append(imgTag);
            $(".temp").text("Current Tempeture: " + tempF.toFixed(0) + "°");
            $(".humidity").text("Humidity: " + humidity + "%");
            $(".windS").text("Wind Speed: " + windS + "m/s");

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            $.ajax({
                url: uviURL,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value
                $(".uVI").text("UV Index: " + uvIndex);
                console.log(response.value);

                if (uvIndex < 3) {
                    $(".uVI").addClass("badge badge-success")
                } else if (uvIndex > 3 && uvIndex < 8) {
                    $(".uVI").addClass("badge badge-warning")
                } else {
                    $(".uVI").addClass("badge badge-danger")
                }

                console.log($(".uVI").val());

                console.log(uvIndex);

                var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + appID;

                $.ajax({
                    url: fiveDayUrl,
                    method: "GET"
                }).then(function (response) {
var simplifiedFiveDayForecast = []
                    for (var i = 0; i < 5; i++) {
                        var oneDayForecast = {}
                        var fiveDayTemp = (response.daily[i].temp.max - 273.15) * 1.80 + 32;
                        date = (moment().add(i, 'day').format("L"));

                        $("#" + i).html(date + "<br>" + "Tempeture: " + fiveDayTemp.toFixed(0) + "°" + "<br>" + "Humidity: " + response.daily[i].humidity + "%");
                        // $(".fiveDayDate").each()
                        // $(".fiveDayDate").text(date);
                    oneDayForecast.fiveDayTemp = fiveDayTemp
                    oneDayForecast.date = date
                    oneDayForecast.humidity = response.daily[i].humidity
                    simplifiedFiveDayForecast.push(oneDayForecast);
                    }

                    // var fiveDayImgTag = $("<img>");
                    // fiveDayImgTag.attr("src",imgUrl);

                    var fiveDayContent = $(".fiveDay");
                    fiveDayContent.addClass("card bg-primary text-white text-center p-3 data");
                    $(".fiveDayDate").text();
                    // $(".fiveDayDate").append(fiveDayImgTag);

                    // console.log(response)

                    var history = {
                        city: cityName,
                        tempeture: tempF,
                        humidity: humidity,
                        windS: windS,
                        uvIndex: uvIndex,
                        fiveDayForecast: simplifiedFiveDayForecast

                    }


                    localStorage.setItem("History", JSON.stringify(history));


                    console.log(history);
                })

            });

        });

    });

    var lastCity = JSON.parse(localStorage.getItem("History"));

    // $(".city").text(lastCity);

    console.log(lastCity);
    // console.log(lastCity.city);



///Paolo Onclick the list element 






    // card bg-primary text-white text-center p-3 data









})












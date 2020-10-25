$(document).ready(function () {

    var searchBtn = $(".searchBtn");
    var date = (moment().format("L"));
    console.log(date);
    var appID = "6505ade685218bab7b6f73f294ad0301";

    searchBtn.on("click", function process() {

        var cityName = $(".inputF").val();
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

        var newEntry = ($(".inputF").val());
        var newLiItem = $("<li>");
        newLiItem.addClass("list-group-item superHover");
        newLiItem.attr("id", "doIT");
        newLiItem.text(newEntry);
        $("#place").prepend(newLiItem);
        $(".city").text(cityName + " " + " " + "(" + date + ")");
        console.log(date);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appID;
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
            var imgUrl = "https://openweathermap.org/img/wn/" + img + "@2x.png";
            imgTag.attr("src", imgUrl);
            console.log(imgTag);
            console.log(img);
            console.log(response);
            console.log(date);

            
            $(".city").append(imgTag);
            $(".temp").text("Current Tempeture: " + tempF.toFixed(0) + "°");
            $(".humidity").text("Humidity: " + humidity + "%");
            $(".windS").text("Wind Speed: " + windS + "m/s");

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            $.ajax({
                url: uviURL,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value
                $("#colorChange").text("UV Index: " + uvIndex);

                if (uvIndex < 3) {
                    $("#colorChange").attr("class", "badge badge-success")
                } else if (uvIndex > 3 && uvIndex < 8) {
                    $("#colorChange").attr("class", "badge badge-warning")
                } else {
                    $("#colorChange").attr("class", "badge badge-danger")
                }

                var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + appID;

                $.ajax({
                    url: fiveDayUrl,
                    method: "GET"
                }).then(function (response) {
                    var simplifiedFiveDayForecast = []
                    for (var i = 1; i < 6; i++) {
                        var oneDayForecast = {}
                        var fiveDayTemp = (response.daily[i].temp.max - 273.15) * 1.80 + 32;
                        var fiveDayIcon = response.daily[i].weather[0].icon;
                        var fiveImgTag = $("<img>");
                        var fiveImgUrl = "https://openweathermap.org/img/wn/" + fiveDayIcon + "@2x.png";
                        var fiveDayDate = (moment().add(i, 'day').format("L"));


                        $("#" + i).html(fiveDayDate + "<br>" + "Tempeture: " + fiveDayTemp.toFixed(0) + "°" + "<br>" + "Humidity: " + response.daily[i].humidity + "%" + "<br>");
                        fiveImgTag.attr("src", fiveImgUrl);
                        $("#" + i).append(fiveImgTag);
                        console.log(fiveImgUrl);
                        oneDayForecast.fiveDayTemp = fiveDayTemp
                        oneDayForecast.date = fiveDayDate
                        oneDayForecast.humidity = response.daily[i].humidity
                        oneDayForecast.icon = fiveDayIcon;
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
                        temperture: tempF,
                        humidity: humidity,
                        windS: windS,
                        uvIndex: uvIndex,
                        fiveDayForecast: simplifiedFiveDayForecast

                    }


                    localStorage.setItem("History", JSON.stringify(history));


                    console.log(history.humidity);
                })

            });

        });

    });

    var lastCity = JSON.parse(localStorage.getItem("History"));
    console.log(lastCity);

    $(".city").html("The last searched city was: " + "<br>" + lastCity.city + "<br>" +" on " + date);


    $(".temp").text("Current Temperture: " + lastCity.temperture.toFixed(0) + "°");
    $(".humidity").text("Humidity: " + lastCity.humidity + "%");
    $(".windS").text("Wind Speed: " + lastCity.windS + "m/s");
    $("#colorChange").text("UVI Index: " + lastCity.uvIndex)

    if (lastCity.uvIndex < 3) {
        $("#colorChange").attr("class", "badge badge-success")
    } else if (lastCity.uvIndex > 3 && lastCity.uvIndex < 8) {
        $("#colorChange").attr("class", "badge badge-warning")
    } else {
        $("#colorChange").attr("class", "badge badge-danger")
    }

    for (var i = 1; i < 6; i++) {


        var fiveImgTag = $("<img>");
        var fiveImgUrl = "https://openweathermap.org/img/wn/" + lastCity.fiveDayForecast[i-1].icon + "@2x.png";
        var postDate = (moment().add(i, 'day').format("L"));
       


        $("#" + i).html(postDate + "<br>" + "Temperture: " + lastCity.fiveDayForecast[i-1].fiveDayTemp.toFixed(0) + "°" + "<br>" + "Humidity: " + lastCity.fiveDayForecast[i-1].humidity + "%" + "<br>");
        fiveImgTag.attr("src", fiveImgUrl);
        $("#" + i).append(fiveImgTag);


    }

    $(".fiveDay").addClass("card bg-primary text-white text-center p-3 data");

    $("#place").on("click", "li", function () {

        console.log($(this).text())
        var cityName = $(this).text()

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appID;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var humidity = response.main.humidity;
            var windS = response.wind.speed;
            var img = response.weather[0].icon;
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var imgTag = $("<img>");
            var imgUrl = "https://openweathermap.org/img/wn/" + img + "@2x.png";
            imgTag.attr("src", imgUrl);
            console.log(imgTag);
            console.log(img);
            console.log(response);

            $(".city").text(cityName.charAt(0).toUpperCase() + cityName.slice(1)+ " " + " " + "(" + date + ")");
            $(".city").append(imgTag);
            $(".temp").text("Current Tempeture: " + tempF.toFixed(0) + "°");
            $(".humidity").text("Humidity: " + humidity + "%");
            $(".windS").text("Wind Speed: " + windS + "m/s");

            var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + appID;
            $.ajax({
                url: fiveDayUrl,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < 5; i++) {
                    console.log(response);

                    var fiveDayTemp = (response.daily[i].temp.max - 273.15) * 1.80 + 32;
                    var fiveDayIcon = response.daily[i].weather[0].icon;
                    var fiveImgTag = $("<img>");
                    var fiveImgUrl = "https://openweathermap.org/img/wn/" + fiveDayIcon + "@2x.png";
                    date = (moment().add(i, 'day').format("L"));


                    $("#" + i).html(date + "<br>" + "Tempeture: " + fiveDayTemp.toFixed(0) + "°" + "<br>" + "Humidity: " + response.daily[i].humidity + "%" + "<br>");
                    fiveImgTag.attr("src", fiveImgUrl);
                    $("#" + i).append(fiveImgTag);

                }



            })






        })


        //Doesnt work.  Causes the last class read to overide current color. 

        // if (lastCity.uvIndex < 3) {
        //     $(".uVI").addClass("badge badge-success")
        // } else if (lastCity.uvIndex > 3 && lastCity.uvIndex < 8) {
        //     $(".uVI").addClass("badge badge-warning")
        // } else {
        //     $(".uVI").addClass("badge badge-danger")
        // }

        // $(".city").text(lastCity);

        console.log(lastCity);
        // console.log(lastCity.city);




        // $("body").on("click", function () {
        //     if ($(this) == $("li"));
        //     console.log("This worked");

        // });



        ///Paolo Onclick the list element 






        // card bg-primary text-white text-center p-3 data




    })

})
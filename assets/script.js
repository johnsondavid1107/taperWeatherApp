$(document).ready(function () {

    var searchBtn = $(".searchBtn");
    var date = (moment().format("L"));


    searchBtn.on("click", function () {
        var newEntry = ($(".inputF").val());
        var newLiItem = $("<li>");
        newLiItem.addClass("list-group-item");
        newLiItem.text(newEntry);
        $("#place").prepend(newLiItem);

    });





    searchBtn.on("click", function () {
        var appID = "6505ade685218bab7b6f73f294ad0301";



        var cityName = $(".inputF").val();
        console.log(cityName);
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appID;
        $("input").val("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
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
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".windS").text("Wind Speed: " + response.wind.speed + "m/s");


            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            $.ajax({
                url: uviURL,
                method: "GET"
            }).then(function (response) {
                $(".uVI").text("UV Index: " + response.value);
                console.log(response.value);


            });



        });




    });








































});
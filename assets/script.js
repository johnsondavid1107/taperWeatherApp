$(document).ready(function () {

    var searchBtn = $(".searchBtn");
    var date = (moment().format("L"));


    searchBtn.on("click", function () {
        var newEntry = ($(".inputF").val());
        var newLiItem = $("<li>");
        newLiItem.addClass("list-group-item");
        newLiItem.text(newEntry);
        $("#place").append(newLiItem);
        
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
            
            $(".city").text(cityName + " " + " " + "(" + date + ")");
            $(".temp").text("Current Tempeture: " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);

        })




    });







































});
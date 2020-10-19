$(document).ready(function () {

    var searchBtn = $(".searchBtn");


    searchBtn.on("click", function (){
        var newEntry = ($("input").val());
        console.log(newEntry);
        var newLiItem = $("<li></li>");
        newLiItem.addClass("list-group-item");
        $(".list-group list-group-flush").append(newLiItem)
        newLiItem.append(newEntry);
        

       
       


    });














































});
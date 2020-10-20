$(document).ready(function () {

    var searchBtn = $(".searchBtn");


    searchBtn.on("click", function (){
        var newEntry = ($("input").val());
        var newLiItem = $("<li>");
        newLiItem.addClass("list-group-item");
        newLiItem.text(newEntry);
        $("#place").append(newLiItem);
       
        
        

       
       


    });














































});
$(document).ready(function(){
    $("#start-btn").on("click", function (req, res){
        console.log("clicked")
        window.location.replace("/game")
    })

    $("#logout-btn").on("click", function (req, res){
        console.log("clicked")
        window.location.replace("/logout")
    })

    $("#delete-btn").on("click", function (req, res){
        console.log("clicked")
        ///figure out how delete 
    })
});


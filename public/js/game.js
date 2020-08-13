//Function for game functionality
    //AJAX calls

    //For OpenTDB
        // const apiKey = "3ea8b303cd602013a12b5951a3aed1b054818b323040af7d2231ede668458f80";
        // var queryURL = "https://opentdb.com/api.php?amount=10";
        // URL to request new API Key because they are deleted after 6 hours of inactivity. Just run the link in the browser
            //https://opentdb.com/api_token.php?command=request 

    function callOpenTDb(q, id) {
        $.ajax({
            url: q,
            method: "GET",
            dataType: "jsonp"
        }).then(function(response) {

        })
    } 
//Function for game functionality
    //AJAX calls

    //For OpenTDB
        // const apiKey = "3ea8b303cd602013a12b5951a3aed1b054818b323040af7d2231ede668458f80";
        // var queryURL = "https://opentdb.com/api.php?amount=10";
        // URL to request new API Key because they are deleted after 6 hours of inactivity. Just run the link in the browser
            //https://opentdb.com/api_token.php?command=request 


     // creating div with questions and answers

    $(document).ready(function(){
        $("#quest-btn").on("click", function(){
            let queryURL ="https://opentdb.com/api.php?amount=10";
            let results =[];
            let quesDiv = $("#myQuestions");
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                let results = response.results;
                for (let i = 0; i < results.length; i++) {
                   let options = results[i].incorrect_answers;
                   options.push(results[i].correct_answer);
                   options.sort();
                   let newQuestions = $(`
                   <h3>Question: ${results[i].question}</h3>
                   <p>Choose answer: 
                   <ul>
                   <button class="btn btn-outline-warning btn-block">${results[i].incorrect_answers[0]} </button>
                   <button class="btn btn-outline-warning btn-block">${results[i].incorrect_answers[1]} </button>
                   <button class="btn btn-outline-warning btn-block">${results[i].incorrect_answers[2]} </button>
                   <button class="btn btn-outline-warning btn-block">${results[i].incorrect_answers[3]} </button>
                   </ul>
                   </p>
                   `);
                quesDiv.append(newQuestions)
                }
                
                console.log(results)
            })

        })
    })

    // creating logic to the correct answers and updating profile of user 









        // function callOpenTDb(q, id) {
        //     $.ajax({
        //         url: q,
        //         method: "GET",
        //         dataType: "jsonp"
        //     }).then(function(response) {

        //     })
        // } 
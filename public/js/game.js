$( document ).ready(() => {
    //Gloal variables set to 0 for score. Incrementers in code below with .right and .wrong click functions
    let rightAnswer = 0;
    let wrongAnswer = 0;
    //Button with ID to start API call to display 10 random questions
    $("#startGame").on("click", function() {
        let queryURL = "https://opentdb.com/api.php?amount=10";
        let results = [];
        let quesDiv = $("#questions");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let results = response.results;
            for (let i = 0; i < results.length; i++) {
                let options = results[i].incorrect_answers;
                options.push(results[i].correct_answer);
                options.sort();
            const buttons = options.map((option) => {
                if (option === results[i].correct_answer) {
                    return `<button class="ansBtns right button is-link">${option}</button>`
                } else {
                    return `<button class="ansBtns wrong button is-link">${option}</button>`
                }       
                //HTML generated dynamically         
                }).join("");
                let newQuestions = $(`
                <p>Category: ${results[i].category}</p>
                <h3>Question: ${results[i].question}</h3>
                <div id="button-group" class="field is-grouped>
                    <p class="control">
                        ${buttons}
                    </p>
                </div>
                `);
                quesDiv.append(newQuestions);
            };   
            $(".right").on("click", function() {
                console.log("correct");
                rightAnswer++;
                console.log(rightAnswer)

            });
            $(".wrong").on("click", function() {
                console.log("incorrect");
                wrongAnswer++;
                console.log(wrongAnswer)

            });
               
        });
        
    });   

});
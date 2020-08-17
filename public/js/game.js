$( document ).ready(() => {
    //Gloal variables set to 0 for score. Incrementers in code below with .right and .wrong click functions
    let rightAnswer = 0;
    let wrongAnswer = 0;
    // let startBtn = $("#startBtn");
    // let nextBtn = $("#nexBtn");
    //Button with ID to start API call to display 10 random questions
    $(".showQuestions").on("click", function() {
        let queryURL = "https://opentdb.com/api.php?amount=1";
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
                    return `<button type="submit" class="ansBtns right button is-link">${option}</button>`
                } else {
                    return `<button type="submit" class="ansBtns wrong button is-link">${option}</button>`
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
                console.log(`${results[0].category}`)
            });
            $(".wrong").on("click", function() {
                console.log("incorrect");
                wrongAnswer++;
                console.log(wrongAnswer)
                console.log(`${results[0].category}`)
            });              
        });         
    });   
    //Function to hide button that generates questions and display the Next button to generate the following questions. Tried declaring variables, for some reason this is the only way I would get it to work. 
    document.getElementById("startBtn").onclick = function() { 
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("nextBtn").classList.remove("hide");  
    };   

    //Click function to clear questions div
    document.getElementById("nextBtn").onclick = function() {
        clearContent()
    }

    //Function to clear questions div and show next question
    function clearContent() {
        document.getElementById("questions").empty();
    }
});
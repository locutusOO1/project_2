//Function for game functionality
    //AJAX calls

    //For OpenTDB
        // const apiKey = "3ea8b303cd602013a12b5951a3aed1b054818b323040af7d2231ede668458f80";
        // var queryURL = "https://opentdb.com/api.php?amount=10";
        // URL to request new API Key because they are deleted after 6 hours of inactivity. Just run the link in the browser
            //https://opentdb.com/api_token.php?command=request 


     // creating div with questions and answers
    $("#back-btn").on("click", function(){
        window.location.replace("/profile");
    })
    $(document).ready(function(){
        let answers = [];
        $("#quest-btn").on("click", function(){
            let queryURL ="https://opentdb.com/api.php?amount=10";
            // let results =[];
            let quesDiv = $("#myQuestions");
            answers = [];
            quesDiv.empty();
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
                   <h3 class="roll">Question ${i+1}: ${results[i].question}</h3>
                   <p>Choose answer:</p>`);
                   quesDiv.append(newQuestions)
                for (let j = 0; j < options.length; j++) {
                    if (options[j] === results[i].correct_answer) { 
                        let newAnswers = $(`<p><button class="answer ques${i} btn btn-primary btn-rounded roll" data-cat="${results[i].category}" data-right="right">${options[j]}</button></p>`);
                        quesDiv.append(newAnswers);
                    } else {
                        let newAnswers = $(`<p><button class="answer ques${i} btn btn-primary btn-rounded roll" data-cat="${results[i].category}" data-right="wrong">${options[j]}</button></p>`)
                        quesDiv.append(newAnswers);
                    }
                }
                $(".ques"+i).on("click",function(event){
                    // console.log(event.target);
                    // console.log($(this));
                    let found = false;
                    let classes = $(this)[0].classList;
                    for (let m = 0; m < answers.length; m++) {
                        if (answers[m][0] === classes[1]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        if ($(this).attr("data-right") === "right") {
                            $(this).addClass("btn-success");
                        } else {
                            $(this).addClass("btn-danger");
                        }
                        console.log($(this).attr("data-right"));
                        console.log($(this).attr("data-cat"));
                        console.log($(this)[0].classList);
                        let classes = $(this)[0].classList;
                        console.log(classes[1]);
                        answers.push([classes[1],$(this).attr("data-cat"),$(this).attr("data-right")]);
                        console.log(answers);
                    }

                    // $(classes[1]).prop("disabled",true);
                })
                }
               
                console.log(results)
            })

        })

    });

    // creating logic to the correct answers and updating profile of user 









        // function callOpenTDb(q, id) {
        //     $.ajax({
        //         url: q,
        //         method: "GET",
        //         dataType: "jsonp"
        //     }).then(function(response) {

        //     })
        // } 

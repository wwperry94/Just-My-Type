$(document).ready(function () {
    // Definitions
    let myInterval;
    let seconds = 0;
    let timeStart = true;
    const lC = $('#keyboard-lower-container');
    const uC = $('#keyboard-upper-container');
    let sentenceCounter = 0;
    let letterCounter = 0;
    let numberOfMistakes = 0;
    let my_div = $('#sentence');
    let rstBtn = $(`<button id="reset">Restart Game</button>`);
    rstBtn.css("background-color", getRandomColor)
    rstBtn.css("color", "#F5F5F5")
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate','Too ato too nOt enot one totA not anot tOO aNot','oat itain oat tain nate eate tea anne inant nean','itant eate anot eat nato inate eat anot tain eat','nee ene ate ite tent tiet ent ine ene ete ene ate'];
    $('#target-letter').css("color", "#F5F5F5");
    $('#sentence').css("color", "#F5F5F5");
   
    // Hide lowerCase Keyboard

    uC.hide();
    my_div.append(sentences[sentenceCounter]);
    $('#target-letter').append(sentences[sentenceCounter][letterCounter]);

    // Shift key shows upperCase Keyboard

    $(document).keydown(function (e) {
        let key = e.which;
        if (key == 16) {
            uC.show();
            lC.hide();
        };
    });

    // Highlight the key

    $(document).keypress(function (e) {
        $(`#${e.keyCode}`).css("background-color", getRandomColor)
        if (letterCounter < sentences[sentenceCounter].length) {
            if (e.key == sentences[sentenceCounter][letterCounter]) {
                // insert timer
                if (timeStart === true) {
                    myInterval = setInterval(() => {
                        // increments every 1000 milliseconds and posts to console
                        seconds++;
                        console.log("seconds: ", seconds);
                    }, 1000)
                };
                timeStart = false
                // *EXTRA* display timer whilst game is running
                $('.timer').empty();
                $('.timer').append("Seconds: " + seconds);
                $('.timer').css("color", "#F5F5F5")
                letterCounter++
                //clears letter display
                $('#target-letter').empty()
                // displays new letter prompt
                $('#target-letter').append(sentences[sentenceCounter][letterCounter]);
                //moves the highlight over current letter
                $('#yellow-block').css('left', '+=18px')
                console.log("e.key", e.key, letterCounter);
                //display when correct letter is pressed
                $('#feedback').append(`<span class="glyphicon glyphicon-ok"></span>`)
            } else {
                $('#feedback').append(`<span class="glyphicon glyphicon-remove"></span>`)
                numberOfMistakes++
                // logs mistakes for WPM calculator
                console.log("mistakes", numberOfMistakes)
            }
        } else {
            // as long as there is a 'next' sentence, clear current and display next when current is typed out comppletely
            my_div.empty()
            if (sentenceCounter + 1 !== undefined) {
                sentenceCounter++;
            };
            letterCounter = 0
            // resets our counters, highlighter position, and glyphicons for next new sentence prompt
            $('#target-letter').empty()
            $('#feedback').empty()
            $('#yellow-block').css('left', '5px')
            
            my_div.append(sentences[sentenceCounter]);
        };
    })

    // Unhighlight the key

    $(document).keyup(function (e) {
        let key = e.which;
        let asciiLetter = e.key.charCodeAt(0)
        $(`#${asciiLetter}`).css("background-color", "#F5F5F5")
        if (key == 16) {
            uC.hide();
            lC.show();
        };
        // Game Over Trigger
        let wpm = (52 / (seconds / 60) - 2 * numberOfMistakes)
        // logic for telling when the final letter of final sentence is typed
        if (sentences[sentenceCounter] === undefined) {
            // timer 'stop'
            clearInterval(myInterval);
            // clears out our checks and X's, our timer, letters, etc...
            $("#prompt-container").empty();
            // show our 'score'
            $('#prompt-container').css("text-align", "center");
            $('#prompt-container').css("color", "#F5F5F5")
            $('#prompt-container').append("Type Test Complete!");
            $('#prompt-container').append('<br/>');
            $('#prompt-container').append("Words per Minute ", wpm);
            $('#prompt-container').append('<br/>');
            // display our option to reset the 'game'
            $("#prompt-container").append(rstBtn);
            // confirm or cancel option
            rstBtn.click(function (e) {
                if (window.confirm("Do you want to play a game?")) {
                    // command for refreshing the page
                    location.reload();
                };
            });
        };
    });


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };




















});
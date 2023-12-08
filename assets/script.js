var timerCount = document.querySelector('.timer-count');
var gamesPlayed = document.querySelector('.games-played');
var resetButton = document.querySelector('.reset');
var stopButton = document.querySelector('.stop-button');
var questionBay = document.getElementById('question-bay');
var tally = document.getElementById('tally');
var endGameDisplay = document.getElementById('end-game-display');
var leaderboardBay = document.getElementById('leaderboard-bay');
var questionCounter = 0;
var counter = 0;
var timeInterval;
var gameRunning = false;
var timeLeft;
var score = document.getElementById('score');

// gamesPlayed.textContent = localStorage.getItem("games-played");
gamesPlayed.textContent = Object.keys(localStorage).length;


const quizQuestions = [
    {
        text: "Which of these is NOT a programing language?",
        answers: [
            "HTML",
            "JavaScript",
            "FruitBoot",
            "CSS",
        ],
        correctAnswer: "FruitBoot"
    },
    {
        text: "Which is NOT a popular data structure?",
        answers: [
            "WishList",
            "Tree",
            "Array",
            "Graph",
        ],
        correctAnswer: "WishList"
    },
    {
        text: "What does the L in LIFO stand for?",
        answers: [
            "Lazy",
            "Last",
            "Lemon",
            "List",
        ],
        correctAnswer: "Last"
    },
    {
        text: "Which best describes a Queue?",
        answers: [
            "Linear",
            "Circular",
            "Parallel",
            "Perpendicular",
        ],
        correctAnswer: "Linear"
    },
    {
        text: "Which of these is a data field that has unique attributes and behavior?",
        answers: [
            "Gaslight",
            "Array",
            "List",
            "Object",
        ],
        correctAnswer: "Object"
    },
    {
        text: "Where can you look at a webpage's structure online?",
        answers: [
            "Inspect",
            "Operate",
            "Function",
            "Array",
        ],
        correctAnswer: "Inspect"
    },
    {
        text: "Arrays can be used to store which of the following?",
        answers: [
            "Numbers",
            "Strings",
            "Booleans",
            "All of the above",
        ],
        correctAnswer: "All of the above"
    },
    {
        text: "Index numbers are contained inside what?",
        answers: [
            "Parenthesis",
            "Square brackets",
            "Booleans",
            "All of the above",
        ],
        correctAnswer: "Square brackets"
    },
]

function backWork (){
        // if game is  over
    if (questionCounter == quizQuestions.length){
        // end game by removing timer and creating score
        clearInterval(timeInterval);
        score.textContent = timeLeft;
        questionBay.replaceChildren([]);
        endGameDisplay.textContent = "Great score! Click 'Restart Game' to play another round."
        timerCount.textContent = timeLeft;
        
        // create initials prompt
        var initials = prompt("Enter initials");
        // localStorage.setItem("initials", initials);
        // localStorage.setItem("time-left", timeLeft);

        
        // instead of writing to the same keys, we can create an object that represents this game, stringify it, and save that with a unique key

        // create a unique-enough string to use as the key
        const uniqueGameKey = String(new Date());
        // represent the game as JSON
        const gameRepObject = {
            "initials": initials,
            "time-left": timeLeft
        }
        // write stringified version of game results to unique key in localstorage
        localStorage.setItem(uniqueGameKey, JSON.stringify(gameRepObject))



        // iterate over local storage and append game results to leaderboard
        Object.keys(localStorage)
        .forEach((key) => {
            const gameObject = JSON.parse(localStorage[key])
            let scoreItem = document.createElement('li')
            scoreItem.textContent = `${gameObject['initials']}: ${gameObject['time-left']}`;
            leaderboardBay.appendChild(scoreItem)
        });

        // then for each item in it, we append a child to leaderboard bay
        leaderboardBay.appendChild(gameRepObject);



        // vestigial
        // // initials input
        // var initialInput = document.createElement("p");
        // initialInput.textContent = initials;
        // leaderboardBay.appendChild(initialInput);
        
        // // time input
        // var timeInput = document.createElement("p");
        // timeInput.textContent = timeLeft;
        // leaderboardBay.appendChild(timeInput);
    }
    else {
        displayQuestion(quizQuestions[questionCounter])
    }
}

function displayQuestion(question) {
    questionBay.replaceChildren([]);
    var questionText = document.createElement("p");
    questionText.textContent = question.text;
    questionBay.appendChild(questionText);
    question.answers.forEach(function (answer) {
        var button = document.createElement("button");
        button.textContent = answer;
        questionBay.appendChild(button);
        button.addEventListener("click", function (guess) {
            if (guess.target.textContent == question.correctAnswer) {
                questionCounter++;
                backWork();
            }
            else {
                timeLeft = timeLeft - 10;
                questionCounter++;
                backWork();
            }
        });
    });
}


document.getElementById('timerButton').addEventListener('click', function () {
    increaseGamesPlayed();
    countdown();
    displayQuestion(quizQuestions[questionCounter])
})

function initializeTally() {
    tally.textContent = "";
    quizQuestions.forEach(function () {
        tally.textContent += "🩶";
    })
}

initializeTally();

resetButton.addEventListener("click", function () {
 
 
    // set localstorage to empty object {}
    localStorage.clear();
    
    // always 0 because we cleared it first
    gamesPlayed.textContent = Object.keys(localStorage).length;
    

    clearInterval(timeInterval);
    timerCount.textContent = "";
    gameRunning = false;
    initializeTally();
})

stopButton.addEventListener("click", function () {
    clearInterval(timeInterval);
    gameRunning = false;
    window.location.reload();
});

function countdown() {
    if (gameRunning == false) {
        timeLeft = 60;
        timerCount.textContent = timeLeft + " seconds left";
        gameRunning = true;
        timeInterval = setInterval(function () {
            timeLeft--;
            timerCount.textContent = timeLeft + " seconds left";
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                alert("You didn't finish in time!");
                gameRunning = false;
                return;
            }
        }, 1000);
    }
}

function increaseGamesPlayed() {
    if (gameRunning == false) {
        // var totalGamesPlayed = Number(localStorage.getItem("games-played"));
        // totalGamesPlayed += 1;
        // localStorage.setItem("games-played", totalGamesPlayed);
        const totalGamesPlayed = Object.keys(localStorage).length + 1;
        console.log("player has played " + totalGamesPlayed + " games");
        gamesPlayed.textContent = totalGamesPlayed;
    }
}
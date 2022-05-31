const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const tryAgainButton = document.getElementById('try-again-btn');
const resignButton = document.getElementById("resign-btn");

const startPanel = document.getElementById('start');
const gamePanel = document.getElementById('game');
const endPanel = document.getElementById("end");
const progress = document.querySelectorAll(".win p");
const progressDiv = document.querySelectorAll(".win");


const answerContainer = document.getElementById('answers-buttons');
const questionElement = document.getElementById('question');
const endMessage = document.getElementById("end-message");

let questionsLeft = 12;
let money = '0 $';
const answerSigns = ["A", "B", "C", "D"];

//rozpoczęcie gry
startButton.addEventListener("click", startGame);

function startGame() {
    startPanel.classList.add("hide");
    gamePanel.classList.remove("hide");
    showQuestion();
}

async function getQuestion(difficulty) {
    const response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    const questions = data.results;

    const questionsAndAnswers = questions.map(item => {
        const questionList = {};
        questionList["question"] = item.question;
        questionList["answers"] = {};
        questionList.answers['correctAnswear'] = item.correct_answer;

        item.incorrect_answers.map((answ, index) => {
            questionList.answers['incorrectAnswear' + index] = answ;
        });
        return questionList;

    });

    return questionsAndAnswers;
}

function setDifficulty() {
    const difficulties = ["easy", "medium", "hard"];
    let questionDifficulty = difficulties[0];

    if (questionsLeft < 9 && questionsLeft > 5) {
        questionDifficulty = difficulties[1];
    }
    else if (questionsLeft <= 5) {
        questionDifficulty = difficulties[2];
    }
    return questionDifficulty;
}

function getAnswerOrder(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// wyswietlanie pytania
async function showQuestion() {
    clear();
    const questions = await getQuestion(setDifficulty());
    const answers = Object.entries(questions[0].answers).sort((a, b) => a[1] - b[1]);
    let i = 0;

    for (const [key, value] of Object.entries(questions[0].answers)) {
        const answerButton = document.createElement('div');
        answerButton.className = 'answ-btn';
        answerButton.id = key;
        answerButton.innerHTML = `  ${value}`;
        answerButton.style.order = `${getAnswerOrder(-4, 4)}`;
        answerContainer.appendChild(answerButton);
    }

    questionElement.innerHTML = questions[0].question;
    resignButton.classList.remove("hide");
    document.querySelectorAll(".answ-btn").forEach(button => { button.addEventListener("click", selectAnswer, false) });
    resignButton.addEventListener("click", resign);
}

//wybor odpowiedzi
function selectAnswer(e) {
    const correctAnswId = 'correctAnswear';
    const correctAnsw = document.getElementById(correctAnswId);
    const selectedId = e.target.id;

    if (selectedId != correctAnswId) {
        e.target.classList.add("wrong");
        correctAnsw.classList.add("correct");
        showWin();
        setTimeout(endGame, 3500);

    } else {
        e.target.classList.add("correct");
        nextButton.classList.remove("hide");
        nextButton.addEventListener("click", next);
        progressBarUp();
    }
    resignButton.classList.add("hide");
}

function clear() {
    answerContainer.innerHTML = '';
    questionElement.innerHTML = '';
}

function next() {
    clear();
    showQuestion();
    nextButton.classList.add("hide");
}

function progressBarUp() {
    var wrongElements = document.querySelectorAll('.current-win');
    for (var i = 0; i < wrongElements.length; i++) {
        wrongElements[i].classList.remove('current-win');
    }

    questionsLeft--;
    progressDiv[questionsLeft].classList.add("current-win");
    money = progress[questionsLeft].innerText;
}

function showWin() {
    if (questionsLeft <= 12 && questionsLeft > 8) {
        endMessage.innerText = "Unfortunately you've choosen wrong answer. \nEnd of the game.";
    }
    else if (questionsLeft <= 8 && questionsLeft > 4) {
        progressDiv[8].classList.add("current-win");
        endMessage.innerText = "Congratulations! You've won  4 000 $!";

    }
    else if (questionsLeft <= 4 && questionsLeft > 0) {
        progressDiv[8].classList.add("current-win");
        endMessage.innerText = "Gratulacje! Wygrałeś 64 000 $!";
    }
    else {
        progressDiv[0].classList.add("current-win");
        endMessage.innerText = "Gratulacje! Wygrałeś 1 000 000 $!";
    }

    var wrongElements = document.querySelectorAll('.current-win');
    for (var i = 0; i < wrongElements.length; i++) {
        wrongElements[i].classList.remove('current-win');
    }
}

function resign() {
    endGame();
    if (questionsLeft == 0) {
        endMessage.innerText = "Unfortunately, you've lost."
    }
    else {
        endMessage.innerText = "Congratulations! You've won " + money + "!";
    }
}

function endGame() {
    gamePanel.classList.add("hide");
    endPanel.classList.remove("hide");
    tryAgainButton.addEventListener("click", newGame);
}

function newGame() {
    clear();
    startGame();
    questionsLeft = 12;
    money = "";

    var currentWin = document.querySelectorAll('.current-win');
    for (var i = 0; i < currentWin.length; i++) {
        currentWin[i].classList.remove('current-win');
    }

    endPanel.classList.add('hide');
}

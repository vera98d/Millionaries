const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const tryAgainButton = document.getElementById('try-again-btn');
const resignButton = document.getElementById("resign-btn");

const startPanel = document.getElementById('start');
const gamePanel = document.getElementById('game');
const endPanel = document.getElementById("end");
const progress = document.querySelectorAll(".win p");
const progressDiv = document.querySelectorAll(".win");
const moneyPanel = document.querySelector(".moneycontainer");


const answerButtonsElement = document.getElementById('answers-buttons');
const questionElement = document.getElementById('question');
const ansA = document.getElementById("answer1");
const ansB = document.getElementById("answer2");
const ansC = document.getElementById("answer3");
const ansD = document.getElementById("answer4");
const endMessage = document.getElementById("end-message");

let index = 0;
let goodAnswers = 12;
let money;


//rozpoczęcie gry
startButton.addEventListener("click", startGame);

function startGame() {
    questions.sort(function () {
        return .5 - Math.random();
    });
    startPanel.classList.add("hide");
    gamePanel.classList.remove("hide");
    showQuestion();
}

// wyswietlanie pytania
function showQuestion() {
    clear();
    questionElement.innerText = questions[index].question;
    ansA.innerText = questions[index].answer1;
    ansB.innerText = questions[index].answer2;
    ansC.innerText = questions[index].answer3;
    ansD.innerText = questions[index].answer4;
    resignButton.classList.remove("hide");
    answerButtonsElement.addEventListener("click", selectAnswer, false);
    resignButton.addEventListener("click", resign);
}

//wybor odpowiedzi
function selectAnswer(e) {
    if (e.target != e.currentTarget) {
        var selectedId = e.target.id;
        var correctAnswId = questions[index].correctAnswer;
        var selectedAnsw = document.getElementById(selectedId);
        var correctAnsw = document.getElementById(correctAnswId);

        if (selectedId != correctAnswId) {
            selectedAnsw.classList.add("wrong");
            correctAnsw.classList.add("correct");
            showWin();
            setTimeout(endGame, 3500);

        } else if (selectedId == correctAnswId) {
            selectedAnsw.classList.add("correct");
            nextButton.classList.remove("hide");
            nextButton.addEventListener("click", next);
            progressBarUp();
        }
    }
    resignButton.classList.add("hide");
}

function clear() {
    var correctElements = document.querySelectorAll('.correct');
    for (var i = 0; i < correctElements.length; i++) {
        correctElements[i].classList.remove('correct');

    }

    var wrongElements = document.querySelectorAll('.wrong');
    for (var i = 0; i < wrongElements.length; i++) {
        wrongElements[i].classList.remove('wrong');
    }
}

function next() {
    index++;
    clear();
    showQuestion();
    nextButton.classList.add("hide");
}

function progressBarUp() {
    var wrongElements = document.querySelectorAll('.current-win');
    for (var i = 0; i < wrongElements.length; i++) {
        wrongElements[i].classList.remove('current-win');
    }

    goodAnswers--;
    progressDiv[goodAnswers].classList.add("current-win");
    money = progress[goodAnswers].innerText;
}

function showWin() {
    if (goodAnswers <= 12 && goodAnswers > 8) {
        endMessage.innerText = "Niestety wybrałeś złą odpowiedź. \nKoniec gry.";
    } else if (goodAnswers <= 8 && goodAnswers > 4) {
        // moneyPanel.classList.remove("hide");
        progressDiv[8].classList.add("current-win");
        endMessage.innerText = "Gratulacje! Wygrałeś  5 000 zł!";

    } else if (goodAnswers <= 4 && goodAnswers > 0) {
        progressDiv[8].classList.add("current-win");
        endMessage.innerText = "Gratulacje! Wygrałeś 75 000 zł!";
        // moneyPanel.classList.remove("hide");
    } else {
        progressDiv[0].classList.add("current-win");
        endMessage.innerText = "Gratulacje! Wygrałeś 1 000 000 zł!";
        // moneyPanel.classList.remove("hide");
    }

    var wrongElements = document.querySelectorAll('.current-win');
    for (var i = 0; i < wrongElements.length; i++) {
        wrongElements[i].classList.remove('current-win');
    }

}

function resign() {
    endGame();
    if (goodAnswers==0){
        endMessage.innerText = "Niestety nic nie wygrałeś"}
    else{
        endMessage.innerText = "Gratulacje! Wygrałeś " + money + "!";}
}

function endGame() {
    gamePanel.classList.add("hide");
    endPanel.classList.remove("hide");

    tryAgainButton.addEventListener("click", newGame);
}

function newGame() {
    clear();
    startGame();
    delete index;
    goodAnswers = 12;
    money = "";

    var currentWin = document.querySelectorAll('.current-win');
    for (var i = 0; i < currentWin.length; i++) {
        currentWin[i].classList.remove('current-win');
    }
}


var questions = [{
        question: "Kto wygrał mistrzostwa świata w piłce nożnej w 2002 roku?",
        answer1: "A. Niemcy",
        answer2: "B. Brazylia",
        answer3: "C. Hiszpania",
        answer4: "D. Turcja",
        correctAnswer: "answer2"
    },
    {
        question: "Jakie nazwisko kryje się pod pseudonimem Iron Man?",
        answer1: "A. Bruce Wayne",
        answer2: "B. Bruce Banner",
        answer3: "C. Tony Stark",
        answer4: "D. Scott Lang",
        correctAnswer: "answer3"
    },
    {
        question: 'Kto wcielił się w główną rolę w filmie "Jestem Bogiem"?',
        answer1: "A. Al Pacino",
        answer2: "B. Brad Pitt",
        answer3: "C. Leonardo DiCaprio",
        answer4: "D. Bradley Cooper",
        correctAnswer: "answer4"
    },
    {
        question: 'Jak miały na imię dzieci Moniki i Chandlera z serialu "przyjaciele"?',
        answer1: "A. Emma i Jack",
        answer2: "B. Erica i Jack",
        answer3: "C. Erica i Ben",
        answer4: "D. Emma i Ben",
        correctAnswer: "answer2"
    },
    {
        question: 'Kim był Foltest, jeden z bohaterów sagi i gry "wiedźmin?',
        answer1: "A. Ojcem Geralta",
        answer2: "B. Podopiecznym Geralta",
        answer3: "C. Królem Temerii",
        answer4: "D. Najpotężniejszym członkiem kapituły czarodziejów",
        correctAnswer: "answer3"
    },

    {
        question: 'Założycielką klubu czarodziejek i bezwzględną doradczynią króla Redanii była',
        answer1: "A. Francesca Findabair",
        answer2: "B. Triss Merigold z Mariboru",
        answer3: "C. Filippa Elihart z Tretogoru",
        answer4: "D. Yennefer z Vangerbergu",
        correctAnswer: "answer3"
    },

    {
        question: 'Od czego uzależniony był Norman a gry Heavy Rain?',
        answer1: "A. Od kokainy",
        answer2: "B. Od tripokokainy",
        answer3: "C. Od LSD",
        answer4: "D. Od kokainy",
        correctAnswer: "answer2"
    },

    {
        question: 'Jaką próbę ma do wykonania Ethan w rozdziale "Niedźwiedź" z grze Heavy Rain?',
        answer1: "A. Odciąć sobie palec w 5 minut",
        answer2: "B. Jechać 5 kilometrów pod prąd autostradą",
        answer3: "C. Czołgać się przez tunel ze szkłem i przejść przez tunel kondensatorów elektrycznych",
        answer4: "D. Wypić truciznę, która go zabije po 60 minutach",
        correctAnswer: "answer2"
    },

    {
        question: 'Jak nazywają się specjalne okulary Normana z gry Heavy Rain?',
        answer1: "A. ARI",
        answer2: "B. AVI",
        answer3: "C. IVO",
        answer4: "D.ORI",
        correctAnswer: "answer3"
    },

    {
        question: 'Czym Victoria została oblana przez Max w grze Life is strange?',
        answer1: "A. Farbą",
        answer2: "B. Wodą",
        answer3: "C. Sokiem",
        answer4: "D. Kawą",
        correctAnswer: "answer1"
    },

    // 10pytan

    {
        question: 'Kto uratował Max, gdy była w ciemni w grze Life is strange?',
        answer1: "A. Warren",
        answer2: "B. Chloe",
        answer3: "C. David",
        answer4: "D. Kate",
        correctAnswer: "answer3"
    },

    {
        question: 'Kto fotografował dziewczyny w ciemni w grze Life is strange?',
        answer1: "A. Warren",
        answer2: "B. Chloe",
        answer3: "C. David",
        answer4: "D. Kate",
        correctAnswer: "answer3"
    },

    {
        question: 'Jakie było pierwsze zdjęcie Max w grze Life is strange?',
        answer1: "A. Selfie na lekcji",
        answer2: "B. Zdjęcie motyla",
        answer3: "C. Zdjęcie Chloe w jej pokoju",
        answer4: "D. Zdjęcie korytarza",
        correctAnswer: "answer1"
    },

    {
        question: 'Jak nazywa się potwór, z którym bohaterowie walczą w 1. sezonie serialu Stranger Things?',
        answer1: "A. Demagog",
        answer2: "B. Aragog",
        answer3: "C. Ksenomorf",
        answer4: "D. Demogorgon",
        correctAnswer: "answer4"
    },

    {
        question: 'Ulubiony przysmak Jedenastki to z serialu Stranger Things to:',
        answer1: "A. Gofry",
        answer2: "B. Chipsy",
        answer3: "C. Lody",
        answer4: "D. Babeczki",
        correctAnswer: "answer1"
    },

    {
        question: 'Ulubiona piosenka Dustina i jego dziewczyny ze Stranger Things to:',
        answer1: 'A. "It must have been love"',
        answer2: 'B. "Dancing queen"',
        answer3: 'C. "Neverending story"',
        answer4: 'D. "I will always love you"',
        correctAnswer: "answer3"
    },

    {
        question: 'Która reprezentacja najwięcej razy w historii wygrywała mundial?',
        answer1: "A. Włochy",
        answer2: "B. Niemcy",
        answer3: "C. Francja",
        answer4: "D. Brazylia",
        correctAnswer: "answer4"
    },

    {
        question: 'Który z polskich klubów, jako jedyny w historii, dotarł do finału europejskich rozgrywek piłki nożnej?',
        answer1: "A. Górnik Zabrze",
        answer2: "B. Widzew Łódź",
        answer3: "C. Wisła Kraków",
        answer4: "D. Legia Warszawa",
        correctAnswer: "answer1"
    },

    {
        question: "Gdzie odbyły się pierwsze mistrzostwa Europy?",
        answer1: "A. ZSRR",
        answer2: "B. Niemcy",
        answer3: "C. Francja",
        answer4: "D. Włochy",
        correctAnswer: "answer3"
    },

    {
        question: 'Ile najwięcej goli w jednym sezonie Serie A strzelił Zbigniew Boniek?',
        answer1: "A. 5",
        answer2: "B. 7",
        answer3: "C. 9",
        answer4: "D. 11",
        correctAnswer: "answer2"
    },

    // 20pytan

    {
        question: 'Ile razy reprezentacja Argentyny z Leo Messim w składzie przegrała w finałach Copa America i MŚ?',
        answer1: "A. 1",
        answer2: "B. 2",
        answer3: "C. 3",
        answer4: "D. 4",
        correctAnswer: "answer4"
    },

    {
        question: 'Który z piłkarzy miał w swoim kontrakcie zapisany zakaz lotu w kosmos?',
        answer1: "A. Stefan Schwarz",
        answer2: "B. Mario Balotelli",
        answer3: "C. Paul Gascoigne",
        answer4: "D. Roy Keane",
        correctAnswer: "answer1"
    },

    {
        question: 'Z jakim numerem grał Cristiano Ronaldo tuż po przyjściu do Realu Madryt?',
        answer1: "A. 7",
        answer2: "B. 9",
        answer3: "C. 10",
        answer4: "D. 11",
        correctAnswer: "answer2"
    },

    {
        question: "Który piłkarz, jako jedyny, może się pochwalić wygraną w Lidze Mistrzów z trzema różnymi klubami?",
        answer1: "A. Cristiano Ronaldo",
        answer2: "B. Clarence Seedorf",
        answer3: "C. Xabi Alonso",
        answer4: "D. Deco",
        correctAnswer: "answer2"
    },

    {
        question: 'Ulubiony przysmak Jedenastki to z serialu Stranger Things to:',
        answer1: "A. Gofry",
        answer2: "B. Chipsy",
        answer3: "C. Lody",
        answer4: "D. Babeczki",
        correctAnswer: "answer1"
    },

    {
        question: 'Kto powiedział słowa: „Jedno jest pewne, beze mnie na mundialu nie będzie czego oglądać, dlatego nie warto czekać na mistrzostwa świata”?',
        answer1: 'A. "Arjen Robben"',
        answer2: 'B. "Gareth Bale"',
        answer3: 'C. "Cristiano Ronaldo"',
        answer4: 'D. "Zlatan Ibrahimović"',
        correctAnswer: "answer4"
    },

    {
        question: 'Który z piłkarzy strzelił najszybszego hat-tricka w historii Premier League?',
        answer1: "A. Robbie Fowler",
        answer2: "B. Ole Gunnar Solskjaer",
        answer3: "C. Sadio Mane",
        answer4: "D. Alan Shearer",
        correctAnswer: "answer3"
    },

    {
        question: 'Najwięcej goli (pięć) w jednym meczu Ligi Mistrzów, strzeliło dwóch piłkarzy. Jednym z nich jest Leo Messi, a drugim?',
        answer1: "A. Cristiano Ronaldo",
        answer2: "B. Luiz Adriano",
        answer3: "C. Zlatan Ibrahimović",
        answer4: "D. Serge Gnabry",
        correctAnswer: "answer2"
    },

    {
        question: "Który film nie otrzymał 11 statuetek Oscarowych?",
        answer1: "A. Przeminęło z wiatrem",
        answer2: "B. Titanic",
        answer3: "C. Władca Pierścienia: Powrót Króla",
        answer4: "D. Ben-Hur",
        correctAnswer: "answer1"
    },

    {
        question: 'Dokończ słowa piosenki "Kryzysowa Narzeczona" zespołu Lady Punk. "Mogłaś moją być, jakoś ze mną..."',
        answer1: "A. przebudować",
        answer2: "B. przemęczyć się",
        answer3: "C. pomalutku żyć",
        answer4: "D. przebiedować",
        correctAnswer: "answer4"
    },

    // 30pytan
    {
        question: 'Dokończ słowa piosenki "Za Tobą pójdę jak na bal" zespołu Lady Punk. "Niczego mi nie będzie żal, pójdę tak jak w..."',
        answer1: "A. niedzielę",
        answer2: "B. dym",
        answer3: "C. Warszawie",
        answer4: "D. 1980",
        correctAnswer: "answer2"
    },

    {
        question: 'Dokończ słowa piosenki "Konik na biegunach" Urszuli. "Przeminie jak wiatr, uśmiechów Twych świat...',
        answer1: "A. kolory marzeniom odbierze",
        answer2: "B. będziemy znów razem - w to wierzę",
        answer3: "C. i szare kolory przebierze",
        answer4: "D. marzenia nasze odbierze",
        correctAnswer: "answer1"
    },

    {
        question: 'Jaki tytuł nosi piosenka Republiki z tekstem: "Gdzie oni są? Ci wszyscy moi przyjaciele"?',
        answer1: "A. cierpienie",
        answer2: "B. piosenka o przyjaźni",
        answer3: "C. czekam na was",
        answer4: "D. biała flaga",
        correctAnswer: "answer4"
    },

    {
        question: 'Który zespół rockowy śpiewał: "Mogłaś być już na dnie, a nie byłaś. Nigdy nie dowiesz się, co straciłaś."',
        answer1: "A. Lady Pank",
        answer2: "B. Chłopcy z Placu Broni",
        answer3: "C. TSA",
        answer4: "D. Dżem",
        correctAnswer: "answer1"
    },

    {
        question: 'Jak nazywa się gra karciana, w którą grywali bohaterowie gry Wiedźmin 3: Dziki Gon?',
        answer1: "A. Mahjong",
        answer2: "B. Pasjans",
        answer3: "C. Gwint",
        answer4: "D. Poker",
        correctAnswer: "answer3"
    },

    {
        question: 'Gdzie Triss Merigold z gry Wiedźmin pierwszy raz spotkała Ciri?',
        answer1: "A. W Cintrze",
        answer2: "B. W wiedźmińskim siedliszczu",
        answer3: "C. Nad rzeką",
        answer4: "D. Na Mordowni",
        correctAnswer: "answer4"
    },

    {
        question: 'Który polski zespół śpiewał: "I pięknie jest, nieskromnie bardzo jest"?',
        answer1: "A. Kobranocka",
        answer2: "B. Klaus Mitffoch",
        answer3: "C. Raz Dwa Trzy",
        answer4: "D. K2",
        correctAnswer: "answer2"
    },

    {
        question: 'Który film wygrał w 2015 roku Oscara w kategorii najlepszy scenariusz?',
        answer1: "A. Wolny Strzelec",
        answer2: "B. Grand Budapest Hotel",
        answer3: "C. Birdman",
        answer4: "D. Noyhood",
        correctAnswer: "answer3"
    },

    {
        question: 'Kto wygrał w 2012 roku Oscara w kategorii najlepszy aktor drugoplanowy?',
        answer1: "A. Christofer Plummer w filmie Debiutanci",
        answer2: "B. Jonah Hill w filmie Moneyball",
        answer3: "C. Max vob Sydow w filmie Strasznie głośno, niesamowicie blisko",
        answer4: "D. Kenneth Branagh w filmie Marilyn",
        correctAnswer: "answer1"
    },

    {
        question: 'Jaki film otrzymał w 2018 roku Złotego Globa w kategorii Najlepszy Dramat?',
        answer1: "A. Kształt wody",
        answer2: "B. Tamte dni, tamte noce",
        answer3: "C. Dunkierka",
        answer4: "D. Trzy billboardy za Ebbing, Missouri",
        correctAnswer: "answer4"
    },

    // 40 pytan
    {
        question: 'Który owoc kryje w sobie więcej niż jedno nasiono',
        answer1: "A. gruszka",
        answer2: "B. liczi",
        answer3: "C. awokado",
        answer4: "D. orzech włoski",
        correctAnswer: "answer1"
    },

    {
        question: 'Jakie ogórki są podstawą tradycyjnej zuy ogórkowej?',
        answer1: "A. korniszony",
        answer2: "B. pikle",
        answer3: "C. kiszone",
        answer4: "D. konserwowe",
        correctAnswer: "answer4"
    },

    {
        question: 'Gdy zapali nam się olej na patelni powinniśmy:',
        answer1: "A. Przykryć patelnię pokrywką",
        answer2: "B. Zalać wodą",
        answer3: "C. Dolać więcej tłuszczu",
        answer4: "D. Próbować zdmuchnąć ogień",
        correctAnswer: "answer4"
    },

    {
        question: 'Fermentacja alkoholowa przeprowadzana przez drożdże nie jest wykorzystywana do produkcji:',
        answer1: "A. antracytu",
        answer2: "B. napojów alkoholowych",
        answer3: "C. biopaliwa",
        answer4: "D. pieczywa drożdżowego",
        correctAnswer: "answer1"
    },

    {
        question: 'Co stanowi śmiertelnie niebezpieczną mieszankę?',
        answer1: "A. pomelo z żubrówką",
        answer2: "B. winogrona z piwem",
        answer3: "C.liczi z szampanem",
        answer4: "D. durian z żytniówką",
        correctAnswer: "answer4"
    },

    {
        question: 'W którą stronę obraca się ziemia?',
        answer1: "A. ze wschodu na zachód",
        answer2: "B. z północy na południe",
        answer3: "C. z połódnia na północ",
        answer4: "D. z zachodu na wschód",
        correctAnswer: "answer4"
    },

    {
        question: 'Jaką funkcję w organizmie pełnią erytrocyty?',
        answer1: "A. Biorą udział w procesie krzepnięcia krwi",
        answer2: "B. Są odpowiedzialne za równowagę hormonalną kobiet",
        answer3: "C. Chronią przed wirusami i bakteriami",
        answer4: "D. Przenoszą tlen",
        correctAnswer: "answer4"
    },

    {
        question: 'Na ile lat szacuje się wiek ziemii?',
        answer1: "A. 10 miliardów lat",
        answer2: "B. 4,5 miliarda lat",
        answer3: "C. 120 miliardów lat",
        answer4: "D. 800 miliardów lat",
        correctAnswer: "answer2"
    },

    {
        question: 'Która jednostka nie należy do układu SI?',
        answer1: "A. sekunda",
        answer2: "B. kelwin",
        answer3: "C. dżul",
        answer4: "D. kilogram",
        correctAnswer: "answer3"
    },

    {
        question: 'Najdłuższa rzeka w Europie to:',
        answer1: "A. Wisła",
        answer2: "B. Sekwana",
        answer3: "C.Dunaj",
        answer4: "D. Wołga",
        correctAnswer: "answer4"
    },

]
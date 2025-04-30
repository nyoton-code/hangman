let letters = "abcdefghijklmnopqrstvuwxyz";
let lettersContainer = document.querySelector(".letters");
for (let i = 0; i < letters.length; i++) {
    let sp = document.createElement("span");
    sp.innerHTML = letters[i].toLocaleUpperCase();
    sp.setAttribute("class", "letter-box");
    lettersContainer.appendChild(sp);
}

let result = document.querySelector(".result");

let theOne = "mzopalamdtpian";

theOne = theOne[1] + theOne[5] + theOne[6] + theOne[9] + theOne[theOne.length - 2] + theOne[theOne.length - 1]

let wrongTries = 0;
let rightTries = 0;

for (let i = 0; i < theOne.length; i++) {
    let lett = document.createElement("span");
    lett.setAttribute("class", "sets");
    result.appendChild(lett);
}

let letterclicked = document.querySelectorAll(".letter-box");
let l = document.querySelectorAll(".sets");
let hangmanSpans = document.querySelectorAll(".hangman > span");
//  start effect sound 
let correctOne = document.querySelector("audio.correct");
let wrongOne = document.querySelector("audio.wrong");
// end sound effects 
function check(k) {
    let position;

    if (theOne.includes(k.textContent.toLocaleLowerCase())) {
        correctOne.play();
        position = theOne.indexOf(k.textContent.toLocaleLowerCase()); // find the index of it 
        l[position].innerHTML = k.textContent; // replace it at the position
        theOne = theOne.replace(theOne[position], ' '); //
        if (!theOne.includes((k.textContent.toLocaleLowerCase()))) k.classList.add("clicked");
        rightTries++;
    }
    else {
        wrongOne.play();
        hangmanSpans[wrongTries].classList.add("exics"); // HANGMAN FUNCTIOnon click 
        wrongTries++;
        console.log(k.textContent.toLocaleLowerCase());
        k.classList.add("clicked");
    }
}

let winA = document.querySelector("audio.win");
let loseA = document.querySelector("audio.lose");
function gameover() {
    let loseCase = document.createElement("div");
    loseCase.setAttribute("class", "lose");
    let loseText = document.createElement("div");
    loseCase.appendChild(loseText);
    let btnRePlay = document.createElement("button");
    btnRePlay.textContent = "replay game";

    function rePlay() {
        loseCase.appendChild(btnRePlay);
        btnRePlay.addEventListener("click", function () {
            window.location.reload();
        });
    }

    if (wrongTries > 7) {
        setTimeout(function () {
            setTimeout(() => { loseA.play() }, 100);
            document.body.appendChild(loseCase);
            loseText.textContent = "you lose the game";
            rePlay();
        }, 200);

    }
    if (rightTries === theOne.length) {
        setTimeout(function () {
            setTimeout(() => { winA.play() }, 100);
            document.body.appendChild(loseCase);
            loseText.textContent = "you won the game";
            rePlay();
        }, 200);
    }

}

function stopClick() {
    document.body.classList.add("stop-game");
    setTimeout(function () {
        document.body.classList.remove("stop-game");
    }, 200);
}
letterclicked.forEach(function (e) {
    e.onclick = function () {
        stopClick();
        check(e);
        gameover();
    }
});



var countError = 0;
var nbOfTurns = 1;
var wrongLetters = []; 
var name;
var eLetter = false;
var eGuess = false;

var today = new Date();
var userID =  Math.floor(today.getFullYear()*today.getMonth()*today.getDate());
var canPlay = true;

function ChooseRandomWord(){
    fetch('HangmanWord.txt')
    .then((data) => {
        return data;
    })
    .then((data) => {
        data.text().then((word) => {
            var randomWord = word.split(' ')[0]; 
            randomWord = randomWord.toUpperCase();
            CreateGrid(randomWord);
            SendName();
        });
    })
    .catch();
}

function SendName(){
    var input = document.querySelector('#name').innerHTML;
    $.post("AddLeaderboard.php", {"name": input});
}

function createElement(element, parent, content){
    newElement = document.createElement(element);
    newElement.innerHTML = content
    parent.appendChild(newElement);
}

function CreateGrid(word){
    var tr = document.querySelector('table tr');    
    for(let i = 0; i < word.length; i++){
        createElement("td", tr, "_");
    }
    document.querySelectorAll('td')[0].innerHTML = word[0];
    if(localStorage.length != 0){
        nbOfTurns = localStorage.getItem('cpt');
        var td2write = document.querySelectorAll('td');
        var touches = document.querySelectorAll(".touche");
        for(let i = 0; i < touches.length; i++){
            touches[i].style.background = localStorage.getItem("Hcolor"+i);
            touches[i].style.border = "1px "+localStorage.getItem("Hborder"+i)+" solid";
        }
        for(let i = 1; i < td2write.length; i++){
            td2write[i].innerHTML = localStorage.getItem("tdLetter"+i);
        }
    }
    KeyboardInput(word);
}
function KeyboardInput(randomWord){
    var efface = document.querySelector(".efface");
    var entre = document.querySelector(".entre");
    var userInput = document.querySelector('.user-input');
    if(userInput.innerHTML != " "){
        entre.onclick = () => {
            if(eLetter){
                SubmitLetter(userInput.innerHTML, randomWord);
                console.log(eLetter);
                eLetter = false;
                
            }
            if(eGuess){
                var word2submit = document.querySelector('.user-input').innerHTML;
                SubmitGuess(word2submit,randomWord);
                console.log(eGuess);
                eGuess = false;
                
            }
            nbOfTurns++;
        }  
    }
    SimpleLetter(randomWord);
    MakeGuess(randomWord);
    efface.onclick = () => {
        DeleteLetter();
    }
}
function SimpleLetter(randomWord){
    var touches = document.querySelectorAll(".touche");
    var userInput = document.querySelector('.user-input');
    for(let i = 0; i < touches.length-3; i++){
        touches[i].onclick = () => {
            userInput.innerHTML = touches[i].innerHTML;
            eLetter = true;
        }
    }
}
function MakeGuess(randomWord){
    var isGuessing = false;
    var touches = document.querySelectorAll(".touche");
    var entre = document.querySelector(".entre");
    entre.classList.add("entre-guess");
    entre = document.querySelector(".entre-guess");
    var userInput = document.querySelector('.user-input');
    var td2write = document.querySelectorAll('td');
    touches[touches.length-1].addEventListener('click', () => {
        userInput.innerHTML = "";
        if(!isGuessing){
            touches[touches.length-1].classList.add('active');
            isGuessing = true;
            for(let i = 0; i < touches.length-3; i++){
                if(touches[i].classList.contains('correct') || touches[i].classList.contains('wrong')){
                    touches[i].classList.remove('correct');
                    touches[i].classList.remove('wrong');
                }
               
                touches[i].onclick = () => {
                    AddLetter(touches[i].innerHTML);
                }
            }
            eGuess = true;
        }
        else{
            userInput.innerHTML = "-";
            var wrongLettersDiv = document.querySelector("del").innerHTML;
            var tabWrong = wrongLettersDiv.split('');
            for(let i = 0; i < touches.length; i++){
                for(let j = 0; j < td2write.length; j++){
                    if(touches[i].innerHTML == td2write[j].innerHTML){
                        touches[i].classList.add('correct');
                    }
                }
                for(let k = 0; k < wrongLettersDiv.length; k++){
                    if(touches[i].innerHTML == tabWrong[k]){
                        touches[i].classList.add('wrong');
                    }
                }
                eGuess = false;
            }
            touches[touches.length-1].classList.remove('active');
            isGuessing = false;
            KeyboardInput(randomWord);
        }
    });
}
function SubmitGuess(word, randomWord){
    if(word == randomWord){
        Result("Gagné !", nbOfTurns);
    }
    else{
        Result("Perdu !", nbOfTurns);
    }
}
function SubmitLetter(lettre, randomWord){
    localStorage.setItem('cpt', nbOfTurns);
    var td2write = document.querySelectorAll('td');
    var tabTd = []
    
    var notInWord = true;
    for(let i = 0; i < randomWord.length; i++){
        if(td2write[i].innerHTML == "_"){
            localStorage.setItem("tdLetter"+i, "_");  
            
        }
        if(lettre == randomWord[i]){
            td2write[i].innerHTML = lettre;
            notInWord = false;
            localStorage.setItem("tdLetter"+i, lettre);
        }
    }
    for(let i = 0; i < td2write.length; i++){
        tabTd[i] = td2write[i].innerHTML;  
    }
    if(notInWord){
        drawParts(lettre);
    }
    else{
        ChangeBg(lettre, true);
    }
    if(tabTd.join('') == randomWord){
        Result("Gagné !", nbOfTurns);
    }
}
function AddLetter(value){
    var userInput = document.querySelector('.user-input');
    userInput.innerHTML += value;
}
function DeleteLetter(){
    var word2submit = document.querySelector('.user-input').innerHTML;
    var userInput = document.querySelector('.user-input');
    var newWord = "";
    var tabWord = word2submit.split('');
    tabWord[tabWord.length-1] = "";
    newWord = tabWord.join('');
    userInput.innerHTML = newWord;
}

function drawParts(lettre){
    var canva = document.getElementById("draw");
    var ctx = canva.getContext("2d");
    var wrongLettersDiv = document.querySelector("del");
    var alreadyExist = false;

    for(let i = 0; i < wrongLetters.length; i++){
        if(lettre == wrongLetters[i]){
            alreadyExist = true;
        }
    }
    if(!alreadyExist){
        wrongLetters.push(lettre);
        for(let i = 0; i < wrongLetters.length; i++){
            wrongLettersDiv.innerHTML = wrongLetters;
        }
        ctx.clearRect(0, 0, 500, 500);
        ctx.beginPath();
        if(countError < 1){
            ctx.moveTo(40, 350); // PETITE BARRE HONRIZONTALE
            ctx.lineTo(230, 350);
        }
        if(countError >= 1){
            ctx.moveTo(40, 350); // PETITE BARRE HONRIZONTALE
            ctx.lineTo(230, 350);
            ctx.moveTo(90, 90); // BARRE VERTICALE
            ctx.lineTo(90, 350);
        }
        if(countError > 1){
            ctx.moveTo(55, 350); // PETITE BARRE DIAGONALE DROITE
            ctx.lineTo(90, 320);
        }
        if(countError > 2){
            ctx.moveTo(125, 350); // PETITE BARRE DIAGONALE GAUCHE
            ctx.lineTo(90, 320);
        }
        if(countError > 3){
            ctx.moveTo(40, 90); // BARRE HORIZONTALE
            ctx.lineTo(240, 90);
        }
        if(countError > 4){
            ctx.moveTo(90, 120); // PETITE BARRE DIAGONALE HAUT DROITE
            ctx.lineTo(120, 90);
        }
        if(countError > 5){
            ctx.moveTo(200, 90); // CORDE
            ctx.lineTo(200, 130);
        }
        if(countError > 6){
            ctx.moveTo(220, 150) // TETE
            ctx.arc(200,150,20,0,2*Math.PI); 
        }
        if(countError > 7){
            ctx.moveTo(200, 170); // COU
            ctx.lineTo(200, 220);
        }
        if(countError > 8){
            ctx.moveTo(200, 180); // BRAS GAUCHE
            ctx.lineTo(180, 220);
        }
        if(countError > 9){
            ctx.moveTo(200, 180); // BRAS DROIT
            ctx.lineTo(220, 220);
        }
        if(countError > 10){
            ctx.moveTo(200, 220); // JAMBE GAUCHE
            ctx.lineTo(180, 260);
        }
        if(countError > 11){
            ctx.moveTo(200, 220); // JAMBE DROITE
            ctx.lineTo(220, 260);
            Result("Perdu !", countError);
        }
        ctx.stroke();

        countError++;
        ChangeBg(lettre, false);
    }
}

function ChangeBg(lettre, correct){
    var touches = document.querySelectorAll(".touche");
    for(let i = 0; i < touches.length; i++){
        if(lettre == touches[i].innerHTML && correct){
            touches[i].classList.add('correct');
            localStorage.setItem("Hcolor"+i, "#fa5818");
            localStorage.setItem("Hborder"+i, "#b43900");
        }
        if(lettre == touches[i].innerHTML && !correct){
            touches[i].classList.add('wrong');
            localStorage.setItem("Hcolor"+i, "#a59b92");
            localStorage.setItem("Hborder"+i, "#47423e");
        }
    }
}

function Result(result, nbOfTurns){
    var resultScreen = document.querySelector('.result');
    var resultTitle = document.querySelector('.result-title');
    var resultBody = document.querySelector('.result-body');
    resultScreen.style.display = "flex";
    resultTitle.innerHTML = "<h1>" + result + "</h1>";
    if(result == "Gagné !"){
        resultBody.innerHTML = "<p>Vous avez trouvé le mot en " + nbOfTurns + " coups !</p>";
        $.post("AddLeaderboard.php", {"score": nbOfTurns});
    }
    resultBody.innerHTML += "<a href=\"leaderboard.php\" target=\"_blank\" id=\"leaderboard\">Leaderboard</a>";
    createCookie("Hangman-WinOrLoose", "true");
}

function createCookie(name,value) {
    var date = new Date();
    date.setHours(23,59,59,0);
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
function checkCookie(name) {
  let user = getCookie(name);
  if (user == "") {
        canPlay = true;
  } 
  else {
        canPlay = false;
  }
  return canPlay;
}





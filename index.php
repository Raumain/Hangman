<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendu</title>
    <link rel="stylesheet" href="css/index.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="javascript/chooseWord.js"></script>
</head>
<body>
    <section class="title">
        <h1>HANGMAN</h1>
    </section>
    <div class="rules" style="display: <?php if(isset($_SESSION["name"]) && !empty($_SESSION["name"])){echo "none";}?>">
        <div class="rules-content">
            <div class="rules-title">
                <h1>Les règles du Hangman</h1>
            </div>
            <div class="rules-body">
                <p>Le but du jeu est, évidemment, de trouver le mot avant d'être pendu</p>
                <p>Pour cela, vous pouvez proposer une lettre qui va s'afficher dans le carré, puis validez en cliquant sur &#8617;</p>
                <p>Pour proposer un mot, appuyez sur "Guess!" et écrivez votre mot. Validez également en cliquant sur &#8617;</p>
                <p>⚠️ ATTENTION ⚠️</p>
                <p>Vous ne pouvez proposer qu'UN SEUL mot, s'il est faux, vous perdez la partie</p>
                <form action="./AddLeaderboard.php" method="POST" class="name-play">
                    <input type="text" id="name" name="name" placeholder="Entrez votre nom">
                    <input type="submit" class="jouer" value="Jouer !"/>
                </form>
                
            </div>
        </div>
    </div>
    <section class="result">
        <div class="result-screen">
            <div class="result-title">
               
            </div>
            <div class="result-body">
                
            </div>
        </div>
    </section>
    <section class="content">
        <div class="guess-part">
            <div class="grille">
                <table>
                    <tr> </tr>
                </table>
            </div>
            <div class="user-input">-</div>
            <div class="keyboard">
                <div class="touche">A</div>
                <div class="touche">Z</div>
                <div class="touche">E</div>
                <div class="touche">R</div>
                <div class="touche">T</div>
                <div class="touche">Y</div>
                <div class="touche">U</div>
                <div class="touche">I</div>
                <div class="touche">O</div>
                <div class="touche">P</div>
                <div class="touche">Q</div>
                <div class="touche">S</div>
                <div class="touche">D</div>
                <div class="touche">F</div>
                <div class="touche">G</div>
                <div class="touche">H</div>
                <div class="touche">J</div>
                <div class="touche">K</div>
                <div class="touche">L</div>
                <div class="touche">M</div>
                <div class="touche">W</div>
                <div class="touche">X</div>
                <div class="touche">C</div>
                <div class="touche">V</div>
                <div class="touche">B</div>
                <div class="touche">N</div>
                <div class="touche efface">&#8592;</div>
                <div class="touche entre">&#8617;</div>
                <div class="touche guess">Guess!</div>
            </div>
        </div>
        <div class="draw-part">
            <canvas id="draw" width="400" height="400" style="border: 1px black solid;"></canvas>
            <div class="wrong-letters">
                <del></del>
            </div>
        </div>
    </section>
    <script>
        if(getCookie("Hangman-playedOnce") == "true" && getCookie("Hangman-WinOrLoose") == "true"){
            document.querySelector('.content').innerHTML = "";
            document.querySelector('.result').style.display = "flex";
            document.querySelector('.result').innerHTML = "<h1>Vous avez déjà tenté votre chance pour aujourd'hui !</h1><br /><p>Revenez demain :)</p><a href=\"leaderboard.php\" target=\"_blank\" id=\"leaderboard\">Leaderboard</a>";
        }
        else{
            createCookie("Hangman-playedOnce", "true");
            ChooseRandomWord();
        }
        
    </script>
</body>
</html>
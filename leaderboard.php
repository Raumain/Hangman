<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/leaderboard.css">
    <title>Leaderboard</title>
</head>
<body>
    <section class="title">
        <h1>Leaderboard</h1>
    </section>
    <section class="content">
        <div class="leaderboard">
            <ol>
                <?php
                    $open = fopen("leaderboard.txt", "r") or die ("Problème d'ouverture du fichier liste");
                    while(!feof($open)){
                        $ligne = fgets($open);
                        if(!empty($ligne)){
                            echo "<li>".$ligne."</li>";
                        }
                    }
                    fclose($open);
                ?>
            </ol>
        </div>
    </section>
</body>
</html>
<?php
    session_start();
    if(isset($_POST["name"]) && !empty($_POST["name"])){
        $_SESSION["name"] = $_POST["name"];
        header("Location: index.php");
    }
    
    
    if(isset($_POST["score"]) && !empty($_POST["score"])){
        $_SESSION["score"] = $_POST["score"];
        echo "score";
        var_dump($_SESSION);
    }


    if(isset($_SESSION["score"]) && !empty($_SESSION["score"]) && isset($_SESSION["name"]) && !empty($_SESSION["name"])){
        AddPlayer($_SESSION["name"], $_SESSION["score"]);
        unset($_SESSION["score"]);
        var_dump($_SESSION);
    }
    function AddPlayer($name, $score){
        if(sizeof(explode(' ', $name)) != 1){
            $newName = explode(' ', $name);
            $name = join('-', $newName);
        }
        $actualPlayer = $name. ' : '.$score. ' - '. date("d/F/Y")."\n";
        $lignes = []; 
        $i = 0;
        $players = [];
        $newPlayers = [];
        $added = false;

        $open = fopen("leaderboard.txt", "r") or die ("Problème d'ouverture du fichier liste"); 
        while(!feof($open)){
            $lignes[$i] = fgets($open);
            $i++;
        }
        fclose($open);
        echo strlen($lignes[0]);
        var_dump($lignes);
        echo $lignes[0];
        if(strlen($lignes[0]) == 1){
            $open = fopen("leaderboard.txt", "w") or die ("Problème d'ouverture du fichier liste"); 
            $ligne = $actualPlayer;
            echo "ok";
            fwrite($open, $ligne);
            fclose($open);
            return;
        }
        for($i = 0; $i < sizeof($lignes); $i++){
            if(!strpos("-", $lignes[$i]) || !strpos(" ", $lignes[$i])){
                array_push($players, $lignes[$i]);
            }
        }

        for($j = 0; $j < sizeof($players)-1; $j++){
            if(intval(explode(' ', $players[$j])[2]) >= $score && !$added){
                array_push($newPlayers, $actualPlayer);
                for($k = $j; $k < sizeof($players)-1; $k++){
                    array_push($newPlayers, $players[$k]);
                }
                $open = fopen("leaderboard.txt", "w") or die ("Problème d'ouverture du fichier liste"); 
                for($x = 0; $x < sizeof($newPlayers); $x++){
                    $line2write = $newPlayers[$x];
                    fwrite($open, $line2write);
                }
                fclose($open);
                $added = true;
                return;
            }
            else{
                array_push($newPlayers, $players[$j]);
            }
        }
        if(!$added){
            array_push($newPlayers, $actualPlayer);
        }

        $open = fopen("leaderboard.txt", "w") or die ("Problème d'ouverture du fichier liste"); 
        for($x = 0; $x < sizeof($newPlayers); $x++){
            $line2write = $newPlayers[$x];
            fwrite($open, $line2write);
        }
        var_dump($newPlayers);
        fclose($open);
    }



    
    
    
?>

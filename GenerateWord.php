#!/usr/local/bin/php
<?php 
    $open = fopen("liste_francais.txt", "r") or die ("Problème d'ouverture du fichier liste");  
    $tab = array();
    $i = 0;
    $ligne2 = [];
    while(!feof($open)){
        $ligne2[$i] = fgets($open);
        $i++;
    }
    fclose($open);
    $temp = explode(' ', $ligne2[0]);
    $randomWord = $temp[rand(0, sizeof($temp))];
    while(strlen($randomWord) < 6 || strlen($randomWord) > 11){
        $randomWord = $temp[rand(0, sizeof($temp))];
    }
    $open = fopen("HangmanWord.txt", "w") or die ("Problème d'ouverture du fichier à écrire"); 
    fwrite($open, $randomWord);
?>
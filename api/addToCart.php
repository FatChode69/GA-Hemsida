<?php
    session_start();
    #$_SESSION["idTag"] = $_POST["idTag"];


    if (empty($_SESSION["cart"])){
    $_SESSION["cart"] = [];
    }


    $nyProdukt = array("id" => $_POST["idTag"], "quantity" => $_POST["quantityTag"]);
    array_push($_SESSION["cart"], $nyProdukt);

    //$minlista = array();
    //array_push($minlista, $nyProdukt); //$nyprodukt
    print_r($_SESSION["cart"]);
?>
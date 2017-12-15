<?php
    //crear conexion
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    //cehcar conexion
    if ($lnk->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    } 

?>
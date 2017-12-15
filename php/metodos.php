<?php
$lnk=mysqli_connect("localhost","root","","cobro") or die('<script>alert("no se pudo conectar ala base"))</script>');
    
function addPropietario($nombre,$apellido)
{
    $sql = "INSERT INTO propietario (nombre, apellido) VALUES ($nombre,$apellido)";    
    mysqli_query($lnk,$sql);
}
?>
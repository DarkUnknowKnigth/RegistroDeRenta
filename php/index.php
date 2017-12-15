<?php
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    $pnom=$_POST['pnombre'];
    $pape=$_POST['papellido'];
    $inom=$_POST['inombre'];
    $iape=$_POST['iapellido'];
    $mon=$_POST['monto'];
    $fec=$_POST['fecha'];

    echo $_POST.split('&');
    $sql1 = "INSERT INTO propietario (nombre, apellido) VALUES ('$pnom', '$pape')";    
    $sql2 = "INSERT INTO inquilino (nombre, apellido) VALUES ('$inom', '$iape')";    
    $sql3 = "INSERT INTO transaccion (monto, fecha) VALUES ('$mon', '$fec')";    
    mysqli_query($lnk,$sql1) or die("no se pudo realizar la insercion en propietario");
    mysqli_query($lnk,$sql2) or die("no se pudo realizar la insercion en inquilino");
    mysqli_query($lnk,$sql3) or die("no se pudo realizar la insercion en transaccion");
    

?>
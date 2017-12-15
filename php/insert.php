<?php
    //crear conexion
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    //cehcar conexion
    if ($lnk->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    } 
    //captura de datos enviados
    $pnom=$_POST['pnombre'];
    $pape=$_POST['papellido'];
    $inom=$_POST['inombre'];
    $iape=$_POST['iapellido'];
    $mon=$_POST['monto'];
    $fec=$_POST['fecha'];
    //consultas
    $sqlc="SELECT idpropietario FROM propietario ORDER BY idpropietario ASC LIMIT 1";
    $sql1 = "INSERT INTO propietario (nombre, apellido) VALUES ('$pnom', '$pape')";    
    $sql2 = "INSERT INTO inquilino (nombre, apellido) VALUES ('$inom', '$iape')";     

    //insercciones
    $status1=($lnk->query($sql1))?('insesion a prop realizada'):('no se pudo realizar la insercion en propietario');
    $propid = $lnk->insert_id;
    $status2=($lnk->query($sql2))? ('insersion a inqui realizada'):('no se pudo realizar la insercion en inquilino');
    $inqid = $lnk->insert_id;
    $sql3 = "INSERT INTO transaccion (monto, fecha,idinquilino,idpropietario) VALUES ('$mon', '$fec','$inqid','$propid')"; 
    $status3=($lnk->query($sql3))?('insersion a transac realizada'):('no se pudo realizar la insercion en transaccion');
    echo 'resultados: '.$status1.', '.$status2.', '.$status3;
    
    $lnk->close();
?>
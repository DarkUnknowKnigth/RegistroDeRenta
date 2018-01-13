<?php
    //crear conexion
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    //cehcar conexion
    if ($lnk->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }
    $mon=$_POST['monto'];
    $fec=$_POST['fecha'];
    switch($_POST['tipo']){
        case 'tt':
        //captura de datos enviados
            $propid = $_POST['idpropietario'];
            $inqid = $_POST['idinquilino'];
            $sql3 = "INSERT INTO transaccion (monto, fecha,idinquilino,idpropietario) VALUES ('$mon', '$fec','$inqid','$propid')"; 
            $status3=($lnk->query($sql3))?('insersion a transac realizada'):('no se pudo realizar la insercion en transaccion');
            echo 'resultados: '.$status3;
            break;
        case 'tf':
            $propid = $_POST['idpropietario'];
            $inom=$_POST['inombre'];
            $iape=$_POST['iapellido'];
            $sql2 = "INSERT INTO inquilino (nombre, apellido) VALUES ('$inom', '$iape')";  
            $status2=($lnk->query($sql2))? ('insersion a inqui realizada'):('no se pudo realizar la insercion en inquilino');
            $inqid = $lnk->insert_id;
            $sql3 = "INSERT INTO transaccion (monto, fecha,idinquilino,idpropietario) VALUES ('$mon', '$fec','$inqid','$propid')"; 
            $status3=($lnk->query($sql3))?('insersion a transac realizada'):('no se pudo realizar la insercion en transaccion');
            echo 'resultados: '.$status2.', '.$status3;
            
        break;
        case 'ft':      
            $inqid = $_POST['idinquilino'];
            $pnom=$_POST['pnombre'];
            $pape=$_POST['papellido'];
            $sql1 = "INSERT INTO propietario (nombre, apellido) VALUES ('$pnom', '$pape')";  
            $status1=($lnk->query($sql1))?('insesion a prop realizada'):('no se pudo realizar la insercion en propietario');
            $propid = $lnk->insert_id; 
            $sql3 = "INSERT INTO transaccion (monto, fecha,idinquilino,idpropietario) VALUES ('$mon', '$fec','$inqid','$propid')"; 
            $status3=($lnk->query($sql3))?('insersion a transac realizada'):('no se pudo realizar la insercion en transaccion');
            echo 'resultados: '.$status1.' , '.$status3;
        break;
    } 
    
    $lnk->close();
?>
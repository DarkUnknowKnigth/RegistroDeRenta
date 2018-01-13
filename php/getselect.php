<?php
    $url="localhost";
    $pass="";
    $db="cobro";
    $user="root";
    $conn= new mysqli($url,$user,$pass,$db) or die('error en la coneccion de la base de datos');
    if($_POST['tabla']=='propietario')
    {
        $sql = "SELECT idpropietario,nombre,apellido FROM propietario ORDER BY idpropietario";
        $result = $conn->query($sql);
        $tabla="";
        if ($result->num_rows > 0) 
        {
            while($row = $result->fetch_assoc()) 
            {
                $tabla.= 
                '<option value="'.$row["idpropietario"].'">
                '.$row["nombre"].' '.$row["apellido"].'</option>';
            }
            echo $tabla;
        } 
        else 
        {
            echo "0 results";
        }
    }
    else if($_POST['tabla']=='inquilino')
    {
        $sql = "SELECT idinquilino,nombre,apellido FROM inquilino ORDER BY idinquilino";
        $result = $conn->query($sql);
        $tabla="";
        if ($result->num_rows > 0) 
        {
            while($row = $result->fetch_assoc()) 
            {
                $tabla.= 
                '<option value="'.$row["idinquilino"].'">
                '.$row["nombre"].' '.$row["apellido"].'</option>';
            }
            echo $tabla;
        } 
        else 
        {
            echo "0 results";
        }
    }
    else{
        die('no se recibio un valor esperado');
    }
    $conn->close();
?>
<?php
    $url="localhost";
    $pass="";
    $db="cobro";
    $user="root";
    $conn= new mysqli($url,$user,$pass,$db);
    if(!preg_match('/^[a-zA-Z0-9, ]*$/',$_POST['palabra']))
    {
        die("busqueda invalida");
    }
    if($conn->connect_error)
    {
        die("fallo en la coneccion: "+$conn->conenct_error);
    }
    $palabra=$_POST['palabra'];
    $tipo=$_POST['tipo'];
    switch($tipo)
    {
        case "nombre":
            $sql = "SELECT
            inquilino.idinquilino as ID,
            inquilino.nombre as NI, 
            inquilino.apellido as AI
            FROM inquilino 
            WHERE inquilino.nombre LIKE '%".$palabra."%'";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=tri_".$row["ID"].">
                    <td>
                        <input type= 'radio' class='btni_m_ ' name='rowi' value='".$row["ID"]."'>
                    </td>
                    <td>".$row["ID"]."</td>
                    <td>".$row["NI"]."</td>
                    <td>".$row["AI"]."</td>
                    </tr>";
                }
                echo $tabla;
                break;
            } 
            else 
            {
                echo "0 results";
                break;
            }
        case "apellido":
            $sql = "SELECT 
            idinquilino as ID,
            nombre as NI, 
            apellido as AI
            FROM inquilino 
            WHERE inquilino.apellido LIKE '%".$palabra."%';";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=tri_".$row["ID"].">
                    <td>
                    <input type= 'radio' class='btni_m_ ' name='rowi' value='".$row["ID"]."'>
                    </td>
                    <td>".$row["ID"]."</td>
                    <td>".$row["NI"]."</td>
                    <td>".$row["AI"]."</td>
                    </tr>";
                }
                echo $tabla;
                break;
            } 
            else 
            {
                echo "0 results";
                break;
            }
        case "id":
            $sql = "SELECT 
            inquilino.idinquilino as ID,
            inquilino.nombre as NI, 
            inquilino.apellido as AI
            FROM inquilino 
            WHERE inquilino.idinquilino LIKE ".$palabra;
            $palabra=(int)$palabra;
            if(is_int($palabra) && $palabra!=null)
            {
                $result = $conn->query($sql);
                $tabla="";
                if ($result->num_rows > 0) 
                {
                    // output data of each row
                    while($row = $result->fetch_assoc()) 
                    {
                        $tabla.= 
                        "<tr id=tri_".$row["ID"].">
                        <td>
                            <input type= 'radio' class='btni_m_ ' name='rowi' value='".$row["ID"]."'>
                        </td>
                        <td>".$row["ID"]."</td>
                        <td>".$row["NI"]."</td>
                        <td>".$row["AI"]."</td>
                        </tr>";
                    }
                    echo $tabla;
                    break;
                } 
                else 
                {
                    echo "0 results";
                    break;
                }  
            }
            else
            {
                die("caracteres no validos");
            }
        default:
            echo 'no se encontro un tipo de dato valido';
        break;
    }
    $conn->close();

?>

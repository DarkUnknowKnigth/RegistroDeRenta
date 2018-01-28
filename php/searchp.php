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
            $sql = "SELECT idpropietario,nombre,apellido FROM propietario WHERE nombre LIKE '%".$palabra."%'";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trp_".$row["idpropietario"].">
                    <td class="."col-auto mr-auto".">
                        <input type= 'radio' class='btnp_m_' name='rowp' value='".$row["idpropietario"]."'>
                    </td>
                    <td>".$row["idpropietario"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
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
            $sql = "SELECT idpropietario,nombre,apellido FROM propietario WHERE apellido LIKE '%".$palabra."%'";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trp_".$row["idpropietario"].">
                    <td class="."col-auto mr-auto".">
                        <input type= 'radio' class='btnp_m_' name='rowp' value='".$row["idpropietario"]."'>
                    </td>
                    <td>".$row["idpropietario"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
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
            $sql = "SELECT idpropietario,nombre,apellido FROM propietario WHERE idpropietario LIKE ".$palabra;
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
                        "<tr id=tri_".$row["idpropietario"].">
                        <td>
                            <input type= 'radio' class='btni_m_ ' name='rowi' value='".$row["idpropietario"]."'>
                        </td>
                        <td>".$row["idpropietario"]."</td>
                        <td>".$row["nombre"]."</td>
                        <td>".$row["apellido"]."</td>
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

<?php
    $url="localhost";
    $pass="";
    $db="cobro";
    $user="root";
    $conn= new mysqli($url,$user,$pass,$db);
    if($conn->connect_error)
    {
        die("fallo en la coneccion: "+$conn->conenct_error);
    }
    if(!preg_match('/^[a-zA-Z0-9, ]*$/',$_POST['palabra']))
    {
        die("busqueda invalida");
    }
    $palabra=$_POST['palabra'];
    $tipo=$_POST['tipo'];
    switch($tipo)
    {
        case "propietario":
            $sql = "SELECT 
            DISTINCT(transaccion.idpago) as ID,
            propietario.idpropietario as ID_P,
            inquilino.idinquilino as ID_I,
            propietario.nombre as NP,
            propietario.apellido as AP,
            inquilino.nombre as NI, 
            inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino=inquilino.idinquilino 
            AND (propietario.nombre LIKE '%".$palabra."%' OR propietario.apellido LIKE '%".$palabra."%')
            ORDER BY ID ;";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trt_".$row["ID"].">
                    <td>".$row["ID"]."</td>
                    <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]."</td><td> ".$row["AP"]."</td>
                    <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]."</td><td> ".$row["AI"]."</td>
                    <td>$ ".$row["M"]."</td>
                    <td>".$row["F"]."</td>
                    <td class='col-s mr-auto'>
                        <input type= 'radio' class='btnt_m_' name='rowt' value='".$row["ID"]."'>
                    </td>
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
        case "inquilino":
            $sql = "SELECT 
            DISTINCT(transaccion.idpago) as ID,
            propietario.idpropietario as ID_P,
            inquilino.idinquilino as ID_I,
            propietario.nombre as NP,
            propietario.apellido as AP,
            inquilino.nombre as NI, 
            inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino=inquilino.idinquilino 
            AND (inquilino.nombre LIKE '%".$palabra."%' OR inquilino.apellido LIKE '%".$palabra."%')
            ORDER BY ID ;";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trt_".$row["ID"].">
                    <td>".$row["ID"]."</td>
                    <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]."</td><td> ".$row["AP"]."</td>
                    <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]."</td><td> ".$row["AI"]."</td>
                    <td>$ ".$row["M"]."</td>
                    <td>".$row["F"]."</td>
                    <td class='col-s mr-auto'>
                        <input type= 'radio' class='btnt_m_' name='rowt' value='".$row["ID"]."'>
                    </td>
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
        case "monto":
            $sql = "SELECT 
            DISTINCT(transaccion.idpago) as ID,
            propietario.idpropietario as ID_P,
            inquilino.idinquilino as ID_I,
            propietario.nombre as NP,
            propietario.apellido as AP,
            inquilino.nombre as NI, 
            inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino=inquilino.idinquilino 
            AND transaccion.monto LIKE ".$palabra."
            ORDER BY ID ;";
            $palabra=(float)$palabra;
            if(is_float($palabra) && $palabra!=null)
            {
                $result = $conn->query($sql);
                $tabla="";
                if ($result->num_rows > 0) 
                {
                    // output data of each row
                    while($row = $result->fetch_assoc()) 
                    {
                        $tabla.= 
                        "<tr id=trt_".$row["ID"].">
                        <td>".$row["ID"]."</td>
                        <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]."</td><td> ".$row["AP"]."</td>
                        <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]."</td><td>".$row["AI"]."</td>
                        <td>$ ".$row["M"]."</td>
                        <td>".$row["F"]."</td>
                        <td class='col-s mr-auto'>
                            <input type= 'radio' class='btnt_m_' name='rowt' value='".$row["ID"]."'>
                        </td>
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
                die("tipo de caracter no valido");
            }
        case "fecha":
            $sql = "SELECT 
            DISTINCT(transaccion.idpago) as ID,
            propietario.idpropietario as ID_P,
            inquilino.idinquilino as ID_I,
            propietario.nombre as NP,
            propietario.apellido as AP,
            inquilino.nombre as NI, 
            inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino=inquilino.idinquilino 
            AND transaccion.fecha LIKE '%".$palabra."%' 
            ORDER BY ID ;";
            $result = $conn->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trt_".$row["ID"].">
                    <td>".$row["ID"]."</td>
                    <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]."</td><td> ".$row["AP"]."</td>
                    <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]."</td><td> ".$row["AI"]."</td>
                    <td>$ ".$row["M"]."</td>
                    <td>".$row["F"]."</td>
                    <td class='col-s mr-auto'>
                        <input type= 'radio' class='btnt_m_' name='rowt' value='".$row["ID"]."'>
                    </td>
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
            DISTINCT(transaccion.idpago) as ID,
            propietario.idpropietario as ID_P,
            inquilino.idinquilino as ID_I,
            propietario.nombre as NP,
            propietario.apellido as AP,
            inquilino.nombre as NI, 
            inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino=inquilino.idinquilino 
            AND transaccion.idpago= ".$palabra."
            ORDER BY ID ;";
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
                        "<tr id=trt_".$row["ID"].">
                        <td>".$row["ID"]."</td>
                        <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]."</td><td>".$row["AP"]."</td>
                        <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]."</td><td>".$row["AI"]."</td>
                        <td>$ ".$row["M"]."</td>
                        <td>".$row["F"]."</td>
                        <td class='col-s mr-auto'>
                            <input type= 'radio' class='btnt_m_' name='rowt' value='".$row["ID"]."'>
                        </td>
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
        break;
    }
    $conn->close();

?>

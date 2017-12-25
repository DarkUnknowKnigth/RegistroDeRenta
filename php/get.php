<?php
    //crear conexion
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    //checar conexion
    if ($lnk->connect_error) 
    {
        die("Connection failed: ".$lnk->connect_error);
    } 
    //capturar datos;
    $consulta_n=$_POST['numero'];
    //llenado de tabla
    switch($consulta_n)
    {
        case 1:
            $sql = "SELECT idpropietario,nombre,apellido FROM propietario ORDER BY idpropietario";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trp_".$row["idpropietario"].">
                    <td>".$row["idpropietario"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
                    <td class="."col-auto mr-auto".">
                        <input type= 'radio' class='btnp_m_' name='rowp' value='".$row["idpropietario"]."'>
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
        case 2:
            $sql = "SELECT idinquilino,nombre,apellido FROM inquilino ORDER BY idinquilino";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=tri_".$row["idinquilino"].">
                    <td>".$row["idinquilino"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
                    <td>
                        <input type= 'radio' class='btni_m_ ' name='rowi' value='".$row["idinquilino"]."'>
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
        case 3:
            $sql = "SELECT 
            transaccion.idpago as ID,
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
            AND transaccion.idinquilino =inquilino.idinquilino ORDER BY ID ";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=trt_".$row["ID"].">
                    <td>".$row["ID"]."</td>
                    <td id='".$row['ID_P']."' name='id_p'>".$row["NP"]." ".$row["AP"]."</td>
                    <td id='".$row['ID_I']."' name='id_i'>".$row["NI"]." ".$row["AI"]."</td>
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
        default :
            echo 'ha ocurrido un error ';
            break;
    }
    $lnk->close();
?>
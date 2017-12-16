<?php
    //crear conexion
    $lnk=mysqli_connect('localhost','root','','cobro') or die("no se pudo conectar");
    //checar conexion
    if ($lnk->connect_error) 
    {
        die("Connection failed: ".$conn->connect_error);
    } 
    //capturar datos;
    $consulta_n=$_POST['numero'];
    
    switch($consulta_n)
    {
        case 1:
            $sql = "SELECT idpropietario,nombre,apellido FROM propietario";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr>
                    <td>".$row["idpropietario"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
                    <td><button>modificar</button></td>
                    <td><button>borrar</button></td>
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
            $sql = "SELECT idinquilino,nombre,apellido FROM inquilino";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr>
                    <td>".$row["idinquilino"]."</td>
                    <td>".$row["nombre"]."</td>
                    <td>".$row["apellido"]."</td>
                    <td><button>modificar</button></td>
                    <td><button>borrar</button></td>
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
            propietario.nombre as NP,propietario.apellido as AP,
            inquilino.nombre as NI, inquilino.apellido as AI,
            transaccion.monto as M,
            transaccion.fecha as F 
            FROM transaccion,propietario,inquilino 
            WHERE transaccion.idpropietario=propietario.idpropietario 
            AND transaccion.idinquilino =inquilino.idinquilino";
            $result = $lnk->query($sql);
            $tabla="";
            if ($result->num_rows > 0) 
            {
                // output data of each row
                while($row = $result->fetch_assoc()) 
                {
                    $tabla.= 
                    "<tr id=".$row["ID"].">
                    <td>".$row["ID"]."</td>
                    <td>".$row["NP"]." ".$row["AP"]."</td>
                    <td>".$row["NI"]." ".$row["AI"]."</td>
                    <td>$ ".$row["M"]."</td>
                    <td>".$row["F"]."</td>
                    <td><button>modificar</button></td>
                    <td><button>borrar</button></td>
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
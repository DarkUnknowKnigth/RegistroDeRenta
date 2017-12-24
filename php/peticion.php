<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cobro";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
switch($_POST['tipo'])
{
    case 'request':
        switch($_POST['tabla'])
        {
            case "transaccion":
                $sql='SELECT * FROM '.$_POST['tabla'].' WHERE idpago='.$_POST['id'];
                $result = $conn->query($sql);
                if ($result->num_rows > 0) 
                {
                    // output data of each row
                    while($row = $result->fetch_assoc()) 
                    {
                        echo json_encode(array('monto'=>$row['monto'],'fecha'=>$row['fecha']));
                    }
                } 
                else 
                {
                    echo "0 results";
                }
            break;
            case "inquilino":
                $sql='SELECT * FROM '.$_POST['tabla'].' WHERE idinquilino='.$_POST['id'];
                $result = $conn->query($sql);
                if ($result->num_rows > 0) 
                {
                    // output data of each row
                    while($row = $result->fetch_assoc()) 
                    {
                        echo json_encode(array('inombre'=>$row['nombre'],'iapellido'=>$row['apellido']));
                    }
                } 
                else 
                {
                    echo "0 results";
                }
            break;
                case "propietario":
                $sql='SELECT * FROM '.$_POST['tabla'].' WHERE idpropietario='.$_POST['id'];
                $result = $conn->query($sql);
                if ($result->num_rows > 0) 
                {
                    // output data of each row
                    while($row = $result->fetch_assoc()) 
                    {
                        echo json_encode(array('pnombre'=>$row['nombre'],'papellido'=>$row['apellido']));
                    }
                } 
                else 
                {
                    echo "0 results";
                }
            break; 
        }
        
    break;
    case 'update':
        switch($_POST['tabla'])
        {
            case "transaccion":
                $sql='UPDATE '.$_POST['tabla'].' SET monto = '.$_POST['monto'].', fecha = "'.$_POST['fecha'].
                '" WHERE idpago ='.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                }
            break;
            case "inquilino":
                $sql='UPDATE '.$_POST['tabla'].' SET nombre = "'.$_POST['inombre'].'", apellido = "'.$_POST['iapellido'].
                '" WHERE idinquilino ='.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                }
            break;
            case "propietario":
                $sql='UPDATE '.$_POST['tabla'].' SET nombre = "'.$_POST['pnombre'].'", apellido = "'.$_POST['papellido'].
                '" WHERE idpropietario ='.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                }
            break; 
        }
    break;
    case 'delete':
        switch($_POST['tabla'])
        {
            case "transaccion":
                $sql='DELETE FROM '.$_POST['tabla'].' WHERE idpago = '.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                }
            break;
            case "inquilino":
                $sql='DELETE FROM '.$_POST['tabla'].' WHERE idinquilino = '.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                } 
            break;
            case "propietario":
                $sql='DELETE FROM '.$_POST['tabla'].' WHERE idpropietario= '.$_POST['id'];
                if($conn->query($sql)){
                    echo 'realizado';
                }
                else
                {
                    echo 'error de insercion';
                } 
            break; 
        }
    break;
}

$conn->close();
?>
    

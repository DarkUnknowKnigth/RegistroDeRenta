//carga los componentes y valores
//variables
var ingreso=$("#ingreso");
var consulta=$("#transaccion");
var t_numero=false,t_nom=false;
var error=$("#error");
/*-----configuracion de los componentes iniciales----*/
function set_load()
{   
    t_nom=false;
    t_numero=false;
    $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
    $("#ingreso").click(function(event){change(event,"reg");});
    $("#transaccion").click(function(event){
        change(event,"pago");

    });
    $("#cliente").click(function(event){
        change(event,"cli");
    });
    $("#propietario").click(function(event){
        change(event,"pro");
    });
    $("#submit").click(function(e)
    {
        (valida_f())?(console.log("se valido")):(e.preventDefault());
    });
    $("#reset").click(function(e){});
    $("#monto").click(function(e){test_numero(e);}).prop("min",0).keypress(function(e){test_numero(e)});   
}
/*--------------funcion de tabs------------------------*/
function change(event,id){
    var tabcontent,tablinks;
    tabcontent = $(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
    {
       tabcontent[i].style.display = "none";
    }
    tablinks = $(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active","");
    }
    $("#"+id).css("display","block");
    event.currentTarget.className += " active";
}
/*--------------validacion de  formularios---------------*/
function test_numero(evento)
{  
    {
        console.log(t_numero);
        //verificar campos no permitidos
        if(evento.keyCode==69 || evento.keyCode==101 || evento.keyCode==45 || evento.keyCode==43) 
        {
            evento.preventDefault();
            error.text("Solo numeros");     
            t_numero=false;      
        }  
        else if($("#"+evento.target.id).val()>0)
        {
            t_numero=true;
        } 
        else if($("#"+evento.target.id).val()<0)
        {
           $("#"+evento.target.id).val("");
            error.text("No se permiten numeros negativos");
           t_numero=false;    
        }
        else
        {
            error.text("Solo numeros");
        }
    }
}
//probar texto de todos los campos 
function test_nom(nombre)
{
    for(var i=0;i<nombre.length;i++)
    {
        if(/^[A-z\.\-\s]+$/.test($("#"+nombre[i].id).val()))
        {
            t_nom=true;
        }
        else
        {
            t_nom=false;
            error.text("Ha ingresado caracteres invalidos");

        }
        console.log(t_nom);    
    }
}
//validacion de todo el formulario
function valida_f()
{
    test_nom($(".texto"));
    if(t_nom && t_numero && $("#datepicker").val().length>0)
    {
        var parametros={
            "pnombre":$("#np").val(),
            "papellido":$("#ap").val(),
            "inombre":$("#in").val(),
            "iapellido":$("#ia").val(),
            "monto":$("#monto").val(),
            "fecha":$("#datepicker").val()
        }
        //envio de informacion post
        $.ajax({
            data:parametros,
            url:'php/insert.php',
            type:'POST',
            beforeSend: function(){
                error.html("Procesando").css("color","yellow");
            },
            success: function(respuesta){
                error.html("Registro exito").css("color","green");
                //error.html(respuesta);
            },
            error: function(respuesta){
                error.html("Error en la peticion").css("color","red");
                error.html(respuesta);
            }
        }
        );
        //reset valores
        vaciar()
        return true;
    }
    else
    {    
        error.text("Campos invalidos").css("color","red");
        return false;
    }
}
//vaciar
function vaciar()
{
    t_nom=false;
    t_numero=false;
    error.html("").css("color","red");
    $("#np").val("");
    $("#ap").val("");
    $("#in").val("");
    $("#ia").val("");
    $("#monto").val("");
    $("#datepicker").val("");

}
/*---------------mostrar datos ingresados----------*/
function llenar(tabla)
{
    
} 
/*-----------carga de la funcionalidad------------*/
$(document).ready(function(){
    if(jQuery)
    {
        console.log("se cargo correctamente jQuery :D ");
        set_load();
    }
    else
    {
        console.log("no se pudo cargar el jQuery :( ");
    }

});
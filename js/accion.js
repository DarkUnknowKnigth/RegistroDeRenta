//carga los componentes y valores
//variables
var r="no";
var ingreso=$("#ingreso");
var consulta=$("#transaccion");
var t_numero=false,t_nom=false;
var error=$("#error");
/*-------------selector de disponibilidad--------------------*/
function visible(disp)
{
    switch(disp)
    {
        case "disp_p":
            $("#"+disp).css("display","block"); 
            break;
        case "disp_i":
            $("#"+disp).css("display","block");
            break;
        case "disp_t":
            $("#"+disp).css("display","block");
            break;
        default:
            $("#"+disp).css("display","block");
            break;
    }
}
function novisible()
{
    for(i=0;i<$(".modif").length;i++)
    {
        $(".modif").css("display","none");
    }
}
/*-----configuracion de los componentes iniciales----*/
function set_load()
{   
    t_nom=false;
    t_numero=false;
    $("#datepicker_m").datepicker({dateFormat:"yy-mm-dd"});
    $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
    $("#ingreso").click(function(event){
        change(event,"reg");
    });
    //llenado de tablas y mostrar tablas
    /*------------funicon de transaccion------------*/
    $("#transaccion").click(function(event){
        novisible();
        llenar(3,"#tb_trans");       
        change(event,"pago");
    });
    /*-------modificar tabla de transaccion------*/
    $("#modf_trans").click(function(e){ 
        //solicitar el id del campo selecionado
        var id=boton_p(1);
        var consulta="";
        //sacar los datos de la bd en u json
        if(id!=undefined)
        {
            $(".sel").css("color","black");
            getQuery(id,"transaccion","request");
            // mostrar los datos que posee actualmente
            visible("disp_t");
            // jalar el json de datos actuales
            var json=JSON.parse(r);
            //poner los valores actuales
            $("#monto_m").val(json.monto);
            $("#datepicker_m").val(json.fecha);
            //mostrar los campos permitidos
            $("#form_mod").css("display","block");
            $("#form_mod").dialog();
            //comprobar registro 
            $("#registrar_m").click((e)=>{
                if($("#monto_m").val()>0 && t_numero && $("#datepicker_m").length>0)
                {
                    //modificar
                    modQuery(id,"transaccion","update",{"monto":$("#monto_m").val(),"fecha": $("#datepicker_m").val()})
                    $("#form_mod").dialog("close");
                    $("#transaccion").click();

                }
                else
                {
                    console.log("nel chavo");
                    e.preventDefault();
                }
            });
        }
        else
        {
            $(".sel").css("color","red");
            e.preventDefault();
        }
        
    });
    $("#elim_trans").click((e)=>{
        var id=boton_p(1);
        if(id!=undefined)
        {
            $(".sel").css("color","black");
            delQuery(id,"transaccion","delete");
            $("#transaccion").click();
        }
        else
        {
            $(".sel").css("color","red");
            e.preventDefault();
        }
       
    })
    $("#cancelar_m").click(()=>$("#form_mod").dialog("close"));
    /*--------- funcion de cliente-----------*/
    $("#cliente").click(function(event){
        llenar(2,"#tb_inqui");
        change(event,"cli");
    });
    /*--------modificar tabla de inquilino------------*/
    $("#modf_inqui").click(()=>{

    });
    $("#elim_inqui").click();
    $("#propietario").click(function(event){
        llenar(1,"#tb_prop");
        change(event,"pro");
        
    });
    $("#submit").click(function(e)
    {
        (valida_f())?(console.log("se valido")):(e.preventDefault());
    });
    $("#reset").click(function(e){});
    $("#monto_m").click(function(e){test_numero(e);}).prop("min",0).keypress(function(e){test_numero(e)});
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
                for(i=0;i<1000;i++)
                vaciar();
                //error.html(respuesta);
            },
            error: function(respuesta){
                error.html("Error en la peticion").css("color","red");
                error.html(respuesta);
            }
        }
        );
        //reset valores
        return true;
    }
    else
    {    
        var parametros={
            "pnombre":$("#np").val(),
            "papellido":$("#ap").val(),
            "inombre":$("#in").val(),
            "iapellido":$("#ia").val(),
            "monto":$("#monto").val(),
            "fecha":$("#datepicker").val()
        }

        console.log(parametros+" tn: "+t_nom+" tnm: "+t_numero);
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
function llenar(tabla,donde)
{
    $.ajax({
        data:{"numero":tabla},
        url:'php/get.php',
        type:'POST',
        success: function(respuesta){
            $(donde).html(respuesta);
        },
        error: function(respuesta){
            error.html("no se puedo realizar la consulta");
        }
    });   
} 
/*------buscar el registro seleccionado--------*/
function boton_p(btn)
{
    switch(btn){
        case 1:
            var i=0;
            var s=$("input[name=rowt]").length;
            var botones=$("input[name=rowt]");
            while(i<s)
            {  
                if(botones[i].checked)
                {
                    return botones[i].value;
                    break;
                }
                else
                {
                    i++;
                }  
            }
        break;
        case 2:
            var i=0;
            var s=$("input[name=rowi]").length;
            var botones=$("input[name=rowi]");
            while(i<s)
            {  
                if(botones[i].checked)
                {
                    return botones[i].value;
                    break;
                }
                else
                {
                    i++;
                }  
            }
        break;
        case 3:
            var i=0;
            var s=$("input[name=rowp]").length;
            var botones=$("input[name=rowp]");
            while(i<s)
            {  
                if(botones[i].checked)
                {
                    return botones[i].value;
                    break;
                }
                else
                {
                    i++;
                }  
            }
        break;
        default:
        break;
    }
   
}

/*--------peticion de modificacion----------*/
function getQuery(id,tabla,tipo)
{

    jQuery.ajax({
        async:false,
        data:{"id":id,"tabla":tabla,"tipo":tipo},
        url:'php/peticion.php',
        type:'POST',
    }).done((e)=>{ r=e;});   
}
/*-------modificacion de registro--------------*/
function modQuery(id,tabla,tipo,datos)
{
    switch(tabla)
    {
        case "transaccion":
            jQuery.ajax({
                async:true,
                data:{"id":id,"tabla":tabla,"tipo":tipo,"monto":datos.monto,"fecha":datos.fecha},
                url:'php/peticion.php',
                type:'POST',
            }).done((e)=>{ error.html(e).css("color","green");});  
        break;
        case "inquilino":
        break;
        case "propietario":
        break;
    }
    
}
/*-------borrar un registro-------*/
function delQuery(id,tabla,tipo)
{
    switch(tabla)
    {
        case "transaccion":
            jQuery.ajax({
                async:true,
                data:{"id":id,"tabla":tabla,"tipo":tipo},
                url:'php/peticion.php',
                type:'POST',
            }).done((e)=>{ error.html(e).css("color","green");});  
        break;
        case "inquilino":
        break;
        case "propietario":
        break;
    }
}

/*-----------carga de la funcionalidad------------*/
$(document).ready(function()
{
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
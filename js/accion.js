//falta hacer bien la validacion de cambios y ver que no se repitan los clientes
//implementar una pregunta de eliminar tambien inquilinos y propietarios? cuando de elimina un cobro
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
            alert("no se seleccino un display");
            break;
    }
}
function whats_visible()
{
    for(i=0;i<$(".modif").length;i++)
    {
        if($(".modif")[i].style.display=="block")
        {
            return  $(".modif")[i].id;
        }
    }
}
function novisible()
{
    $(".modif").css("display","none");
}
/*-----configuracion de los componentes iniciales----*/
function set_load()
{  
    t_nom=false;
    t_numero=false;
    $("#datepicker_m").datepicker({dateFormat:"yy-mm-dd"});
    $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
    $("#ingreso").click((event)=>{change(event,"reg");});
    //llenado de tablas y mostrar tablas
    /*------------funicon de transaccion------------*/
    $("#transaccion").click((event)=>{
        novisible();
        // mostrar los datos que posee actualmente
        visible("disp_t");
        llenar(3,"#tb_trans");       
        change(event,"pago");
    });
    /*-------modificar tabla de transaccion------*/
    $("#modf_trans").click((e)=>{ 
        //solicitar el id del campo selecionado
        var id=boton_p("t");
        var consulta="";
        //sacar los datos de la bd en u json
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            getQuery(id,"transaccion","request");
            // jalar el json de datos actuales
            var json=JSON.parse(r);
            //poner los valores actuales
            $("#monto_m").val(json.monto);
            $("#datepicker_m").val(json.fecha);
            //mostrar los campos permitidos
            $("#form_mod").css("display","block").dialog();
            //comprobar registro 
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }    
    });
    /*----------guardar los cambios de la transaccion----------------*/
    $("#registrar_m").click((e)=>{
        console.log(whats_visible());
        switch(whats_visible())
        {
            case "disp_t":
                var id=boton_p("t");
                if($("#monto_m").val()>0 && t_numero && $("#datepicker_m").length>0)
                {
                    //modificar
                    modQuery(id,"transaccion","update",{"monto":$("#monto_m").val(),"fecha": $("#datepicker_m").val()});
                    $("#form_mod").dialog("close");
                    $("#transaccion").click();
                }
                else
                {
                    console.log("nel chavo");
                    e.preventDefault();
                }
            break;
            case "disp_i":
                test_nom(".texi");
                var id=boton_p("i");
                if($("#in_m").length>0 && $("#ia_m").length>0 && t_nom)
                {
                    //modificar
                    modQuery(id,"inquilino","update",{"inombre":$("#in_m").val(),"iapellido": $("#ia_m").val()});
                    $("#form_mod").dialog("close");
                    $("#cliente").click();
                }
                else
                {
                    console.log("nel chavo");
                    e.preventDefault();
                }
            break;
            case "disp_p":
                test_nom(".texp");
                var id=boton_p("p");
                if($("#np_m").length>0 && $("#ap_m").length>0 && t_nom)
                {
                    //modificar
                    modQuery(id,"propietario","update",{"pnombre":$("#np_m").val(),"papellido": $("#ap_m").val()});
                    $("#form_mod").dialog("close");
                    $("#propietario").click();
                }
                else
                {
                    console.log("nel chavo");
                    e.preventDefault();
                }
            break;
            default:
                alert("no se selecciono un display de dialogo");
            break;
        }   
    });
    /*-----------eliminar una transaccion ----------*/
    $("#elim_trans").click((e)=>{
        var id=boton_p("t");
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            delQuery(id,"transaccion","delete");
            $("#transaccion").click();
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
    });
    /*--------cancelar la modificacion de la transaccion----------*/
    $("#cancelar_m").click(()=>$("#form_mod").dialog("close"));
    /*--------- funcion de cliente-----------*/
    $("#cliente").click((event)=>{
        novisible();
        // mostrar los datos que posee actualmente
        visible("disp_i");
        llenar(2,"#tb_inqui");
        change(event,"cli");
    });
    /*--------modificar tabla de inquilino------------*/
    $("#modf_inqui").click((e)=>{
        //solicitar el id del campo selecionado
        var id=boton_p("i");
        var consulta="";
        //sacar los datos de la bd en un json
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            getQuery(id,"inquilino","request");
            // jalar el json de datos actuales
            var json=JSON.parse(r);
            //poner los valores actuales
            $("#in_m").val(json.inombre);
            $("#ia_m").val(json.iapellido);
            //mostrar los campos permitidos
            $("#form_mod").css("display","block").dialog();
            //comprobar registro 
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
    });
    /*---------eliminar a un inquilino----------------*/
    $("#elim_inqui").click((e)=>{
        var id=boton_p("i");
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            delQuery(id,"inquilino","delete");
            $("#cliente").click();
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
    });
    /*---------seleccion de datos del propietario---------*/
    $("#propietario").click((event)=>{
        novisible();
        visible("disp_p");
        llenar(1,"#tb_prop");
        change(event,"pro");   
    });
    /*-----------modificar los campos de propietario------------------*/
    $("#modf_prop").click((e)=>{
        //solicitar el id del campo selecionado
        var id=boton_p("p");
        var consulta="";
        //sacar los datos de la bd en un json
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            getQuery(id,"propietario","request");
            // jalar el json de datos actuales
            var json=JSON.parse(r);
            //poner los valores actuales
            $("#np_m").val(json.pnombre);
            $("#ap_m").val(json.papellido);
            //mostrar los campos permitidos
            $("#form_mod").css("display","block").dialog();
            //comprobar registro 
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
    });
    /*-----------borrar un propietario-------------------*/
    $("#elim_prop").click((e)=>{
        var id=boton_p("p");
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            delQuery(id,"propietario","delete");
            $("#propietario").click();
        }
        else
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
    });
    $("#submit").click((e)=>{(valida_f())?(console.log("se valido")):(e.preventDefault());});
    $("#reset").click(vaciar);
    $("#monto_m").click((e)=>{test_numero(e);}).prop("min",0).keypress(function(e){test_numero(e)});
    $("#monto").click((e)=>{test_numero(e);}).prop("min",0).keypress(function(e){test_numero(e)});   
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
            beforeSend:()=>{
                error.html("Procesando").css("color","yellow");
            },
            success: (respuesta)=>{
                error.html("Registro exito").css("color","green");
                for(i=0;i<1000;i++)
                vaciar();
                //error.html(respuesta);
            },
            error:(respuesta)=>{
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
function vaciar(){
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
function llenar(tabla,donde){
    $.ajax({
        data:{"numero":tabla},
        url:'php/get.php',
        type:'POST',
        success: (respuesta)=>{
            $(donde).html(respuesta);
        },
        error: (respuesta)=>{
            error.html("no se puedo realizar la consulta");
        }
    });   
} 
/*------buscar el registro seleccionado--------*/
function boton_p(btn){
    switch(btn){
        case "t":
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
        case "i":
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
        case "p":
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
            alert("no se encontro un boton esperado");
        break;
    } 
}
/*--------peticion de modificacion----------*/
function getQuery(id,tabla,tipo){
    jQuery.ajax({
        async:false,
        data:{"id":id,"tabla":tabla,"tipo":tipo},
        url:'php/peticion.php',
        type:'POST',
    }).done((e)=>{ r=e;});   
}
/*-------modificacion de registro--------------*/
function modQuery(id,tabla,tipo,datos){
    switch(tabla)
    {
        case "transaccion":
            jQuery.ajax({
                async:false,
                data:{"id":id,"tabla":tabla,"tipo":tipo,"monto":datos.monto,"fecha":datos.fecha},
                url:'php/peticion.php',
                type:'POST',
                cache:false,
            }).done((e)=>{ error.html(e).css("color","green");});  
        break;
        case "inquilino":
            jQuery.ajax({
                async:false,
                data:{"id":id,"tabla":tabla,"tipo":tipo,"inombre":datos.inombre,"iapellido":datos.iapellido},
                url:'php/peticion.php',
                type:'POST',
                cache:false,
            }).done((e)=>{ error.html(e).css("color","green");});  
        break;
        case "propietario":
            jQuery.ajax({
                async:false,
                data:{"id":id,"tabla":tabla,"tipo":tipo,"pnombre":datos.pnombre,"papellido":datos.papellido},
                url:'php/peticion.php',
                type:'POST',
                cache:false,
            }).done((e)=>{ error.html(e).css("color","green");});   
        break;
        default:
            alert("no se obtuvo una tabla");
        break;
    }  
}
/*-------borrar un registro-------*/
function delQuery(id,tabla,tipo){
    jQuery.ajax({
        async:false,
        data:{"id":id,"tabla":tabla,"tipo":tipo},
        url:'php/peticion.php',
        type:'POST',
    }).done((e)=>{
        error.html(e).css("color","green");
    });  
}
/*-----------carga de la funcionalidad------------*/
$(document).ready(()=>{
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
//expoetar a pdf...
//http://anexsoft.com/p/62/exportar-html-a-pdf-en-php-de-manera-facil#
//variables
var r="no";
var m=null;
var ingreso=$("#ingreso");
var consulta=$("#transaccion");
var t_numero=false,t_nom=false,active_select_inquilino=false,active_select_propietario=false;
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
    t_numero=false
    /*-------decidir si ingresar un inquilino un propietario o ambos--------*/
    //$("#seleccionar_ingresos").click(()=>
    function status_select(){
        if($("#prop_chk").prop("checked") && $("#inqui_chk").prop("checked"))
        {
            $("#np").css("display","none");
            $("#ap").css("display","none");
            $("#in").css("display","none");
            $("#ia").css("display","none");
            $("#selc_prop").css("display","block");
            $("#selc_inqui").css("display","block");
            $.ajax({
                method:'POST',
                url:'php/getselect.php',
                data:{'tabla':'propietario'}
            }).done((e)=>{
                $("#selc_prop").html(" <option value='-'>Seleccione un propietario</option>"+e);
            }).fail((e)=>{
                console.log("no se pudo cargar la tabla propietario: "+e);
            });
            $.ajax({
                method:'POST',
                url:'php/getselect.php',
                data:{'tabla':'inquilino'}
            }).done((e)=>{
                $("#selc_inqui").html("<option value='-'>Seleccione un inquilino</option>"+e);
            }).fail((e)=>{
                console.log("no se pudo cargar la tabla inquilino: "+e);
            });
            active_select_inquilino=true;
            active_select_propietario=true;
            console.log("i "+active_select_inquilino+" p "+active_select_propietario);
        }
        else if($("#prop_chk").prop("checked") && !$("#inqui_chk").prop("checked"))
        {
            
            $("#np").css("display","none");
            $("#ap").css("display","none");
            $("#in").css("display","block");
            $("#ia").css("display","block");
            $("#selc_prop").css("display","block");
            $("#selc_inqui").css("display","none");
            $.ajax({
                method:'POST',
                url:'php/getselect.php',
                data:{'tabla':'propietario'}
            }).done((e)=>{
                $("#selc_prop").html(" <option value='-'>Seleccione un propietario</option>"+e);
            }).fail((e)=>{
                console.log("no se pudo cargar la tabla propietario: "+e);
            });
            active_select_inquilino=false;
            active_select_propietario=true;
        }
        else if(!$("#prop_chk").prop("checked") && $("#inqui_chk").prop("checked"))
        {
            $("#np").css("display","block");
            $("#ap").css("display","block");
            $("#in").css("display","none");
            $("#ia").css("display","none");
            $("#selc_prop").css("display","none");
            $("#selc_inqui").css("display","block");
            $.ajax({
                method:'POST',
                url:'php/getselect.php',
                data:{'tabla':'inquilino'}
            }).done((e)=>{
                $("#selc_inqui").html("<option value='-'>Seleccione un inquilino</option>"+e);
            }).fail((e)=>{
                console.log("no se pudo cargar la tabla inquilino: "+e);
            });
            active_select_inquilino=true;
            active_select_propietario=false;           
        }
        else if(!$("#prop_chk").prop("checked") && !$("#inqui_chk").prop("checked"))
        {
            $("#np").css("display","block");
            $("#ap").css("display","block");
            $("#in").css("display","block");
            $("#ia").css("display","block");
            $("#selc_prop").css("display","none");
            $("#selc_inqui").css("display","none");
            active_select_inquilino=false;
            active_select_propietario=false;
        }
        else
        {
            console.log("error");   
        } 
    }
    $("#prop_chk").change(status_select);
    $("#inqui_chk").change(status_select);
    /*-----------------genrer un excel de transacciones--------------------------------------- */
    $("#t_pdf").click((e)=>{
        $("#t_excel").css("display","none");
        $("#t_pdf").css("display","none");
        $("#export_t").css("display","block");
    });
    $("#t_excel").click((e)=>{
        $("#t_excel").css("display","none");
        $("#t_pdf").css("display","none");
        $("#export_t").css("display","block");
        window.open('data:application/vnd.ms-excel,'+encodeURIComponent($('#registro_transacciones').html()));
        e.preventDefault();
    });

     $("#export_t").click((e)=>{
        $("#export_t").css("display","none");
        $("#t_excel").css("display","block");
        $("#t_pdf").css("display","block");
       
    });
    $("#i_pdf").click((e)=>{
        $("#i_excel").css("display","none");
        $("#i_pdf").css("display","none");
        $("#export_i").css("display","block");
    });
    $("#i_excel").click((e)=>{
        $("#i_excel").css("display","none");
        $("#i_pdf").css("display","none");
        $("#export_i").css("display","block");
        window.open('data:application/vnd.ms-excel,'+encodeURIComponent($("#registro_inquilinos").html()));
        e.preventDefault();
    });
    $("#export_i").click((e)=>{
        $("#export_i").css("display","none");
        $("#i_excel").css("display","block");
        $("#i_pdf").css("display","block");
    });
    $("#p_pdf").click((e)=>{
        $("#p_excel").css("display","none");
        $("#p_pdf").css("display","none");
        $("#export_p").css("display","block");
    });
    $("#p_excel").click((e)=>{
        $("#p_excel").css("display","none");
        $("#p_pdf").css("display","none");
        $("#export_p").css("display","block");
        window.open('data:application/vnd.ms-excel,'+encodeURIComponent($("#registro_propietarios").html()));
        e.preventDefault();
    });
    $("#export_p").click((e)=>{
        $("#export_p").css("display","none");
        $("#p_excel").css("display","block");
        $("#p_pdf").css("display","block");
    });
    /*---------------modificar el cuadro de busqueda--------------------*/
    $("#combo").change((e)=>{
            $(".opt").css("background-color","white");
            $("#buscador").datepicker("destroy").attr("type","text");
            $(":selected").css("background-color","green");
            var opcion=$("#combo :selected").val();
            if(opcion=="propietario" || opcion=="inquilino")
            {
                $("#buscador").attr("type","text");
            }
            else if(opcion=="monto")
            {
                $("#buscador").attr({'type':'number','min':0,'step':0.01});
            }
            else if(opcion=="id")
            {
                $("#buscador").attr({'type':'number','min':0,'step':1});
            }
            else if(opcion=="fecha")
            {
                $("#buscador").datepicker({dateFormat:"yy-mm-dd"});
            }
            else{
                alert("no se selecciono una opcion");
            }
    });
    $("#combo_i").change((e)=>{
        $(".opt").css("background-color","white");
        $(":selected").css("background-color","green");
        var opcion=$("#combo_i :selected").val();
        if(opcion=="nombre" || opcion=="apellido")
        {
            $("#buscador_i").attr("type","text");
        }
        else if(opcion=="id")
        {
            $("#buscador_i").attr({'type':'number','min':0,'step':1});
        }
        else
        {
            alert("no se selecciono una opcion");
        }
    });
    $("#combo_p").change((e)=>{
        $(".opt").css("background-color","white");
        $(":selected").css("background-color","green");
        var opcion=$("#combo_p :selected").val();
        if(opcion=="nombre" || opcion=="apellido")
        {
            $("#buscador_p").attr("type","text");
        }
        else if(opcion=="id")
        {
            $("#buscador_p").attr({'type':'number','min':0,'step':1});
        }
        else
        {
            alert("no se selecciono una opcion");
        }
    });
    //buscador on type
    //console.log($("#combo option:selected").val());
    /*--------buscadores-----------------------------*/
    $("#buscador").keyup((e)=>{
        if($("#combo option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador").val().trim(),"tipo":$("#combo option:selected").val()},
                url:"php/search.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_trans").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();
            alert("seleccione un tipo de busqueda");
            
        }
    }).change((e)=>{
        if($("#combo option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador").val().trim(),"tipo":$("#combo option:selected").val()},
                url:"php/search.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_trans").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();            
        }
    });
    $("#buscador_i").keyup((e)=>{
        if($("#combo_i option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador_i").val().trim(),"tipo":$("#combo_i option:selected").val()},
                url:"php/searchi.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_inqui").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();
            alert("seleccione un tipo de busqueda");
            
        }
    }).change((e)=>{
        if($("#combo_i option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador_i").val().trim(),"tipo":$("#combo_i option:selected").val()},
                url:"php/searchi.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_inqui").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();            
        }
    });
    $("#buscador_p").keyup((e)=>{
        if($("#combo_p option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador_p").val().trim(),"tipo":$("#combo_p option:selected").val()},
                url:"php/searchp.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_prop").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();
            alert("seleccione un tipo de busqueda");
            
        }
    }).change((e)=>{
        if($("#combo_p option:selected").val()!="-")
        {
            $.ajax(
            {
                data:{"palabra":$("#buscador_p").val().trim(),"tipo":$("#combo_p option:selected").val()},
                url:"php/searchp.php",
                type:"POST",
            }).done((e)=>
            {
                $("#tb_prop").html(e);
            }).fail((e)=>
            {
                console.log("no se envio");
            });
        }
        else
        {
            e.preventDefault();            
        }
    });
    /*-----eliminar los registros asociados-----*/
    $("#si").click(()=>{
        var f=boton_p("t");
        console.log("se realizo la eliminacion de el inquilino,propietario y transaccion");
        delQuery(f.id,"transaccion","delete");
        delQuery($('td[name=id_p]')[f.position].id,"propietario","delete");
        delQuery($('td[name=id_i]')[f.position].id,"inquilino","delete");
        $("#alert_transacciones").dialog("close");
        $("#transaccion").click();
    });
    $("#no").click(()=>{
        f=boton_p("t");
        console.log("no se elimino el inquilino ni el propietario");
        delQuery(f.id,"transaccion","delete");
        $("#transaccion").click();
        $("#alert_transacciones").dialog("close");
    });
    //////////////////////////////////////////////////////////
    $("#datepicker_m").datepicker({dateFormat:"yy-mm-dd"});
    $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
    $("#ingreso").click((event)=>{
        change(event,"reg");
        $("#error").text("");
        status_select();

    });
    //llenado de tablas y mostrar tablas
    /*------------funicon de transaccion------------*/
    $("#transaccion").click((event)=>{
        novisible();
        // mostrar los datos que posee actualmente
        visible("disp_t");
        llenar(3,"#tb_trans");       
        change(event,"pago");
        $("#combo").prop("selectedIndex",0);
        $("#buscador").val("");
    });
    /*-------modificar tabla de transaccion------*/
    $("#modf_trans").click((e)=>{ 
        $(".sel").show();
        //solicitar el id del campo selecionado
        var f=boton_p("t");
        if(f==undefined)
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
        else
        {    
            var consulta="";
            //sacar los datos de la bd en u json
            if(f.id!=undefined)
            {
                $(".sel").css({"color":"black","font-size":"12px"});
                getQuery(f.id,"transaccion","request");
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
                $(".sel").css({"color":"yellow","font-size":"15px"});
                e.preventDefault();
            }  
        }  
    });
    /*----------guardar los cambios de la transaccion----------------*/
    $("#registrar_m").click((e)=>{
        switch(whats_visible())
        {
            case "disp_t":
                var id=boton_p("t").id;
                if($("#monto_m").val()>0 && t_numero && $("#datepicker_m").length>0)
                {
                    //modificar
                    modQuery(id,"transaccion","update",{"monto":$("#monto_m").val(),"fecha": $("#datepicker_m").val()});
                    $("#form_mod").dialog("close");
                    $("#transaccion").click();
                }
                else
                {
                    alert("no ha realizado una modificacion");
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
                    $("#inquilino").click();
                }
                else
                {
                    alert("no introdujo campos validos");
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
                    alert("no introdujo campos validos");
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
        $(".sel").show();
        var f=boton_p("t");
        if(f==undefined)
        {
            $(".sel").css({"color":"red","font-size":"15px"});
            e.preventDefault();
        }
        else
        {
            if(f.id!=undefined)
            {
                $(".sel").css({"color":"black","font-size":"12px"});
                $("#alert_transacciones").dialog().css("display","block");
            }
            else
            {
                $(".sel").css({"color":"red","font-size":"15px"});
                e.preventDefault();
            }
        }
    });
    /*--------cancelar la modificacion de la transaccion----------*/
    $("#cancelar_m").click(()=>{
        $("#form_mod").dialog("close");
    });
    /*--------- funcion de inquilino-----------*/
    $("#inquilino").click((event)=>{
        novisible();
        // mostrar los datos que posee actualmente
        visible("disp_i");
        llenar(2,"#tb_inqui");
        change(event,"cli");
        $("#combo_i").prop("selectedIndex",0);
        $("#buscador_i").val("");
    });
    /*--------modificar tabla de inquilino------------*/
    $("#modf_inqui").click((e)=>{
        //solicitar el id del campo selecionado
        $(".sel").show();
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
        $(".sel").show();
        var id=boton_p("i");
        if(id!=undefined)
        {
            $(".sel").css({"color":"black","font-size":"12px"});
            delQuery(id,"inquilino","delete");
            $("#inquilino").click();
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
        $("#combo_p").prop("selectedIndex",0);
        $("#buscador_p").val("");
    });
    /*-----------modificar los campos de propietario------------------*/
    $("#modf_prop").click((e)=>{
        $(".sel").show();
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
        $(".sel").show();
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
    $("#submit").click((e)=>{
        if(active_select_inquilino==false && active_select_propietario==false)
        {
            if(valida_f())
            {
                console.log("registro valido: ff");
                $("#ingreso").click();
            }
            else
            {
                e.preventDefault();
                
            }
        }
        else
        {
            if(valida_select())
            {
                console.log("registro valido: tt,tf,ft");
                $("#ingreso").click();
            }
            else
            {
                e.preventDefault();
            }
        }
        
    });
    $("#reset").click(vaciar);
    $("#monto_m").click((e)=>{test_numero(e);}).prop("min",0).keyup(function(e){test_numero(e)});
    $("#monto").click((e)=>{test_numero(e);}).prop("min",0).keyup(function(e){test_numero(e)});   
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
//validar los select cuando ya existe un usuario
function valida_select()
{
    if(active_select_inquilino && active_select_propietario)
    {
        if($("#selc_prop :selected").val()!="-" && $("#selc_inqui :selected").val()!="-" && t_numero && $("#datepicker").val().length>0)
        {
            $.ajax({
                method:'POST',
                url:'php/insertmod.php',
                data:{
                    "tipo":"tt",
                    "monto":$("#monto").val(),
                    "fecha":$("#datepicker").val(),
                    "idpropietario":$("#selc_prop :selected").val(),
                    "idinquilino":$("#selc_inqui :selected").val()
                }
            }).done((e)=>{
                error.css("color","green").text("registro exitoso: tt");
            }).fail((e)=>{
                error.css("color","red").text("registro fallido: tt");
            });
            vaciar();
            return true;
        }
        else
        {
            error.text("Campos invalidos").css("color","red");
            return false;
        }
    }
    else if(active_select_inquilino && !active_select_propietario)
    {
        test_nom([$("#np"),$("#ap")]);
        if($("#selc_inqui :selected").val()!="-" && t_numero && $("#datepicker").val().length>0 && t_nom)
        {
            $.ajax({
                method:'POST',
                url:'php/insertmod.php',
                data:{
                    "tipo":"ft",
                    "monto":$("#monto").val(),
                    "fecha":$("#datepicker").val(),
                    "idinquilino":$("#selc_inqui :selected").val(),
                    "pnombre":$("#np").val(),
                    "papellido":$("#ap").val(),
                }
            }).done((e)=>{
                error.css("color","green").text("registro exitoso: ft");
            }).fail((e)=>{
                error.css("color","red").text("registro fallido: ft");
            });
            vaciar();
            return true;
        }
        else
        {
            error.text("Campos invalidos").css("color","red");
            return false;
        }
    }
    else if(!active_select_inquilino && active_select_propietario)
    {
        test_nom([$("#in"),$("#ia")]);
        if($("#selc_prop :selected").val()!="-" && t_numero && $("#datepicker").val().length>0 && t_nom)
        {
            $.ajax({
                method:'POST',
                url:'php/insertmod.php',
                data:{
                    "tipo":"tf",
                    "monto":$("#monto").val(),
                    "fecha":$("#datepicker").val(),
                    "idpropietario":$("#selc_prop :selected").val(),
                    "inombre":$("#in").val(),
                    "iapellido":$("#ia").val(),
                }
            }).done((e)=>{
                error.css("color","green").text("registro exitoso: tf");
            }).fail((e)=>{
                error.css("color","red").text("registro fallido: tf");
            });
            vaciar();
           return true;
        }
        else
        {
            error.text("Campos invalidos").css("color","red");
            return false;
        }
    }
    else
    {
        console.log("ingreso normal");
        return false;
    }
}
//validacion de todo el formulario normal
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
    $("#selc_prop").val("-");
    $("#selc_inqui").val("-");
    $("#prop_chk").prop("checked",0);
    $("#inqui_chk").prop("checked",0);
}
/*---------------mostrar datos ingresados----------*/
function llenar(tabla,donde){
    $.ajax({
        data:{"numero":tabla},
        url:'php/get.php',
        type:'POST',
        success: (respuesta)=>{
            $(donde).html(respuesta);
            $(".sel").hide();
        },
        error: (respuesta)=>{
            error.html("no se puedo realizar la consulta");
        }
    });   
} 
/*------buscar el registro seleccionado--------*/
function boton_p(btn)
{
    switch(btn){
        case "t":
            var i=0;
            var s=$("input[name=rowt]").length;
            var botones=$("input[name=rowt]");
            while(i<s)
            {  
                if(botones[i].checked)
                {
                    return {"id":botones[i].value,"position":i}; 
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
/*-----------buscador ---------------*/

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
        set_load();
    }
    else
    {
        console.log("no se pudo cargar el jQuery :( ");
    }
});
//carga los componentes y valores
//variables
var ingreso=$("#ingreso");
var consulta=$("#consulta");
function set_load()
{
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd"
      });
    $("#ingreso").click(function(event){
        change(event,"reg");
        
    });
    $("#consulta").click(function(event){
        change(event,"resp");
    });
}
function change(event,id){
    var tabcontent, tablinks;
    tabcontent = $(".tabcontent");
    //console.log(tabcontent);
    for (i = 0; i < tabcontent.length; i++) 
    {
       tabcontent[i].style.display = "none";
    }
    tablinks = $(".tablinks");
    //console.log(tablinks);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active","");
    }
    $("#"+id).css("display","block");
    event.currentTarget.className += " active";

}
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
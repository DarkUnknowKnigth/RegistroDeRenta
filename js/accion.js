//carga los componentes y valores
function set_load()
{
    $("#datepicker").datepicker();
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
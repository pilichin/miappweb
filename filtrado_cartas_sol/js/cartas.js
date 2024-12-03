$(document).ready(iniciar);

function iniciar(){
	$.get("mates.xml").then(cargar).catch(error);
	$("#entrada").keyup(function () { 
		// $.get("mates.xml",cargar);
		$.get("mates.xml").then(cargar).catch(error);
	});
}

function error(e)
{
	e.status==404?console.log(e.responseText):null;
}

function cargar(xml)
{
	var entrada=$("#entrada").val();
	entrada=entrada.toUpperCase();
	
	// var matematicos=(entrada.length==0?$(xml).find("matematico"): $(xml).find("matematico").find("pais:contains('"+entrada+"')").parent());

	var matematicos=$(xml).find("matematico");	
	// var matematicos2= matematicos.filter(function(){
	// 	//map otra altenativa
	// 	// if ($(this).find("pais").text()==entrada)
	// 	var pais= $(this).find("pais").text();
	// 	// var nombre=$(this).find("nombre").text()
	// 	// var apellido=$(this).find("apellido").text();
	// 	pais=pais.toUpperCase();
	// 	// nombre=nombre.toUpperCase();
	// 	// apellido=apellido.toUpperCase();
	// 	// var todo= pais+' '+nombre+' '+apellido;
	// 	// return ((entrada.length==0?$(this):(todo.indexOf(entrada)!=-1?$(this):null)));
	// 	return (pais.indexOf(entrada) !=-1)
	// })

	var matematicos2= $(xml).find('matematico').find('pais').filter(function(){
		return $(this).text().toUpperCase().indexOf(entrada) != -1;
	}).parent();
	
      console.log(matematicos2);
    
	// matematicos.sort(function(a, b) {
    //   var A = $(a).find("nacimiento").text();
    //   var B = $(b).find("nacimiento").text();
    //   return B - A; /*mayor a menor, A - B mayor a menor */
    // });
	 
$("#cartas").empty();

$(matematicos2).each(function() {
     let contenedor = $("<div class='carta'></div>");
	 let cara1 = $("<div class='cara1'></div>");
	 let cara2 = $("<div class='cara2'></div>");
	 cara1.append($("<img>").attr("src","img/"+$(this).find("imagen").text()));
	 contenedor.append(cara1);
	 cara2.append("<h1>"+ $(this).find("nombre").text() + " " + $(this).find("apellido").text()+"</h1>");
   	 cara2.append("<h2>("+ $(this).find("nacimiento").text() + "-" + $(this).find("fallecimiento").text()+")</h1>");	
	 cara2.append("<h2>"+ $(this).find("pais").text()+"</h2>");
	 cara2.append("<p>" +  $(this).find("biografia").text()+ "</p>");
	 contenedor.append(cara2);
	 $("#cartas").append(contenedor);	
    });

}
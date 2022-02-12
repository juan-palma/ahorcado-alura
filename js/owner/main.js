/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
var idagl = {};
idagl.elementos = {};
var el = idagl.elementos;

// -- Opciones de control y valores para el sistema ---
var control = {
	"Encriptar":{
		"busqueda":/a|e|i|o|u/g,
		"valores":{ "a":"ai", "e":"enter", "i":"imes", "o":"ober", "u":"ufat" },
		"mensaje":"Se encripto su texto"
	},
	"Desencriptar":{
		"busqueda":/ai|enter|imes|ober|ufat/g,
		"valores":{ "ai":"a", "enter":"e", "imes":"i", "ober":"o", "ufat":"u" },
		"mensaje":"Se ha desencriptado su texto"
	},
	"validar":{
		"texto":/[^a-z\s]/g,
		"permitidos":/Backspace/
	},
	"mensajes":{
		"copiado":"Texto copiado en el portapapeles",
		"pegado":"Se envio el texto al encriptador",
		"soloMinusculas":"Introdusca solo minusculas",
		"incorrecto":"El texto no es valido",
		"vacio":"El campo esta vacío, introduce un texto a procesar",
		"limpio":"¡Limpio! :)"
	}
};


// ::::::::::::::::: Funciones :::::::::::::::::
//Aplicacion de la encriptacion/desencriptacion
function agregarPalabra(){
}
//Funcion de copia de texto
function limpiar(){
	
}
function play(e){
	console.log(e);
}

function teclado(e){
	console.log(e);
	console.log(e.type);
	//if(!validar(el.input)){return false;}
	document.getElementById('btnPlay').textContent = e.key;
}

// ::::::::::::::::: Procesos :::::::::::::::::
function activeTeclado(){
	document.onkeydown = teclado;
	document.onkeyup = teclado;
}
function iniciar(){
	//variables de valores predefinidos que pueden cambiar con condicones posteriores del codigo
	let btnPlayEvent = "click";

	//habilitar funciones para moviles:
	if(el.mobile = /Mobile/i.test(navigator.userAgent)){
		if(el.touch = Modernizr.touchevents){
			btnPlayEvent = "touchend";
		}
	} else{
		activeTeclado();
	}

	//Obtener elementos del html
	el.btnPlay = document.getElementById('btnPlay');
	el.btnPlay.addEventListener(btnPlayEvent, play);
	el.teclado = document.getElementById('teclado');
}




// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['l/modernizr', 'validaciones', 'alertas'], iniciar);

// if (document.readyState === "complete" || document.readyState === "interactive") {
// 	activeTeclado();
// } else {
// 	document.addEventListener("DOMContentLoaded", activeTeclado);
// }
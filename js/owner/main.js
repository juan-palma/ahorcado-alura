/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;

// -- Opciones de control y valores para el sistema ---
const dbPalabras = {
	"registro":['general', 'niños', 'comida', 'animales', 'colores', 'peliculas', 'caciones', 'anime'],
	"general":['lapiz', 'carro', 'lavadora', 'avenida', 'regadera', 'puerta', 'bocinas', 'television', 'alberca', 'parque'],
	"niños":['caricaturas', 'consola', 'pelota', 'freefire', 'cars', 'juguetes' ,'muñeca', 'patineta', 'parque', 'helado'],
	"comida":['hambruguesa', 'pizza', 'mole', 'gorditas', 'quesadillas', 'elote', 'pastes', 'carnitas', 'posole', 'taquitos'],
	"animales":['cuervo', 'gallo', 'vaca', 'leon', 'cocodrilo', 'elefante', 'rinoceronte', 'venado', 'girafa', 'perezoso'],
	"colores":['rojo', 'morado', 'violeta', 'purpura', 'fiusha', 'cafe', 'indigo', 'naranja', 'dorado', 'plateado'],
	"peliculas":['harry potter', 'avengers', 'mujer bonita', 'matrix', 'terminator', 'shazam', 'no respires', 'inframundo', 'pulp fiction', 'blade runner'],
	"caciones":['poker face', 'la carencia', 'wind of change', 'despacito', 'dance monkey', 'echoes', 'enter sadman', 'personal jesus', 'la flaca', 'matador', 'travesuras'],
	"anime":['attack on titan', 'boku no hero', 'sword art online', 'une punch man', 'fullmetal alchemist', 'samurai X', 'dragon ball', 'naruto', 'inuyasha', 'bleach', 'une pice']
};
const control = {
	"categoria":"",
	"dificultades":{ "facil":12, "dificil":6 },
	"dificultad":"",
	"palabraJugar":"",
	"palabraJugarA":[],
	"palabraJugarCompleta":[],
	"palabrasBien":"",
	"palabrasMal":"",
	"intentos":0,
	"resultado":"",
	"run":false,
	"validar":{
		"texto":/[^a-zA-Z\u00f1\u00d1]/,
		"texto2":/[a-zA-Z\s\u00f1\u00d1]/,
		"excluir":/Escape|Tab|Shift|Control|Alt|Meta|CapsLock|Backspace|Dead/
	},
	"mensajes":{
		"sinpalabras":"Ahaa.. eres implacable, ya no hay mas palabras para jugar en esta categoria.",
		"incorrecto":"El texto no es valido, solo introducir letras sin acentos ni caracteres especiales",
		"dificultad":"Debe de elegir un nivel de dificultad",
		"categoria":"Debe de elegir una categoria",
		"limpio":"¡Limpio! :)"
	},
	"escenario":{
		"letraBien": "#9acd32",
		"letraMal": "rgba(255,255,255,0.3)",
		"largoBaseLineaLetras": 28,
		"grosorBaseLineaLetras": 2,
		"alturaBaseLineaLetras": 70,
		"margenBaseLineaLetras": 8
	}
};
let btnPlayEvent = "click";
let arrayWork = [];



// ::::::::::::::::: Funciones :::::::::::::::::
function limpiarJugar(){
	control.palabrasBien = "";
	control.palabrasMal = "";
	control.intentos = 0;
	control.resultado = "";
	el.gano.innerHTML = "";
	el.perdio.innerHTML = "";

	let pincel = el.canvasPalabra.getContext("2d");
	pincel.clearRect(0, 0, el.canvasPalabra.width, el.canvasPalabra.height);
}
function limpiar(){
	control.categoria = "";
	control.palabraJugar = "";
	control.palabraJugarA = [];
	control.palabraJugarCompleta = [];
	control.palabrasBien = "";
	control.palabrasMal = "";
	control.intentos = 0;
	control.resultado = "";
	el.gano.innerHTML = "";
	el.perdio.innerHTML = "";
	arrayWork = [];

	let pincel = el.canvasPalabra.getContext("2d");
	pincel.clearRect(0, 0, el.canvasPalabra.width, el.canvasPalabra.height);
}
function salir(){
	el.btnSettings.style.right = "20px";
	el.btnPlay.style.display = "block";
	el.btnSalir.style.display = "none";
	el.erroresBox.classList.add('opacidad0');
	control.run = false;
	limpiar();
	offTeclado();
}
function aleatorio(rango){
	return Math.round(Math.random() * (rango[1] - rango[0])) + rango[0];
}

function addPalabra(){
	if(!control.validar.texto.test(el.inputAddPalabra.value)){
		dbPalabras[el.addPalabraCategoria.value].push(el.inputAddPalabra.value);
	} else{
		alert(control.mensajes.incorrecto);
	}
}
function agegarCategoria(){
	let categoria = prompt('Nombre de la categoria a crear');
	categoria = categoria.toLowerCase();
	if(!control.validar.texto.test(categoria)){
		if(!dbPalabras.hasOwnProperty(categoria)){
			dbPalabras[categoria] = [];
			dbPalabras.registro.push(categoria);
			const valor = document.createElement('option');
			valor.value = categoria;
			valor.textContent = categoria.replace(/^\w/, (c) => c.toUpperCase());
			el.categoria.appendChild(valor);
			const valorClone = valor.cloneNode(true);
			el.addPalabraCategoria.appendChild(valorClone);
			el.addPalabraCategoria.value = categoria;
		} else{
			alert('La categoria ya existe');
		}
	} else{
		alert(control.mensajes.incorrecto);
	}
}
function resultado(estado){
	control.resultado = estado;
	el.btnPlay.style.display = "block";
	if(estado == 'gano'){
		const img = document.createElement('img');
		img.src = "img/msnGano.gif";
		el.gano.appendChild(img);
		el.gano.classList.add('activo');
	} else{
		const img = document.createElement('img');
		img.src = "img/msnPerdio.gif";
		img.onload = function(){
			this.classList.add('activo');
		}
		el.perdio.appendChild(img);
		el.perdio.classList.add('activo');
	}
	offTeclado();
}
function acierto(e){
	const es = control.escenario;
	const letra = e.key.toLowerCase();
	control.palabraJugarA.forEach(function(l, i){
		if(l == letra){
			let pincel = el.canvasPalabra.getContext("2d");
			const posicionX =  ((es.largoBaseLineaLetras + es.margenBaseLineaLetras) * i) + (es.largoBaseLineaLetras / 2);
			pincel.fillStyle = es.letraBien;
			pincel.textAlign = "center";
			pincel.font="600 30px Lato";
			pincel.fillText(letra.toUpperCase(), posicionX, (es.alturaBaseLineaLetras - 13));
			control.palabraJugarCompleta[i] = letra;
			if(!control.palabraJugarCompleta.includes(undefined)){
				resultado('gano');
			}
		} else if(l == " "){
			control.palabraJugarCompleta[i] = " ";
		}
	});
}
function fallo(e){
	const es = control.escenario;
	const letra = e.key.toLowerCase();

	control.intentos++;
	el.vidas.textContent = (control.dificultades[control.dificultad] - control.intentos);
	const letraError = document.createElement('span');
	letraError.textContent = letra.toUpperCase();
	el.errores.appendChild(letraError);
	if(control.intentos >= control.dificultades[control.dificultad] ){
		control.palabraJugarA.forEach(function(l, i){
			if(control.palabraJugarCompleta[i] == undefined){
				let pincel = el.canvasPalabra.getContext("2d");
				const posicionX =  ((es.largoBaseLineaLetras + es.margenBaseLineaLetras) * i) + (es.largoBaseLineaLetras / 2);
				pincel.fillStyle = es.letraMal;
				pincel.textAlign = "center";
				pincel.font="600 30px Lato";
				pincel.fillText(l.toUpperCase(), posicionX, (es.alturaBaseLineaLetras - 13));
			}
		});
		resultado('perdio');
	} 
}
function escenario(accion){
	const es = control.escenario;
	if(accion == 'on'){
		let pincel = el.canvasPalabra.getContext("2d");
		el.canvasPalabra.width = (control.palabraJugarA.length * es.largoBaseLineaLetras) + ((control.palabraJugarA.length - 1) * es.margenBaseLineaLetras );
		pincel.clearRect(0, 0, el.canvasPalabra.width, el.canvasPalabra.height);
		pincel.lineWidth = es.grosorBaseLineaLetras;
		pincel.strokeStyle = "#fff";
		pincel.lineCap='round';
		control.palabraJugarA.forEach(function(l, i){
			console.log(l);
			if(l != " "){
				const posicionX =  (es.largoBaseLineaLetras + es.margenBaseLineaLetras) * i;
				pincel.beginPath();
				pincel.moveTo(posicionX, es.alturaBaseLineaLetras);
				pincel.lineTo((posicionX + es.largoBaseLineaLetras), es.alturaBaseLineaLetras);
				pincel.stroke();
			}
		});
		el.vidas.textContent = control.dificultades[control.dificultad];

		pincel.font="600 30px Lato";
		pincel.fillText(" ", 0, 0);

		return true;
	} else if(accion = 'off'){
		return true;
	}
}
function teclado(e){
	if(control.resultado != ""){return false;}
	const letra = e.key.toLowerCase();
	if (limitarEntrada(e)) {
		const letraRegEx = new RegExp(letra, 'i');
		if(letraRegEx.test(control.palabraJugar)){
			if(!letraRegEx.test(control.palabrasBien)){
				control.palabrasBien += letra;
				acierto(e);
			}
		} else{
			if(!letraRegEx.test(control.palabrasMal)){
				control.palabrasMal += letra;
				fallo(e);
			}
		}
	}
}
function onTeclado(){
	//document.onkeydown = teclado;
	if(escenario('on')){
		if(!el.mobile){
			document.onkeyup = teclado;
		} else{

		}
	};
	
}
function offTeclado(){
	//document.onkeydown = "";
	if(!el.mobile){
		document.onkeyup = '';
	} else{

	}
}
function getPalabra(){
	let palabra = false;
	if(arrayWork.length > 0){
		const nAl = aleatorio([0,arrayWork.length-1]);
		palabra = arrayWork[nAl];
		control.palabraJugarA = [...palabra];
		control.palabraJugarCompleta.length = palabra.length;
		arrayWork.splice(nAl, 1);
	} else{
		aviso(el.btnPlay, control.mensajes.sinpalabras);
	}
	return palabra;
}
function dificultad(e){
	control.dificultad = this.id.replace('nivel', '').toLowerCase();
	if(control.dificultad == 'facil'){
		el.btnFacil.classList.add('activo');
		el.btnDificil.classList.remove('activo');
	} else{
		el.btnDificil.classList.add('activo');
		el.btnFacil.classList.remove('activo');
	}
}
function categoria(){
	if(control.categoria != ""){return false;}
	control.categoria = el.categoria.value;
	if(control.categoria == ""){
		alert(control.mensajes.categoria);
		return false;
	} else if(control.categoria == "todo"){
		dbPalabras.registro.forEach(function(a){ arrayWork = arrayWork.concat(dbPalabras[a]); });
	} else{
		arrayWork = Array.from(dbPalabras[control.categoria]);
	}
	return true;
}
function showOpciones(e){
	if(this.estado == 'on'){
		el.boxOpciones.classList.add('show');
		this.classList.add('active');
		this.estado = 'off';
	} else if(this.estado == 'off'){
		el.boxOpciones.classList.remove('show');
		this.classList.remove('active');
		this.estado = 'on';
	}
}
function opciones(e){
	if (control.categoria == "" || control.dificultad == "") {
		if(e.target.id == 'btnPlay'){
			el.btnSettings.click();
		} else if(e.target.id == 'btnComenzar'){
			let detener = false;
			let mensajes = "";
			if(control.dificultad == ""){ mensajes += control.mensajes.dificultad + "\n\r"; detener = true; }
			if(el.categoria.value == ""){ mensajes += control.mensajes.categoria + "\n\r"; detener = true; }
			if(detener){alert(mensajes); return false;}
			if(categoria()){
				el.btnSettings.click();
				control.run = true;
				el.btnSettings.style.right = "inherit";
				el.btnPlay.style.display = "none";
				el.btnSalir.style.display = "block";
				el.erroresBox.classList.remove('opacidad0');
				setTimeout(function(){ play(e); }, 600, e);
			}
		}
		return false;
	}
	return true;
}
function play(e){
	if(opciones(e)){
		control.palabraJugar = getPalabra();
		limpiarJugar();
		if(control.palabraJugar){
			onTeclado();
		} else{
			offTeclado();
		};
	}
}



// ::::::::::::::::: Procesos :::::::::::::::::
function iniciar(){
	//habilitar funciones para moviles:
	if(el.mobile = /Mobile/i.test(navigator.userAgent)){
		if(el.touch = Modernizr.touchevents){
			btnPlayEvent = "touchend";
		}
	}
	//Obtener elementos del html
	el.btnPlay = document.getElementById('btnPlay');
	el.btnPlay.addEventListener(btnPlayEvent, play);
	el.teclado = document.getElementById('teclado');
	el.boxOpciones = document.getElementById('settings');
	el.btnFacil = document.getElementById('nivelFacil');
	el.btnFacil.addEventListener(btnPlayEvent, dificultad);
	el.btnDificil = document.getElementById('nivelDificil');
	el.btnDificil.addEventListener(btnPlayEvent, dificultad);
	el.addPalabraCategoria = document.getElementById('categoriaAdd');
	el.categoria = document.getElementById('categorias');
	dbPalabras.registro.forEach(function(v){
		const valor = document.createElement('option');
		valor.value = v;
		valor.textContent = v.replace(/^\w/, (c) => c.toUpperCase());
		el.categoria.appendChild(valor);
		const valorClone = valor.cloneNode(true);
		el.addPalabraCategoria.appendChild(valorClone);
	});
	el.btnComenzar = document.getElementById('btnComenzar');
	el.btnComenzar.addEventListener(btnPlayEvent, play);
	el.canvasPalabra = document.getElementById('cPalabra');
	el.erroresBox = document.getElementById('erroresBox');
	el.errores = document.getElementById('errores');
	el.vidas = document.querySelector('#vidas .rojo');
	el.gano = document.getElementById('msnGano');
	el.perdio = document.getElementById('msnPerdio');
	el.btnSettings = document.getElementById('nav-toggle');
	el.btnSettings.estado = 'on';
	el.btnSettings.addEventListener('click', showOpciones);
	el.btnMas = document.querySelector('label[for="palabraAdd"]');
	el.masToggle = document.querySelector('#agregarBox .togglehide')
	el.btnMas.addEventListener('click', () => el.masToggle.classList.toggle('activo'));
	el.btnMasCategoria = document.getElementById('addCategoria');
	el.btnMasCategoria.addEventListener('click', agegarCategoria);
	el.inputAddPalabra = document.getElementById('palabraAdd');
	el.btnAddPalabra = document.getElementById('btnAdd');
	el.btnAddPalabra.addEventListener('click', addPalabra);
	el.btnSalir = document.getElementById('btnSalirBox');
	el.btnSalir.addEventListener('click', salir);
}




// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['l/modernizr', 'validaciones', 'alertas'], iniciar);

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
	"comida":['hambruguesa', 'pizza', 'mole', 'gorditas', 'quesadillas', 'elote', 'pastes', 'carnitas', 'pozole', 'taquitos'],
	"animales":['cuervo', 'gallo', 'vaca', 'leon', 'cocodrilo', 'elefante', 'rinoceronte', 'venado', 'girafa', 'perezoso'],
	"colores":['rojo', 'morado', 'violeta', 'purpura', 'fiusha', 'cafe', 'indigo', 'naranja', 'dorado', 'plateado'],
	"peliculas":['harry potter', 'avengers', 'mujer bonita', 'matrix', 'terminator', 'shazam', 'no respires', 'inframundo', 'pulp fiction', 'blade runner'],
	"caciones":['poker face', 'la carencia', 'wind of change', 'despacito', 'dance monkey', 'echoes', 'enter sadman', 'personal jesus', 'la flaca', 'matador', 'travesuras'],
	"anime":['attack on titan', 'boku no hero', 'sword art online', 'one punch man', 'fullmetal alchemist', 'samurai x', 'dragon ball', 'naruto', 'inuyasha', 'bleach', 'one pice']
};
const control = {
	"categoria":"",
	"dificultades":{ "facil":12, "dificil":6 },
	"base":6,
	"dificultad":"",
	"palabraJugar":"",
	"palabraJugarA":[],
	"palabraJugarCompleta":[],
	"palabrasBien":"",
	"palabrasMal":"",
	"intentos":0,
	"resultado":"",
	"run":false,
	"showAllTime":800,
	"audio": true,
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
function limpiarBase(){
	control.palabraJugar = "";
	control.palabraJugarA = [];
	control.palabraJugarCompleta = [];
	control.palabrasBien = "";
	control.palabrasMal = "";
	control.intentos = 0;
	control.resultado = "";
	el.gano.innerHTML = "";
	el.perdio.innerHTML = "";
	el.errores.innerHTML = "";
	el.humano.style.display = "none";
	el.humano.removeAttribute('class');
	el.ovni.removeAttribute('class');
	el.ovni.classList.add('p2');
	el.ovni.classList.add('p1');
	el.ovni.classList.add('p0');
	humanoTarea = "";
	humanoClear();
	ovniTarea = "";
	ovniClear();
	//audioOvni('stop');
	let pincel = el.canvasPalabra.getContext("2d");
	pincel.clearRect(0, 0, el.canvasPalabra.width, el.canvasPalabra.height);
	pincel = el.ahorcado.getContext("2d");
	pincel.clearRect(0, 0, el.ahorcado.width, el.ahorcado.height);
}
function limpiarJugar(){
	limpiarBase();
	el.btnPlay.style.display = "none";
}
function limpiar(){
	limpiarBase();
	arrayWork = [];
}
function salir(){
	el.btnSettings.style.right = "13px";
	el.btnPlay.style.display = "block";
	el.btnSalir.style.display = "none";
	el.erroresBox.classList.add('opacidad0');
	control.run = false;
	control.categoria = "";
	limpiar();
	offTeclado();
}
function dibujar(tramos){
	const es = control.escenario;
	let pincel = el.ahorcado.getContext("2d");
	pincel.strokeStyle = "#fff";
	pincel.lineWidth = es.grosorBaseLineaLetras;
	pincel.lineCap='round';
	if(tramos.hasOwnProperty('color')){
		if(tramos.color.hasOwnProperty('trazo')){
			pincel.strokeStyle = tramos.color.trazo;
		} else if(tramos.color.hasOwnProperty('relleno')){
			pincel.fillStyle = tramos.color.trazo;
		}
	}

	if(tramos.d == 'lineas'){
		pincel.beginPath();
		pincel.moveTo(tramos.m.x, tramos.m.y);
		tramos.l.forEach(function(t, i){
			pincel.lineTo(t.lx, t.ly);
		});
		pincel.stroke();
	} else if(tramos.d == 'circulos'){
		pincel.beginPath();
		tramos.c.forEach(function(c, i){
			let miPi = 2*Math.PI;
			if(c.hasOwnProperty('medio')){
				if(c.medio){
					miPi = 1*Math.PI;
				}
			}
			pincel.arc(c.x, c.y, c.r, 0, miPi, false);
		});
		pincel.stroke();
		
	}
}
function destelloToggle(accion, color=""){
	el.destello.style['background-color'] = (color != "") ? color : '#afffaf';
	if(accion == 'on'){
		el.destello.style['transition-duration'] = "1ms";
		el.destello.style.opacity = 1;
	} else{
		setTimeout(()=>{
			el.destello.style['transition-duration'] = "1s";
			el.destello.style.opacity = 0;
		}, 110);
	}
}
function animaciones(fin=""){
	if(fin == 'gano'){
		let espera = (humanoRun) ? (humanoTiempos * 1.1) : 100;
		humanoTarea = "";
		humanoClear();
		ovniTarea = "";
		ovniClear();
		setTimeout(function(){
			humanoPoder();
			setTimeout(()=>{
				ovniExplota();
				el.humano.classList.remove('p5');
				setTimeout(function(){
					el.ovni.classList.add('p0');
					const img = document.createElement('img');
					img.src = "img/msnGano.webp";
					el.gano.appendChild(img);
					const text = document.createElement('span');
					text.textContent = '¡GANASTE!';
					el.gano.appendChild(text);
					el.gano.classList.add('activo');
					el.btnPlay.style.display = "block";		
				}, 2000);
			}, 4400);
		}, espera);
		
	} else if(control.intentos % (control.dificultades[control.dificultad] / control.base) == 0){
		switch(control.intentos / (control.dificultades[control.dificultad] / control.base)){
			case 0:
				control.run = true;
				el.humano.style.display = "block";
				setTimeout(()=>{ el.humano.classList.add('p1'); humanoRun(); /*ovniRun();*/ }, 100);
				setTimeout(()=>{ control.run = false; }, 1200);
			break;
			case 1:
				destelloToggle('on', '#f00');
				control.run = true;	
				el.ovni.classList.toggle('p0');
				setTimeout(()=>{ destelloToggle('off'); control.run = false; }, 1400);
				dibujar({d:"lineas", m:{x:50, y:90,}, l:[{lx:50, ly:0}]});
			break;
			case 2:
				destelloToggle('on', '#f00');
				control.run = true;	
				el.ovni.classList.remove('p1');
				humanoDealy = 3000;
				humanoTarea = humanoChiflar;
				setTimeout(()=>{ destelloToggle('off'); control.run = false; }, 1400);
				dibujar({d:"lineas", m:{x:50, y:0,}, l:[{lx:80, ly:0}, {lx:80, ly:10}]});
			break;
			case 3:
				destelloToggle('on', '#f00');
				control.run = true;	
				el.ovni.classList.remove('p2');
				humanoDealy = 2000;
				humanoTarea = humanoAdmiracion;
				setTimeout(()=>{ destelloToggle('off'); control.run = false; }, 1400);
				dibujar({d:"circulos", c:[{x:80, y:25, r:15}]});
				dibujar({d:"lineas", m:{x:80, y:40,}, l:[{lx:80, ly:70}]});
			break;
			case 4:
				ovniDealy = 0;
				ovniTarea = ovniChispas;
				humanoDealy = 200;
				humanoTarea = humanoPanico;
				destelloToggle('on', '#f00');
				dibujar({d:"lineas", m:{x:65, y:75,}, l:[{lx:80, ly:70},{lx:95, ly:75}]});
				destelloToggle('off', '#f00');
			break;
			case 5:
				destelloToggle('on', '#f00');
				control.run = true;	
				humanoDealy = 400;
				humanoTarea = humanoResiste;
				ovniTarea = ovniRayo;
				setTimeout(()=>{ el.humano.classList.add('p5'); }, 600);
				setTimeout(()=>{ destelloToggle('off'); control.run = false; }, 1800);
				dibujar({d:"lineas", m:{x:65, y:45,}, l:[{lx:80, ly:50},{lx:95, ly:45}]});
			break;
			case 6:
				destelloToggle('on', '#f00');
				dibujar({d:"lineas", color:{trazo:"#f00"}, m:{x:77, y:20,}, l:[{lx:72, ly:25}]});
				dibujar({d:"lineas", color:{trazo:"#f00"}, m:{x:77, y:25,}, l:[{lx:72, ly:20}]});
				dibujar({d:"lineas", color:{trazo:"#f00"}, m:{x:83, y:20,}, l:[{lx:88, ly:25}]});
				dibujar({d:"lineas", color:{trazo:"#f00"}, m:{x:83, y:25,}, l:[{lx:88, ly:20}]});
				dibujar({d:"lineas", color:{trazo:"#f00"}, m:{x:73, y:30,}, l:[{lx:87, ly:30}]});
				dibujar({d:"circulos", color:{trazo:"#f00"}, c:[{x:84, y:33, r:3, medio:true}]});

				let espera = (humanoRun) ? (humanoTiempos * .5) : 100;
				humanoTarea = "";
				humanoClear();
				ovniTarea = "";
				ovniClear();
				setTimeout(function(){
					el.humano.classList.add('p6');
					setTimeout(function(){
						humanoSuccion();
						setTimeout(function(){
							ovniSuccion();
							setTimeout(function(){
								el.ovni.classList.add('p0');
							}, 1700);
							setTimeout(function(){
								const img = document.createElement('img');
								img.src = "img/msnPerdio.webp";
								img.onload = function(){ this.classList.add('activo'); }
								el.perdio.appendChild(img);
								destelloToggle('off', '#f00');
								el.btnPlay.style.display = "block";	
							}, 3600);
						}, 1000);
					}, 800);
				}, espera);
				
			break;
		}
	}

	return true;
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
	control.palabraJugarA = [];
	control.palabraJugar = "";
	offTeclado();
	animaciones(estado);
}
function acierto(e){
	destelloToggle('on');
	destelloToggle('off');
	
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
	} else{
		animaciones();
	}
}
function escenario(accion){
	const es = control.escenario;
	if(accion == 'on'){
		dibujar({d:"lineas", m:{x:30, y:100,}, l:[{lx:70, ly:100},{lx:50, ly:90},{lx:30, ly:100}]});

		let pincel = el.canvasPalabra.getContext("2d");
		el.canvasPalabra.width = (control.palabraJugarA.length * es.largoBaseLineaLetras) + ((control.palabraJugarA.length - 1) * es.margenBaseLineaLetras );
		pincel.clearRect(0, 0, el.canvasPalabra.width, el.canvasPalabra.height);
		pincel.lineWidth = es.grosorBaseLineaLetras;
		pincel.strokeStyle = "#fff";
		pincel.lineCap='round';
		control.palabraJugarA.forEach(function(l, i){
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

		if(animaciones()){ return true; }
	} else if(accion = 'off'){
		return true;
	}
}
function teclado(e){
	if(control.run){ return false; }
	if(el.mobile){
		e.preventDefault();
		e.cancelBubble = true;
		e.stopPropagation();
		e = e.srcElement;
	}
	if(control.resultado != ""){return false;}
	const letra = e.key.toLowerCase();
	if (limitarEntrada(e)) {
		const letraRegEx = new RegExp(letra, 'i');
		if(letraRegEx.test(control.palabraJugar)){
			if(!letraRegEx.test(control.palabrasBien)){
				control.palabrasBien += letra;
				if(el.mobile){e.classList.add('anuladoBien')}
				audioCorrecto();
				acierto(e);
			}
		} else{
			if(!letraRegEx.test(control.palabrasMal)){
				control.palabrasMal += letra;
				if(el.mobile){e.classList.add('anuladoMal')}
				audioError();
				fallo(e);
			}
		}
	}
}
function onTeclado(){
	if(escenario('on')){
		if(!el.mobile){
			document.onkeyup = teclado;
		} else{
			const teclas = el.teclado.querySelectorAll('.tecla');
			teclas.forEach(function(t){
				t.key = t.id;
				t.addEventListener(btnPlayEvent, teclado);
				t.addEventListener('touchend', (e) => t.classList.remove('on'));
				t.addEventListener('touchstart', (e) => t.classList.add('on'));
			});
			el.teclado.classList.add('on');
		}
	}
	
}
function offTeclado(){
	if(!el.mobile){
		document.onkeyup = '';
	} else{
		const teclas = el.teclado.querySelectorAll('.tecla');
		teclas.forEach(function(t){
			t.key = "";
			t.classList.remove('anuladoBien');
			t.classList.remove('anuladoMal');
			t.removeEventListener(btnPlayEvent, teclado);
			t.removeEventListener('touchend', (e) => t.classList.remove('on'));
			t.removeEventListener('touchstart', (e) => t.classList.add('on'));
		});
		el.teclado.classList.remove('on');
	}
}
function getPalabra(){
	let palabra = false;
	if(arrayWork.length > 0){
		const nAl = aleatorio([0,arrayWork.length-1]);
		palabra = arrayWork[nAl].toLowerCase();
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
	//audioRun();
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
				setTimeout(function(){ control.run = false; play(e); }, 600, e);
			}
		}
		return false;
	}
	limpiarJugar();
	return true;
}
function play(e){
	if(control.run){ return false; }
	if(opciones(e)){
		control.palabraJugar = getPalabra();
		if(control.palabraJugar){
			console.log(control.palabraJugar);
			// gtag('event', 'categoria_jugar', {
			// 	'categoria': control.categoria
			// });
			dataLayer.push({'event':'categoria_jugada','categoria':control.categoria});
			onTeclado();
		} else{
			offTeclado();
		};
	}
}
function audio(){
	this.classList.toggle('on');
	if(this.classList.contains('on')){
		control.audio = true;
		//audioRun();
	} else{
		//audioRun('stop');
		control.audio = false;
	}
	
}



// ::::::::::::::::: Procesos :::::::::::::::::
function showPreload(){
	el.circuloCarga.style.display = 'none';
	setTimeout(function(){
		const gifs = document.getElementById('gifs');
		gifs.classList.remove('opacidad0');
		gifs.addEventListener('transitionend', ()=>{ document.getElementById('animFLama').style.opacity = 1; })

		el.fondos.classList.remove('opacidad0');
		el.btnPlay.classList.remove('ocultar');
		el.boxOpciones.classList.remove('opacidad0');

		
	}, control.showAllTime);
}
function checkPreload(e){
	idagl.preloadLoad++;
	this.imgOriginal.src = this.src;
	if(idagl.preloadTotal == idagl.preloadLoad){
		showPreload();
	}
}
idagl.preloadTotal = 0;
idagl.preloadLoad = 0;
function precarga(){
	const imagenes = document.querySelectorAll('img[preload-src]');
	imagenes.forEach(function(im){
		const img = document.createElement('img');
		img.src = im.attributes['preload-src'].value;
		img.imgOriginal = im;
		img.onload = checkPreload;
		el.preloaOculto.appendChild(img);
		idagl.preloadTotal++;
	});
}
function iniciar(){
	//habilitar funciones para moviles:
	if(el.mobile = /Mobile/i.test(navigator.userAgent)){
		if(el.touch = Modernizr.touchevents){
			btnPlayEvent = "touchend";
		}
	}
	//Obtener elementos del html
	el.btnPlay = document.getElementById('btnPlay');
	el.btnPlay.addEventListener('click', play);
	el.teclado = document.getElementById('teclado');
	el.boxOpciones = document.getElementById('settings');
	el.btnFacil = document.getElementById('nivelFacil');
	el.btnFacil.addEventListener('click', dificultad);
	el.btnDificil = document.getElementById('nivelDificil');
	el.btnDificil.addEventListener('click', dificultad);
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
	el.btnComenzar.addEventListener('click', play);
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
	el.btnMas.addEventListener('click', (e) => { el.btnMas.classList.toggle('activo'); el.masToggle.classList.toggle('activo'); });
	el.btnMasCategoria = document.getElementById('addCategoria');
	el.btnMasCategoria.addEventListener('click', agegarCategoria);
	el.inputAddPalabra = document.getElementById('palabraAdd');
	el.btnAddPalabra = document.getElementById('btnAdd');
	el.btnAddPalabra.addEventListener('click', addPalabra);
	el.btnSalir = document.getElementById('btnSalirBox');
	el.btnSalir.addEventListener('click', salir);
	el.canvas = document.getElementById('canvas');
	el.ahorcado = document.getElementById('cEscenario');
	el.ovni = document.getElementById('ovni');
	el.humano = document.getElementById('humano');
	el.destello = document.getElementById('destelloAccion');
	el.btnAudio =document.querySelector('#audioBox .switchBox');
	el.btnAudio.addEventListener('click', audio);
	
	el.fondos = document.getElementById('fondos');
	if(!el.mobile){ const parallax = new Parallax(el.fondos); }
	
	el.luna = document.getElementById('lunaBox');
	if(!el.mobile){
		el.luna.style.animation = 'luna 96s infinite linear';
	} else{
		el.luna.style.transform = 'rotate(24deg)';
	}
	el.ventanas = document.querySelectorAll('.ventana');
	el.ventanas.forEach((v)=>{
		if(!el.mobile){
			v.style.animation = 'ventanas 4s infinite ease-in-out alternate';
		}
	});
	el.circuloCarga = document.getElementById('loadGif');
	el.preloaOculto = document.getElementById('preloadOculto')
	precarga();
	starRun();
}




// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
    baseUrl: 'js/owner',
    paths: { a: '../animaciones', l: '../librerias' }
});
requirejs(['l/modernizr', 'validaciones', 'alertas', 'a/estrellas', 'a/humano', 'a/ovni', 'audio'], iniciar);

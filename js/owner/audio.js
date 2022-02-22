const ambiente = new Audio('audios/juegoAmbiente.mp3');
// ambiente.playsinline = true;
ambiente.autoplay = false;
ambiente.loop = true;
ambiente.controls = false;
ambiente.volume = 0.3;
function audioRun(accion=''){
	if(!control.audio){ return false; }
	if(accion !=''){ ambiente.pause(); return true; };
	// ambiente.addEventListener("canplaythrough", event => {
		if(ambiente.paused){ ambiente.play(); }
	// });
}

const sonCorrect = new Audio('audios/acierto.mp3');
// sonCorrect.playsinline = true;
sonCorrect.autoplay = false;
sonCorrect.loop = false;
sonCorrect.controls = false;
function audioCorrecto(){
	if(!control.audio){ return false; }
	if(sonCorrect.paused){ sonCorrect.play(); } else { sonCorrect.currentTime = 0; sonCorrect.play();}
}

const sonError = new Audio('audios/error.wav');
// sonError.playsinline = true;
sonError.autoplay = false;
sonError.loop = false;
sonError.controls = false;
function audioError(){
	if(!control.audio){ return false; }
	if(sonError.paused){ sonError.play(); }
}

const sonChiflido = new Audio('audios/chiflido.mp3');
// sonChiflido.playsinline = true;
sonChiflido.autoplay = false;
sonChiflido.loop = false;
sonChiflido.controls = false;
sonChiflido.volume = 0.7;
function audioChiflido(){
	if(!control.audio){ return false; }
	if(sonChiflido.paused){ sonChiflido.play(); }
}

const sonAdmiracion = new Audio('audios/admiracion.mp3');
// sonAdmiracion.playsinline = true;
sonAdmiracion.autoplay = false;
sonAdmiracion.loop = false;
sonAdmiracion.controls = false;
sonAdmiracion.volume = 0.9;
function audioAdmiracion(){
	if(!control.audio){ return false; }
	if(sonAdmiracion.paused){ sonAdmiracion.play(); }
}

const sonPanico = new Audio('audios/panico.wav');
// sonPanico.playsinline = true;
sonPanico.autoplay = false;
sonPanico.loop = false;
sonPanico.controls = false;
function audioPanico(){
	if(!control.audio){ return false; }
	if(sonPanico.paused){ sonPanico.play(); }
}

const sonOvni = new Audio('audios/ovni.mp3');
// sonOvni.playsinline = true;
sonOvni.autoplay = false;
sonOvni.loop = true;
sonOvni.controls = false;
function audioOvni(accion=''){
	if(!control.audio){ return false; }
	if(accion !=''){ sonOvni.pause(); return true; };
	if(sonOvni.paused){ sonOvni.play(); }
}

const sonSuccion = new Audio('audios/succion.wav');
// sonSuccion.playsinline = true;
sonSuccion.autoplay = false;
sonSuccion.loop = false;
sonSuccion.controls = false;
function audioSuccion(){
	if(!control.audio){ return false; }
	if(sonSuccion.paused){ sonSuccion.play(); }
}

const sonPartida = new Audio('audios/partida.wav');
sonPartida.autoplay = false;
sonPartida.loop = false;
sonPartida.controls = false;
function audioPartida(){
	if(!control.audio){ return false; }
	if(sonPartida.paused){ sonPartida.play(); }
}

const sonPoder = new Audio('audios/poder.wav');
// sonPoder.playsinline = true;
sonPoder.autoplay = false;
sonPoder.loop = false;
sonPoder.controls = false;
function audioPoder(){
	if(!control.audio){ return false; }
	if(sonPoder.paused){ sonPoder.play(); }
}

const sonGolpe = new Audio('audios/golpe.mp3');
// sonGolpe.playsinline = true;
sonGolpe.autoplay = false;
sonGolpe.loop = false;
sonGolpe.controls = false;
function audioGolpe(){
	if(!control.audio){ return false; }
	if(sonGolpe.paused){ sonGolpe.play(); }
}

const sonExplosion = new Audio('audios/explosion.mp3');
// sonExplosion.playsinline = true;
sonExplosion.autoplay = false;
sonExplosion.loop = false;
sonExplosion.controls = false;
function audioExplosion(){
	if(!control.audio){ return false; }
	if(sonExplosion.paused){ sonExplosion.play(); }
}
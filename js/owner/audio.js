// const ambiente = new Audio('audios/juegoAmbiente.mp3');
// ambiente.loop = true;
// ambiente.controls = false;
// ambiente.volume = 0.4;
// function audioRun(accion=''){
// 	if(!control.audio){ return false; }
// 	if(accion !=''){ ambiente.pause(); return true; };
// 	// ambiente.addEventListener("canplaythrough", event => {
// 		if(ambiente.paused){ ambiente.play(); }
// 	// });
// }

const sonCorrect = new Audio('audios/acierto.mp3');
sonCorrect.loop = false;
sonCorrect.controls = false;
function audioCorrecto(){
	if(!control.audio){ return false; }
	if(sonCorrect.paused){ sonCorrect.play(); } else { sonCorrect.currentTime = 0; sonCorrect.play();}
}

const sonError = new Audio('audios/error.wav');
sonError.loop = false;
sonError.controls = false;
function audioError(){
	if(!control.audio){ return false; }
	if(sonError.paused){ sonError.play(); }
}

const sonChiflido = new Audio('audios/chiflido.mp3');
sonChiflido.loop = false;
sonChiflido.controls = false;
sonChiflido.volume = 0.7;
function audioChiflido(){
	if(!control.audio){ return false; }
	if(sonChiflido.paused){ sonChiflido.play(); }
}

const sonAdmiracion = new Audio('audios/admiracion.mp3');
sonAdmiracion.loop = false;
sonAdmiracion.controls = false;
function audioAdmiracion(){
	if(!control.audio){ return false; }
	if(sonAdmiracion.paused){ sonAdmiracion.play(); }
}

// const sonPanico = new Audio('audios/panico.wav');
// sonPanico.loop = false;
// sonPanico.controls = false;
// function audioPanico(){
// 	if(!control.audio){ return false; }
// 	if(sonPanico.paused){ sonPanico.play(); }
// }

// const sonOvni = new Audio('audios/ovni.mp3');
// sonOvni.loop = true;
// sonOvni.controls = false;
// function audioOvni(accion=''){
// 	if(!control.audio){ return false; }
// 	if(accion !=''){ sonOvni.pause(); return true; };
// 	if(sonOvni.paused){ sonOvni.play(); }
// }

const sonSuccion = new Audio('audios/succion.wav');
sonSuccion.loop = false;
sonSuccion.controls = false;
function audioSuccion(){
	if(!control.audio){ return false; }
	if(sonSuccion.paused){ sonSuccion.play(); }
}

// const sonPartida = new Audio('audios/partida.wav');
// sonPartida.loop = false;
// sonPartida.controls = false;
// function audioPartida(){
// 	if(!control.audio){ return false; }
// 	if(sonPartida.paused){ sonPartida.play(); }
// }

const sonPoder = new Audio('audios/poder.wav');
sonPoder.loop = false;
sonPoder.controls = false;
function audioPoder(){
	if(!control.audio){ return false; }
	if(sonPoder.paused){ sonPoder.play(); }
}

const sonGolpe = new Audio('audios/golpe.mp3');
sonGolpe.loop = false;
sonGolpe.controls = false;
function audioGolpe(){
	if(!control.audio){ return false; }
	if(sonGolpe.paused){ sonGolpe.play(); }
}

const sonExplosion = new Audio('audios/explosion.mp3');
sonExplosion.loop = false;
sonExplosion.controls = false;
function audioExplosion(){
	if(!control.audio){ return false; }
	if(sonExplosion.paused){ sonExplosion.play(); }
}
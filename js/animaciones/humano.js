// ::::::::::::::::: Animaciones :::::::::::::::::
//Codigos para el humano
var humano;
let humanoAccion = false;
let humanoTiempos = 0;
let humanoSeguir = true;
let humanoTarea = "";
let humanoDealy = 3000;
function ejecutor(){
	if(!humanoSeguir){return false;}
	humanoStatus = true;
	if(humanoTarea != ""){ 
		humanoTarea();
	}
	
}
function enComplete(){
	humanoStatus = false;
	if(humanoTarea != ""){ 
		setTimeout(ejecutor, humanoDealy);
	}
}
function humanoClear(){
	humano.removeEventListener('complete', enComplete);
}
function humanoRun(){
	humano.playSegments([0,33], true);
	humanoTarea = humanoBaila;
	humano.addEventListener('complete', enComplete);
}
function humanoBaila(){
	humanoTiempos = 920;
	if(humanoSeguir){
		humano.playSegments([35,58], true);
	}
}
function humanoChiflar(){
	humanoTiempos = 1080;
	if(humanoSeguir){
		humano.playSegments([65,92], true);
		setTimeout(()=>{ audioChiflido(); }, 150);
	}
}
function humanoAdmiracion(){
	humanoTiempos = 3160;
	if(humanoSeguir){
		humano.playSegments([110,189], true);
		setTimeout(()=>{ audioAdmiracion(); }, 240);
	}
}
function humanoPanico(){
	humanoTiempos = 2600;
	if(humanoSeguir){
		humano.playSegments([200,265], true);
		//setTimeout(()=>{ audioPanico(); }, 20);
	}
}
function humanoResiste(){
	humanoTiempos = 4200;
	if(humanoSeguir){
		humano.playSegments([280,385], true);
	}
}
function humanoSuccion(){
	humanoTiempos = 1400;
	humano.removeEventListener('complete', enComplete);
	humano.playSegments([411,446], true);
	setTimeout(()=>{ audioSuccion(); }, 20);
}
function humanoPoder(){
	humanoTiempos = 4400;
	humano.removeEventListener('complete', enComplete);
	humano.playSegments([455,565], true);
	setTimeout(()=>{ audioPoder(); }, 2600);
	humano.addEventListener('complete', humanoReposo);
}
function humanoReposo(){
	humanoTiempos = 200;
	humano.removeEventListener('complete', humanoReposo);
	humano.playSegments([565,570], true);
}


humano = bodymovin.loadAnimation({
  container: document.getElementById('humano'),
  path: 'js/animaciones/humano.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "humano"
});

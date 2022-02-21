// ::::::::::::::::: Animaciones :::::::::::::::::
//Codigos para el ovni
var ovni;
let ovniAccion = false;
let ovniTiempos = "";
let ovniSeguir = true;
let ovniTarea = "";
let ovniDealy = 2000;
function ovniEjecutor(){
	console.log('señal');
	if(!ovniSeguir){return false;}
	ovniStatus = true;
	if(ovniTarea != ""){
		ovniTarea();
	}
}
function ovniComplete(){
	ovniStatus = false;
	if(ovniTarea != ""){
		setTimeout(ovniEjecutor, ovniDealy);
	}
}
function ovniClear(){
	ovni.removeEventListener('complete', ovniComplete);
}
function ovniAdd(){
	ovni.addEventListener('complete', ovniComplete);
}

function ovniRun(){
	ovni.playSegments([0,50], true);
	ovniTarea = ovniRun;
}
function ovniChispas(){
	if(ovniSeguir){
		ovni.playSegments([75,130], true);
		ovni.addEventListener('complete', ovniComplete);
		//setTimeout(()=>{ audioOvni(); }, 20);
	}
}
function ovniRayo(){
	console.log('rayo');
	if(ovniSeguir){
		console.log('rayo run');
		ovni.playSegments([150,200], true);
	}
}
function ovniSuccion(){
	ovni.playSegments([225,275], true);
	setTimeout(()=>{ audioSuccion(); }, 80);
	//setTimeout(()=>{ audioPartida(); }, 1600);
	//setTimeout(()=>{ audioOvni('stop'); }, 850);
}
function ovniExplota(){
	ovni.playSegments([300,337], true);
	setTimeout(()=>{ audioGolpe(); }, 20);
	setTimeout(()=>{ audioExplosion(); }, 1000);
}


ovni = bodymovin.loadAnimation({
  container: document.getElementById('ovni'),
  path: 'js/animaciones/ovni.json',
  renderer: 'canvas',
  loop: false,
  autoplay: false,
  name: "ovni"
});

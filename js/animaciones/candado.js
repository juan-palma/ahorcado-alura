// ::::::::::::::::: Animaciones :::::::::::::::::
//Codigos para las estrellas
let numNotRep = [];
function noRepit(alW, alH, el){
	let refW = 12;//el.clientWidth;
	let refH = 12;//el.clientHeight;
	let mayorW = alW - refW;
	let menorW = alW + refW;
	let mayorH = alH - refH;
	let menorH = alH + refH;
	let ocupado = false;
	for(let i = 0; i < numNotRep.length; i++){
		let n = numNotRep[i];
		if((n.w > mayorW && n.w < menorW) && (n.h > mayorH && n.h < menorH)){ ocupado = true; }
	};
	return ocupado;
}
function aleatorio(rango) {
	return Math.round(Math.random() * (rango[1] - rango[0])) + rango[0];
}
function getCordenadas(rangoW, rangoH, el=""){
	let alW = aleatorio(rangoW);
	let alH = aleatorio(rangoH);
	if(el != ""){
		if(noRepit(alW, alH, el)){
			return false;
		}
	}
	numNotRep.push({"w":alW, "h":alH});
	return {"w":alW, "h":alH};
}

const estrellasNum = 18;
let cuadrante = 1;
let cuadrantes = {
	"c1":{"w":[0, 100], "h":[-20, 2]},
	"c2":{"w":[-20, 5], "h":[0, 90]},
	"c3":{"w":[0, 100], "h":[94, 105]},
	"c4":{"w":[95, 115], "h":[0, 90]}
};
const estrella = document.getElementById('estrella1');
estrella.style.display = "none";
let congelar = false;
for(let i = 0; i <= estrellasNum; i++){
	if(congelar){i = congelar; }
	if(cuadrante > 4){cuadrante = 1;};
	let cordenadas = getCordenadas(cuadrantes["c"+cuadrante].w, cuadrantes["c"+cuadrante].h, estrella);
	if(cordenadas){
		let clone = estrella.cloneNode(true);
		clone.id = "";
		clone.style.display = "flex";
		clone.style.transform = "rotate(" + aleatorio([0, 360]) + "deg)";
		clone.style.left = cordenadas.w + "%";
		clone.style.top = cordenadas.h + "%";
		if( Math.round(Math.random()) === 1 ){
			let nFX = aleatorio([1,5]);
			clone.classList.add('flotar'+nFX);
		} else{
			clone.classList.add('flotar6');
		}
		cuadrante++;
		estrellas.appendChild(clone);
		congelar = false;
	} else{
		if(!congelar){ congelar = i; }
	}
}




//Codigos para el candado
var frames, candado;
let candadoStatus = true;
function addCssAn(){
	var candado = this;
	frames = document.getElementById("candado").querySelectorAll("svg g path");
	frames[1].classList.add("animar");
}
function candadoClose(){
	let tramo = (candadoStatus) ? [82,92] : [42,92];
	candado.playSegments(tramo, true);
	setTimeout(function(){ frames[1].style.fill = "var(--colorPrincipal)"; }, 1400);
	candadoStatus = true;
}
function candadoOpen(){
	let tramo = (!candadoStatus) ? [31,42] : [0,42];
	candado.playSegments(tramo, true);
	setTimeout(function(){ frames[1].style.fill = "var(--candadoOpen)"; }, 1200);
	candadoStatus = false;
}
candado = bodymovin.loadAnimation({
  container: document.getElementById('candado'),
  path: 'js/animaciones/candado.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "candado"
});
candado.addEventListener("DOMLoaded", function(e){ addCssAn.call(candado); });
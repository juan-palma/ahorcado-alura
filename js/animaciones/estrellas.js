// ::::::::::::::::: Animaciones :::::::::::::::::
//Codigos para las estrellas
let numNotRep = [];
function noRepit(alW, alH, el){
	let refW = 4;//el.clientWidth;
	let refH = 4;//el.clientHeight;
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

const estrellasNum = 38;
let cuadrante = 0;
let cuadrantes = [
	{"w":[0, 100], "h":[0, 80]}
];
const estrella = document.getElementById('estrella1');
estrella.style.display = "none";
let congelar = false;
for(let i = 0; i <= estrellasNum; i++){
	if(congelar){i = congelar; }
	if(cuadrante >= cuadrantes.length){cuadrante = 0;};
	let cordenadas = getCordenadas(cuadrantes[cuadrante].w, cuadrantes[cuadrante].h, estrella);
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
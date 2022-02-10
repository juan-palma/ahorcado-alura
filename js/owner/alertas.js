//avisos del sistema
function avisoClear(el){
	if(el.statusTiempo){
		clearTimeout(el.statusTiempo);
		el.classList.remove("opacidad1");
		el.style.color = "";
		el.textContent = "";
	}
}
function aviso(el, m, c=""){
	avisoClear(el);
	el.textContent = m;
	el.classList.add("opacidad1");
	if(c != ""){ el.style.color = c; }
	el.statusTiempo = setTimeout(function(){ 
		el.classList.remove("opacidad1");
		if(c != ""){ el.style.color = ""; }
		el.statusTiempo = false;
	}, 5000);
}
//validaciones del texto
function limitarEntrada(e){
	var ctrlDown = e.ctrlKey||e.metaKey;
	if(ctrlDown && e.keyCode==86){ e.preventDefault(); e.stopPropagation(); return false; }
	if(!(ctrlDown && e.keyCode==67)){
		if(!control.validar.permitidos.test(e.key)){
			if(control.validar.texto.test(e.key)){
				e.preventDefault();
				e.stopPropagation();
				aviso(el.msgInput, control.mensajes.soloMinusculas);
			}
			setTimeout(function(){
				e.target.value = e.target.value.replace(control.validar.texto, "");
				e.target.value = e.target.value.replace(/\s{2,}/, " ");
			}, 2);
		}
	}
}
function validar(v){
	v.value = v.value.trim();
	if(v.value == ""){
		aviso(el.msgInput, control.mensajes.vacio);
		return false;
	}
	if(control.validar.texto.test(v.value)){
		aviso(el.msgInput, control.mensajes.incorrecto);
		return false;
	}
	return true;
}
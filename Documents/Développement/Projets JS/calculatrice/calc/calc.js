let calc_vars = {"nombre1":null, "nombre2": null , "operation" : null, "operations":{}};
/*Initialisation de la calculatrice*/
function calc_init(){
	let btnList = document.querySelectorAll(".calculator .btn");
	for(i = 0; i < btnList.length ; ++i){
		btnList[i].addEventListener("click", calc_btn_pressed);
	}
	
	calc_vars.nombre1 = document.querySelector("#calc_resultat > .calc_nombre1");
	calc_vars.operation = document.querySelector("#calc_resultat > .calc_op");
	calc_vars.nombre2 = document.querySelector("#calc_resultat > .calc_nombre2");
	
	
	calc_vars.operations['*'] = calc_f_mult;
	calc_vars.operations['/'] = calc_f_div;
	calc_vars.operations['-'] = calc_f_moins;
	calc_vars.operations['+'] = calc_f_plus;
	calc_vars.operations['Mod'] = calc_f_mod;
	
}
function calc_btn_pressed(){
	if(this.classList.contains("btn_number")){
		let elem = calc_vars.operation.innerHTML == "" ? calc_vars.nombre1 : calc_vars.nombre2;
		if(elem.innerHTML == "0")
			elem.innerHTML = "";
		elem.innerHTML += this.innerHTML;
	}else if(this.classList.contains("btn_reset")){//Bouton clear
	calc_reset();
	}else if(this.classList.contains("btn_op")){// Une opération
		calc_vars.operation.innerHTML = this.innerHTML;
	}else if(this.classList.contains("btn_equal")){
		calc_equal();
	}else if(this.classList.contains("btn_dot")){
		calc_dot();
	}
}
function calc_dot(){
	let elem = calc_vars.operation.innerHTML == "" ? calc_vars.nombre1 : calc_vars.nombre2;
	if(elem.innerHTML.indexOf('.') == -1){
		elem.innerHTML += ".";
	}
}
function calc_equal(){
		let nbr1 = parseFloat(calc_vars.nombre1.innerHTML);
		let nbr2 = parseFloat(calc_vars.nombre2.innerHTML);
		let op = calc_vars.operation.innerHTML;
		if(nbr1 != NaN && nbr2 != NaN && op != ""){
			calc_reset();
			calc_vars.nombre1.innerHTML = calc_vars.operations[op](nbr1, nbr2);
		}
}

function calc_reset(){
	calc_vars.nombre1.innerHTML = "0";
	calc_vars.operation.innerHTML = "";
	calc_vars.nombre2.innerHTML = "";
}
/*Operation mathématique*/
function calc_f_mult(op1, op2){
	return op1 * op2;
}
function calc_f_div(op1, op2){
	return op2 == 0? "DIV 0" : op1 / op2;
}
function calc_f_moins(op1, op2){
	return op1 - op2;
}
function calc_f_plus(op1, op2){
	return  op1 + op2;
}
function calc_f_mod(op1, op2){
	return  op1 % op2;
}
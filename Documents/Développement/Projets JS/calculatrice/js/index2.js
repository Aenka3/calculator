/*Principe de base
-Nous séparons l'affichage de la logique. Donc nous gardons en mémoire nombre1, nombre2, et operateur.
-calc.operateurs, est un tableau associatif de fonction qui est utilisé pour permettre de trouver facilement la fonction operateur.
-Si calc.operateur == "", sa veut dire qu'on travaille sur le nombre 1, sinon le nombre 2.
-calc.etat est une variable pour permettre de savoir l'état de la calculatrice, 
	si il vaut 1, calc_result_clicked à été appellé, donc on agit comme suit:
		-si c'est un operateur, le nombre1 = resultat
		-si c'est un chiffre, on reinitialise tout

*/
let calc = {
  "nombre1": "",//String: Nombre 1
  "nombre2": "",//String: Nombre 2
  "operateur": "",//String:	Operateur
  "operations": {},//Tableau de fonctions
  "output": "",//Element HTML: <input id="output">
  "etat": 0//Entier : 0 vierge, 1 Une operation à été effectué
};
function calc_init() {
	//On ajoute un evenement click à tous les boutons
  var inputs = document.querySelectorAll(".calculator .btn");
  for (i = 0; i < inputs.length; ++i) {
	  //Pour chaque boutons, on regarde ce que c'est et on rajoute la fonction correspondante
		if (inputs[i].classList.contains("operator")){
			inputs[i].addEventListener("click", calc_op_clicked);
		} else if (inputs[i].classList.contains("number")){
			inputs[i].addEventListener("click", calc_number_clicked);
		} else if (inputs[i].classList.contains("result")){
			inputs[i].addEventListener("click", calc_result_clicked);
		} else if (inputs[i].classList.contains("clear")){
			inputs[i].addEventListener("click", calc_clear_clicked);
		} else if (inputs[i].classList.contains("dot")){
			inputs[i].addEventListener("click", calc_dot_clicked);
		}
  }
  calc.output = document.getElementById('output');
   //On initilisalise le tableau de fonction
  calc.operations["+"] = calc_f_plus;
  calc.operations["-"] = calc_f_moins;
  calc.operations["*"] = calc_f_mult;
  calc.operations["/"] = calc_f_div;
}
//Ajoute un operateur
function calc_op_clicked(){
    if (calc.nombre1 != "" && calc.operateur == "") {//Le nombre1 n'est pas définit et on a pas definit d'operateur
      calc.output.value += this.value;
      calc.operateur = this.value;
    }
}
//Ajoute un chiffre au nombre actuel
function calc_number_clicked(){
	if (calc.operateur == "") {//Il n y a pas d'operateur, donc on est sur le nombre 1
        if (calc.nombre1 != "" && calc.nombre1 != "0" && calc.etat == 1)
          calc.nombre1 += this.value;
        else {//Il y a deja eu un calcul de fait, on reinitilise le tout
          calc_clear_clicked();
          calc.nombre1 = this.value;
          calc.etat = 1;
        }
        calc.output.value = calc.nombre1;
    } else {// Il y a un operateur, donc c'est le nombre 2
        if (calc.nombre2 != "")
          calc.nombre2 += this.value;
        else calc.nombre2 = this.value;
        calc.output.value += this.value;
    }
}
//On calcul le tout
function calc_result_clicked(){
	if(calc.nombre2!=""){//On verifie que tout soit complet
	//On transforme les String en parseFloat puis on appelle la fonction d'operation correspondante
	let result = calc.operations[calc.operateur]
	(parseFloat (calc.nombre1), parseFloat (calc.nombre2));
	calc_clear_clicked();
	calc.output.value = result;
	calc.nombre1 = result;
	}
}
//On reinitialise toute les variables et l'affichage
function calc_clear_clicked() {
  calc.output.value = "0";
  calc.nombre1 = "";
  calc.nombre2 = "";
  calc.operateur = "";
  calc.etat = 0;
}
//On rajoute un "." au nombre si il en a pas
function calc_dot_clicked(){
	if (calc.operateur == "") {//Detection du nombre 1 ou 2
        let str = calc.nombre1 + "";
        if (str.indexOf(".") == -1) {//Il n y a pas de point, on le rajoute
          calc.nombre1 += ".";
          calc.output.value = calc.nombre1;
        }
	}
	else {
        let str = calc.nombre2 + "";
        if (str.indexOf(".") == -1) {//Il n y a pas de point, on le rajoute
          calc.nombre2 += ".";
          calc.output.value = calc.nombre1 + calc.operateur + calc.nombre2;
        }
	}
}
/*Operations mathématique*/
function calc_f_mult(op1, op2) {
  return op1 * op2;
}
function calc_f_div(op1, op2) {
  return op2 == 0 ? "/!\\ DIV 0 /!\\" : op1 / op2;
}
function calc_f_moins(op1, op2) {
  return op1 - op2;
}
function calc_f_plus(op1, op2) {
  return op1 + op2;
}
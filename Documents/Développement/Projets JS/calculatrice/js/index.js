/*
let calc = {"nombre1" : null, "nombre2" : null, "operation" : null, "operations":{}};

let operators = document.getElementsByClassName("operator");
let numbers = document.getElementsByClassName("number");
let dot = document.getElementById("dot");
let clear = document.getElementById("clear");
let result = document.getElementById("result");

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", operator);
}

function operator(evenement) {
  console.log(evenement.target);
  const value = evenement.target.value;
  document.forms.output.value += value;
}

for (let i = 0; i < numbers.length; i++) {
  let num = numbers[i];
  num.addEventListener("click", number);
}

function number (evenement) {
  const value = evenement.target.value;
  document.forms.output.value += value;
}

*/
let calc = {
  "nombre1": null,
  "nombre2": null,
  "operateur": "",
  "operations": {},
  "output": null,
  "etat": 0//0 vierge, 1 operation en ecriture
};
function calc_init() {
  var btn = document.querySelectorAll(".calculator .btn");
  for (i = 0; i < btn.length; ++i) {
    btn[i].addEventListener("click", calc_clicked);
  }
  calc.output = document.getElementById('output');
  calc.operations["+"] = calc_f_plus;
  calc.operations["-"] = calc_f_moins;
  calc.operations["*"] = calc_f_mult;
  calc.operations["/"] = calc_f_div;
}
function calc_clicked() {
  if (this.classList.contains("operator")) {
    //C'est un operateur
    if (calc.nombre1 != null && calc.operateur == "") {
      calc.output.value += this.value;
      calc.operateur = this.value;
    }
  } else if (this.classList.contains("number")) {
      if (calc.operateur == "") {
        if (calc.nombre1 != null && calc.nombre1 != "0" && calc.etat == 1)
          calc.nombre1 += this.value;
        else {
          calc_clear();
          calc.nombre1 = this.value;
          calc.etat = 1;
        }
        calc.output.value = calc.nombre1;
      } else {
        if (calc.nombre2 != null)
          calc.nombre2 += this.value;
        else calc.nombre2 = this.value;
        calc.output.value += this.value;
      }

    } else if (this.classList.contains("dot")) {
      if (calc.operateur == "") {
        let str = calc.nombre1 + "";
        if (str.indexOf(".") == -1) {
          calc.nombre1 += ".";
          calc.output.value = calc.nombre1;
        }
      } else {
        let str = calc.nombre2 + "";
        if (str.indexOf(".") == -1) {
          calc.nombre2 += ".";
          calc.output.value = calc.nombre1 + calc.operateur + calc.nombre2;
        }
      }
    }
    else if (this.classList.contains("clear")) {
      calc_clear();
    }
    else if (this.classList.contains("result")) {

      let result = calc.operations[calc.operateur]
        (parseFloat(calc.nombre1), parseFloat(calc.nombre2));
      calc_clear();
      calc.output.value = result;
      calc.nombre1 = result;
    }
}
function calc_clear() {
  calc.output.value = 0;
  calc.nombre1 = null;
  calc.nombre2 = null;
  calc.operateur = "";
  calc.etat = 0;
}
/*Operation mathématique*/
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
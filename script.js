let intentos = 6;
let resAnt;
//el numero es para controlar el largo de la palabra y para darle saber al usuario de cuantas palabras 
//es la palabra, quedo del codigo anterior donde tenia palabras de mas de 5 letras y por eso estoy controlando
//el programa con esta variable adicional
let numPal = 5;

fetch("https://random-word-api.herokuapp.com/word?&&length=5&&lang=es")
  .then((response) => response.json())
  .then((response) => {
    
    palabra = response[0].toUpperCase();
    
    
    
  })
  .catch((err) => console.log("error"));
  


const PRESION = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const INPUT = document.getElementById("guess-input");
const JUGAR = document.getElementById("jugar");
let error = document.getElementById("error");
let leyenda = document.getElementById("guess");
INPUT.setAttribute("maxLength", numPal);
INPUT.setAttribute("placeholder", "Letras: " + numPal);

//volver a jugar al apretar el boton que se activa al terminar de jugar
JUGAR.addEventListener("click", (_) => {
  location.reload();
});
PRESION.addEventListener("click", intentar);
INPUT.addEventListener("input", validarEntrada);

//para hacer que solo se pueda ingresar letras al input
function validarEntrada() {
  let inputValue = INPUT.value;
  inputValue = inputValue.replace(/[^A-Za-záéíóúüñÁÉÍÓÚÜÑ]/g, '');
  INPUT.value = inputValue;

}

function intentar() {
  const ROW = document.createElement("div");
  ROW.className = "row";
  const RESP = dato();
 
  if (RESP === palabra) {
    terminar("<h1>GANASTE!</h1>");
    JUGAR.style.display = "block";
    PRESION.style.display = "none";
    leyenda.style.color = "#eeff00";
    leyenda.style.fontSize = "30px";
    intentos++;
    
  }

  if (RESP.length !== numPal) {
    error.innerHTML = "<h1>*Completar todas las letras</h1>";
    error.style = "color: red";
    return;
  } else error.style.display = "none";

  if(resAnt===RESP){
    error.innerHTML = "<h1>*Ingrese otra palabra</h1>";
    error.style = "color: red";
    return;
  } else error.style.display = "none";
  intentos--;

const letrasPintadas = [];

  for (i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    let posicionLtr = palabra.indexOf(RESP[i]);
    if(posicionLtr ===-1){
      SPAN.style.backgroundColor = "#a4aec4";
    } else if(RESP[i] === palabra[i]){
      SPAN.style.backgroundColor = "#00af4b";
      letrasPintadas.push(RESP[i]); 
    } else if (palabra.includes(RESP[i])&&!letrasPintadas.includes(RESP[i])) {
      SPAN.style.backgroundColor = "#ffe148";
    } else {
      SPAN.style.backgroundColor = "#a4aec4";
    }
    
    SPAN.innerHTML = RESP[i]; 
    ROW.appendChild(SPAN);
  }

  
  GRID.appendChild(ROW);
  if (intentos == 0) {
    terminar("<h1>PERDISTE ! La palabra era "+palabra+"</h1>");
    JUGAR.style.display = "block";
    PRESION.style.display = "none";
    leyenda.style.color = "#00f4ff";
    return;
  }
  //para que el programa no deje poner la anterior respuesta(a mejorar)
  resAnt = RESP;
}

//recibo la palabra del input
function dato() {
  let input = document.getElementById("guess-input");
  input = input.value;
  input = input.toUpperCase();
  return input;
}

//controlo el mensaje final al perder o ganar
function terminar(mensaje) {
  INPUT.disabled = true;
  PRESION.disabled = true;
  leyenda.innerHTML = mensaje;
}
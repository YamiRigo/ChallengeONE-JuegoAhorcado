/* Selecting the elements from the HTML file. */
var botonAgregarPalabra = document.querySelector("#boton-agregar-palabra");
var ingresarNuevaPalabra = document.querySelector("#ingresar-nueva-palabra");
var textoBoton = document.querySelector("#texto-boton");

/* Declaring variables. */
var ckick = -1;
var entrada = "";
var palabrasInvalidas = [];
var palabrasValidas = [];
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");

/* A function that is executed when the button is clicked. */
botonAgregarPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();

    click *= (-1);
    if (click > 0) {
        entrada = "";
        activarAnimacion();

        /* Loading the audio file and playing it. */
        audio2.load();
        audio2.play();
    }else{
        entrada = captureInput();
        /* Checking if the input is valid. 
        If it is, it adds the word to the list of valid words. */
        if (!validarEntrada(entrada)) {
            agregarPalabra(entrada, listaDepalabras);
            ingresarNuevaPalabra.value = "";
            desactivarAnimacion();

            audio2.load();
            audio2.play();
        }else{
            click = 1;
            errorEntrada();

            /* Loading the audio file and playing it. Error */
            audio1.load();
            audio1.play();
        }
    }
});

/* Preventing the default action of the event. */
ingresarNuevaPalabra.addEventListener("click", function(event){
    event.preventDefault();
    inputInvisible.blur();
});

/**
 * It returns the value of the input field with the id "ingresar-nueva-palabra" in uppercase.
 * @returns The value of the input field.
 */
function captureInput() {
    return(document.querySelector("#ingresar-nueva-palabra").value.toUpperCase());
}

/**
 * It takes a string, splits it into an array of words, and then checks each word to see if it's
 * between 3 and 17 characters long, and if each character is a letter.
 * @param entradas - is the string that the user inputs.
 * @returns A boolean value.
 */
function validarEntrada(entradas) {
    var palabraInvalida = false;

    if(entrada.length != 0){
        entrada = entradas.split(" ");
        for (var i = 0; i < entrada.length; i++) {
            if(entrada[i].length < 3 || entrada[i] > 17){
                palabraInvalida = true;
                break;
            }else{
                for (var j = 0; j < entrada[i].length; j++) {
                    if ((entrada[i].charCodeAt(j) < 65 || entrada[i].charCodeAt(j) > 90) && entrada[i].charCodeAt(j) != 209) {
                        palabraInvalida = true;
                        break;
                    }
                    
                }
            }
            
        }
    }
    return palabraInvalida;
}

/**
 * It takes an array of words and adds them to a list of words if they don't already exist in the list.
 * @param entrada - an array of words
 * @param listaDepalabras - an array of words
 */
function agregarPalabra(entrada, listaDepalabras) {
    if (entrada.length != 0) {
        entrada.forEach(function(palabra) {
            if(!contiene(palabra, listaDepalabras)){
                listaDepalabras.push(palabra);
            }
        });
    }
}
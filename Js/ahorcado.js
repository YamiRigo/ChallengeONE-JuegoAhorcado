/* Declaring variables. */
var iniciarJuego = false;
var errores = 0;
var palabra, letrasPalabra, letrasIngresadas, letrasCorrectas, letrasIncorrectas, tecla, lineas;
var audio3 = document.getElementById("audio3");
var audio4 = document.getElementById("audio4");

/* Selecting the element with the id of "boton-iniciar-juego" and assigning it to the variable
botonIniciarJuego. */
var botonIniciarJuego = document.querySelector("#boton-iniciar-juego");

/* Selecting the element with the id of "input-teclado" and assigning it to the variable
inputInvisible. */
var inputInvisible = document.querySelector("#input-teclado");
var subcontenedor = document.querySelector("#subcontenedor");

/* An event listener. */
botonIniciarJuego.addEventListener("click", function(event){
    event.preventDefault();
    inputInvisible.blur();

    /* Loading the audio file and playing it. */
    audio2.load();
    audio2.play();
    /* Apagar animaciones, si es que hay. */
    apagar();

    inputInvisible.focus();
    iniciarJuego = true;
    errores = 0;
    palabra = palabraAleatoria();
    iniciarDibujo(palabra);
    letrasPalabra = letrasSinRepetir(palabra);
    letrasIngresadas = [];
    letrasCorrectas = [];
    letrasIncorrectas = [];
    lineas = calcularLineas();
    escribirLetrasCorrectas(lineas);
});

/* Making the input field focus when the user clicks on the game. */
subcontenedor.addEventListener("click", function(event){
    if(iniciarJuego){
        event.preventDefault();
        inputInvisible.focus();
    }
});

inputInvisible.addEventListener("input", function(){
    /* Taking the value of the input field and making it uppercase. Then it is setting the value of the
    input field to an empty string. */
    tecla = inputInvisible.value.toUpperCase();
    inputInvisible.value = "";

    /* Checking if the game has started. */
    if(iniciarJuego){
        /* Checking if the key pressed is a letter. */
        if(teclaValida(tecla)){
            /* Checking if the letter pressed is not in the array of letters pressed. If it is not, it
            is adding it to the array and sorting it. */
            if(!contiene(tecla, letrasIngresadas)){
                letrasIngresadas.push(tecla);
                letrasIngresadas.sort();
                /* Checking if the letter pressed is in the word. If it is, it is adding it to the
                array of correct letters and sorting it. Then it is calling the function
                transcribirLetra and passing it the array of lines and the letter pressed. Then it
                is calling the function limpiarPantalla and passing it the parameters 0, alto *
                0.75, ancho, alto. Finally, it is calling the function escribirLetrasCorrectas and
                passing it the array of lines. */
                if(contiene(tecla, letrasPalabra)){
                    letrasCorrectas.push(tecla);
                    letrasCorrectas.sort();
                    lineas = transcribirLetra(lineas, tecla);
                    limpiarPantalla(0, alto * 0.75, ancho, alto);
                    escribirLetrasCorrectas(lineas);
                }else{
                    /* Adding 1 to the variable errores, calling the function dibujarErrores and
                    passing it the variable errores, adding the letter pressed to the array of
                    incorrect letters, calling the function limpiarPantalla and passing it the
                    parameters 0, alto * 0.62, ancho, alto * 0.1, and calling the function
                    escribirLetraIncorrectas and passing it the array of incorrect letters. */
                    errores++;
                    dibujarErrores(errores);
                    letrasIncorrectas.push(tecla);
                    limpiarPantalla(0, alto * 0.62, ancho, alto * 0.1);
                    escribirLetraIncorrectas(letrasIncorrectas);
                }

                /* Checking if the player has won. If they have, it is setting the variable iniciarJuego
                to false, making the input field blur, loading and playing the audio file, writing
                "¡GANASTE!", setting the variable on to true, calling the function encender, and
                calling the function hombrecitoSalvado. */
                if(ganar()){
                    iniciarJuego = false;
                    inputInvisible.blur();

                    audio3.load();
                    audio3.play();

                    escribir("¡GANASTE!");
                    on = true;
                    encender();
                    hombrecitoSalvado();
                }

                /* Checking if the player has lost. If they have, it is setting the variable
                iniciarJuego to false, making the input field blur, loading and playing the audio
                file, writing "GAME OVER", calling the function dibujarCarita and passing it the
                parameters 0.6015, 0.236, and false, and calling the function palabraCorrecta. */
                if(perder()){
                    iniciarJuego = false;
                    inputInvisible.blur();

                    audio4.load();
                    audio4.play();

                    escribir("GAME OVER");
                    dibujarCarita(0.6015, 0.236, false);
                    palabraCorrecta();
                }
            }
        }
    }
});

/**
 * It returns a random word from the list of words.
 * @returns the value of the array listaDepalabras at the index i.
 */
function palabraAleatoria() {
    var i = Math.round(Math.random() * (listaDepalabras.length - 1));
    return listaDepalabras[i];
}

/**
 * It takes a string and returns an array of the unique letters in the string, sorted alphabetically.
 * @param string - The string to be checked.
 * @returns an array with the letters of the string in alphabetical order without repeating.
 */
function letrasSinRepetir(string) {
    var letras = [];
    var array = string.split('');
    
    for (var i = 0; i < array.length; i++){
        if(!contiene(array[i], letras)){
            letras.push(array[i]);
        }
    }
    return letras.sort();
}

/**
 * It returns true if the character code of the character passed to it is between 65 and 90 (A-Z) or
 * 209 (Ñ).
 * @param tecla - The key that was pressed.
 * @returns a boolean value.
 */
function teclaValida(tecla) {
    return ((tecla.charCodeAt() >= 65 && tecla.charCodeAt() <= 90) || tecla.charCodeAt() == 209);
}

/**
 * It checks if an element is in a list.
 * @param elemento - the element to search for
 * @param lista - the list of elements to check
 * @returns true if the element is in the list, and false if it is not.
 */
function contiene(elemento, lista) {
    return lista.includes(elemento);
}

/**
 * If the number of letters in the array of correct letters is equal to the number of letters in the
 * array of letters in the word, then the player has won.
 * @returns The length of the array of letters in the word.
 */
function ganar() {
    return (letrasCorrectas.length == letrasPalabra.length);
}

/**
 * If the number of errors is equal to 9, then the player has lost.
 * @returns the value of the variable errores.
 */
function perder() {
    return (errores == 9);
}
/* Creating a canvas element and assigning it to the variable screen. */
var screen = document.querySelector("canvas");
var brush = screen.getContext("2d");

var ancho = screen.width;
var alto = screen.height;

/* Declaring variables. */
var tamanoPalabra;
var tamanoFuente;

var salvado;

/**
 * The function iniciarDibujo() takes a string as an argument and then calls the function
 * limpiarPantalla() with the arguments 0,0,ancho,alto. Then it calls the function dibujarBaseMastil()
 * with the arguments 0.25,0.55. Then it sets the variable tamanoPalabra to the length of the string
 * passed to the function. Then it sets the variable tamanoFuente to the value of ancho divided by the
 * value of tamanoPalabra. Then it checks if the value of tamanoFuente is greater than 60. If it is, it
 * sets the value of tamanoFuente to 60.
 * @param palabra - the word to be guessed
 */
function iniciarDibujo(palabra) {
    limpiarPantalla(0,0,ancho,alto);
    dibujarBaseMastil(0.25,0.55);
    tamanoPalabra = palabra.length;
    tamanoFuente = (ancho / tamanoPalabra);

    if(tamanoFuente > 60){
        tamanoFuente = 60;
    }
}

/**
 * "The function 'limpiarPantalla' takes four arguments, 'x', 'y', 'ancho', and 'alto', and uses them
 * to clear a rectangle on the canvas."
 * 
 * The function is called like this:
 * @param x - The x coordinate of the top left corner of the rectangle to clear.
 * @param y - The y-coordinate of the upper-left corner of the rectangle to clear.
 * @param ancho - width of the canvas
 * @param alto - height
 */
function limpiarPantalla(x,y,ancho,alto) {
    brush.clearRect(x,y,ancho,alto);
}

/**
 * It creates a string of underscores and spaces, the number of underscores being equal to the length
 * of the word to be guessed.
 * @returns the value of the variable lineas.
 */
function calcularLineas() {
    var lineas = "";
    for (var i = 0; i < tamanoPalabra; i++) {
        lineas = lineas + "_";
        if(i != tamanoPalabra - 1){
            lineas = lineas + " ";
        }
    }
    return lineas;
}

/* Taking the string of underscores and spaces and replacing the underscores with the letters that are
guessed correctly. */
function transcribirLetra(lineas, tecla) {
    var lineasArray = lineas.split("");
    for (var i = 0; i < tamanoPalabra; i++){
        if(tecla == palabra[i]){
            lineasArray.splice(i * 2, 1, tecla);
        }     
    }
    return lineasArray.join("");
}

/**
 * It writes the correct letters in the canvas.
 * @param lineas - the text to be written
 */
function escribirLetrasCorrectas(lineas) {
    brush.fillStyle = "black";
    brush.strokeStyle = "black";
    brush.font = "bold" + tamanoFuente + "px Playfair Display";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText(lineas, ancho * 0.5, alto * 0.85);
    brush.fill();
}

/**
 * It takes an array of letters and displays them on the canvas.
 * @param letrasIncorrectas - array of incorrect letters
 */
function escribirLetraIncorrectas(letrasIncorrectas) {
    brush.fillStyle = "red";
    brush.strokeStyle = "red";
    brush.font = "bold" + (tamanoFuente * 0.75) + "px Playfair Display";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText(letrasIncorrectas.join(" "), ancho * 0.5, alto * 0.7);
    brush.fill();
}

/**
 * It draws the word that the user was supposed to guess
 */
function palabraCorrecta() {
    brush.fillStyle = "black";
    brush.strokeStyle = "black";
    brush.font = "bold 20px Playfair Display";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText("La palabra correcta era " + palabra, ancho * 0.5, alto * 0.95);
    brush.fill();
}

/**
 * If the number of errors is less than or equal to 3, draw the mastil, otherwise draw the hombrecito.
 * @param errores - number of errors
 */
function dibujarErrores(errores) {
    if(errores <= 3){
        dibujarMastil(0.36, 0.47, errores);
    }else{
        dibujarHombrecito(0.61, 0.24, errores);
    }
}

/**
 * It draws a triangle with a line through it.
 * @param x - the x coordinate of the top left corner of the base of the mast
 * @param y - 0.5
 */
function dibujarBaseMastil(x,y) {
    brush.strokeStyle = "black";
    brush.lineWidth = 3;
    brush.beginPath();
    brush.moveTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.22), alto * y);
    brush.lineTo(ancho * (x + 0.11), alto * (y - 0.08));
    brush.lineTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.1), alto * y);
    brush.stroke();
}

/**
 * It draws a vertical line, then a horizontal line, then a diagonal line.
 * @param x - the x coordinate of the top left corner of the canvas
 * @param y - the y-coordinate of the top of the gallows
 * @param parte - 1 = vertical mast, 2 = horizontal mast, 3 = rope
 */
function dibujarMastil(x,y,parte) {
    brush.strokeStyle = "black";
    brush.lineWidth = 3;

    switch (parte) {
        case 1:  //Mastil Vertical
            brush.beginPath();
            brush.moveTo(ancho * x, alto * y);
            brush.lineTo(ancho * x, alto * (y - 0.3));
            brush.stroke();
            break;
        case 2:  //Mastil Horizontal
            brush.beginPath();
            brush.moveTo(ancho * x, alto * (y - 0.3));
            brush.lineTo(ancho * (x + 0.25), alto * (y - 0.3));
            brush.stroke();
            break;
        case 3:  //Soga
            brush.beginPath();
            brush.lineTo(ancho * (x + 0.25), alto * (y - 0.3));
            brush.lineTo(ancho * (x + 0.25), alto * (y - 0.265));
            brush.stroke();
            break;
    }
}

/**
 * It draws a stick figure on the canvas, based on the parameters passed to it.
 * 
 * The first two parameters are the x and y coordinates of the figure. The third parameter is a number
 * that tells the function which part of the figure to draw.
 * 
 * The function uses a switch statement to determine which part of the figure to draw.
 * 
 * The first case draws the head. The second case draws the body. The third case draws the left arm.
 * The fourth case draws the right arm. The fifth case draws the left leg. The sixth case draws the
 * right leg.
 * 
 * The function uses the global variables ancho and alto to determine the size of the figure.
 * 
 * The function uses the global variable salvado to determine whether the figure is being drawn in the
 * "saved" position.
 * 
 * The function uses the global variable brush to draw the figure.
 * @param x - The x coordinate of the center of the circle.
 * @param y - 0.05
 * @param parte - the part of the body to draw
 */
function dibujarHombrecito(x,y,parte) {
    brush.strokeStyle = "black";
    brush.lineWidth = 3;

    switch (parte) {
        case 4:  //Cabeza
            brush.beginPath();
            brush.arc(ancho * x, alto * y, 18, 0, 2 * Math.PI);
            brush.stroke();
            break;
        case 5:  //Cuerpo
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.036));
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.stroke();
            break;    
        case 6:  //Brazo Izquierdo
            if(salvado){
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.065));
                brush.lineTo(ancho * (x - 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            }else{
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.06));
                brush.lineTo(ancho * (x - 0.05), alto * (y + 0.12));
                brush.stroke();
                break;
            }
        case 7:  //Brazo Derecho    
            if(salvado){
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.065));
                brush.lineTo(ancho * (x + 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            }else{
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.06));
                brush.lineTo(ancho * (x + 0.05), alto * (y + 0.12));
                brush.stroke();
                break;
            }
        case 8:  //Pierna Derecha
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.lineTo(ancho * (x + 0.04), alto * (y + 0.25));
            brush.stroke();
            break;
        case 9:  //Pierna Izquierda
            salvado = false;
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.lineTo(ancho * (x - 0.04), alto * (y + 0.25));
            brush.stroke();
            break;        
    }
}


/**
 * It draws a smiley face or a sad face depending on the value of the boolean parameter
 * @param x - the x coordinate of the center of the face
 * @param y - the y coordinate of the canvas
 * @param salvado - boolean, true if the person is saved, false if the person is dead
 */
function dibujarCarita(x,y,salvado) {
    if(salvado){
        brush.strokeStyle = "black";
        brush.lineWidth = 2.5;
        brush.beginPath();
        brush.arc(ancho * x, alto * y, 1.4, 0, 2 * Math.PI);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.03), alto * y, 1.4, 0, 2 * Math.PI);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.015), alto * (y + 0.008), 10, 0.35, 0.9 * Math.PI);
        brush.stroke();
    }else{
        brush.strokeStyle = "red";
        brush.lineWidth = 2.5;
        brush.beginPath();
        brush.lineTo(ancho * x, alto * y);
        brush.lineTo(ancho * (x - 0.017), alto * (y - 0.014));
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * x, alto * (y - 0.014));
        brush.lineTo(ancho * (x - 0.017), alto * y);
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * (x + 0.017), alto * y);
        brush.lineTo(ancho * (x + 0.034), alto * (y - 0.014));
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * (x + 0.017), alto * (y - 0.014));
        brush.lineTo(ancho * (x + 0.034), alto * y);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.008), alto * (y + 0.035), 12, 3.656, 1.84 * Math.PI);
        brush.stroke();
    }
}

/**
 * "If the variable salvado is true, then clear the screen, draw the man, and draw a happy face."
 * 
 * The function is called in the following function:
 */
function hombrecitoSalvado() {
    salvado = true;
    limpiarPantalla(0, 0, ancho, alto * 0.58);
    dibujarHombrecito(0.5, 0.3, 4);
    dibujarHombrecito(0.5, 0.3, 5);
    dibujarHombrecito(0.5, 0.3, 6);
    dibujarHombrecito(0.5, 0.3, 7);
    dibujarHombrecito(0.5, 0.3, 8);
    dibujarHombrecito(0.5, 0.3, 9);
    dibujarCarita(0.485, 0.292, true);
}

/**
 * It writes a word on the canvas, alternating between red and black every half second
 * @param palabra - the word to be written
 */
function escribir(palabra) {
    var color = "red";
    var time = setInterval(function(){
        if(!iniciarJuego){
            brush.clearRect(0, 0, ancho, alto * 0.11);
            brush.fillStyle = color;
            brush.strokeStyle = color;
            brush.font = "bold 32px Playfair Display";
            brush.textAlign = "center";
            brush.beginPath();
            brush.fillText(palabra, ancho * 0.5, alto * 0.1);
            brush.fill();
            brush.stroke();

            if(color == "red"){
                color = "black";
            }else{
                color = "red";
            }
        }else{
            clearInterval(time);
        }
    }, 500);
}
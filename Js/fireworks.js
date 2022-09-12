/* Setting the variables for the fireworks. */
var bits = 200;
var intensity = 5;
var speed = 15;
var colours = new Array("#FF8000", "#5FB404", "#084B8A", "#DF0101", "#FF0080", "#00ffea", "#eeff00");
var dx, xpos, ypos, bangheight;
var Xpos = new Array();
var Ypos = new Array();
var dX = new Array();
var dY = new Array();
var decay = new Array();
var colour = 0;
var swide = 1000;
var shigh = 800;
var on = false;

/**
 * It creates a bunch of divs and appends them to the body.
 * @returns Nothing.
 */
function write_fite() {
    if(on){
        var b, s;
        b = document.createElement("div");
        s = b.style;
        s.position = "absolute";
        b.setAttribute("id", "bod");
        document.body.appendChild(b);
        set_scroll(); set_width();
        b.appendChild(div("lg", 3, 4));
        b.appendChild(div("tg", 2, 3));
        for (var i = 0; i < bits; i++) b.appendChild(div("bg" + i, 1, 1));
    }else{
        return "";
    }
}

/**
 * It creates a div element with the specified id, width, and height.
 * @param id - the id of the div
 * @param w - width of the div
 * @param h - height of the image
 * @returns A div element with the id, width, and height specified.
 */
function div(id, w, h) {
    if(on){
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.overflow = "hidden";
        d.style.width = w + "px";
        d.style.height = h + "px";
        d.setAttribute("id", id);
        return(d);
    }else{
        return "";
    }
}

/**
 * If the on variable is true, then for each bit, move it to a new position, and if it's not too old,
 * make it visible.
 * @returns Nothing.
 */
function bang() {
    if(on){
        var i, X, Y, Z, A = 0;
        for (var i = 0; i < bits; i++) {
            X = Math.round(Xpos[i]); Y = Math.round(Ypos[i]);
            Z = document.getElementById("bg" + i).style;
            if((X >= 0) && (X < swide) && (Y >= 0) && (Y < shigh)){ Z.left = X + "px"; Z.top = Y + "px";}
            if((decay[i] -= 1) > 14){ Z.width = "3px"; Z.height = "3px";}
            else if(decay[i] > 7) { Z.width = "2px", Z.height = "2px";}
            else if(decay[i] > 3) { Z.width = "1px"; Z.height = "1px";}
            else if(++A) Z.visibility = "hidden";
            Xpos[i] += dX[i];
            Ypos[i] += (dY[i] += 0.1 / intensity);
        }
        if(A != bits) setTimeout("bang()", speed);
    }else{
        return "";
    }
}

/**
 * If the fireworks are on, then move the firework to the new position, and if the firework is out of
 * bounds, then create a new firework.
 * @returns Nothing.
 */
function stepthrough() {
    if(on){
        var i, Z;
        var oldx = xpos;
        var oldy = ypos; xpos += dx; ypos -= 4;
        if(ypos < bangheight || xpos < 0 || xpos >= swide || ypos >= shigh){
            for (var i = 0; i < bits; i++) {
                Xpos[i] = xpos;
                Ypos[i] = ypos;
                dY[i] = (Math.random() - 0.5) * intensity;
                dX[i] = (Math.random() - 0.5) * (intensity - Math.abs(dY[i])) * 1.25;
                decay[i] = Math.floor((Math.random() * 20) + 20);
                Z = document.getElementById("bg" + i).style;
                Z.backgroundColor = colours[colour];
                Z.visibility = "visible";
            } bang(); launch();
        }
        document.getElementById("lg").style.left = xpos + "px";
        document.getElementById("lg").style.top = ypos + "px";
        document.getElementById("tg").style.left = oldx + "px";
        document.getElementById("tg").style.top = oldy + "px";
    }else{
        return "";
    }
}

/**
 * If the on variable is true, then set the colour variable to a random number between 0 and the length
 * of the colours array, set the xpos variable to a random number between 0 and half the width of the
 * screen, set the ypos variable to the height of the screen minus 5, set the dx variable to a random
 * number between -2 and 2, set the bangheight variable to a random number between 0 and half the
 * height of the screen, set the background colour of the lg div to the colour at the index of the
 * colour variable in the colours array, and set the background colour of the tg div to the colour at
 * the index of the colour variable in the colours array.
 * @returns Nothing.
 */
function launch() {
    if(on){
        colour = Math.floor(Math.random() * colours.length);
        xpos = Math.round((0.5 + Math.random()) * swide * 0.5);
        ypos = shigh - 5;
        dx = (Math.random() - 0.5) * 4;
        bangheight = Math.round((0.5 + Math.random()) * shigh * 0.4);
        document.getElementById("lg").style.backgroundColor = colours[colour];
        document.getElementById("tg").style.backgroundColor = colours[colour];
    }else{
        return "";
    }
}

/**
 * If the page is scrolled, then the div is scrolled with it.
 * @returns Nothing.
 */
window.onscroll = set_scroll;
function set_scroll() {
    if(on){
        var sleft, sdown;
        if(typeof(self.pageYOffset) == "number"){
            sdown = self.pageYOffset;
            sleft = self.pageXOffset;
        }
        else if(document.dody.scrollTop || document.body.scrollLeft){
            sdown = document.body.scrollTop;
            sleft = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            sleft = document.documentElement.scrollLeft;
            sdown = document.documentElement.scrollTop;
        }
        else { sdown = 0; sleft = 0; }
        var s = document.getElementById("bod").style;
        s.top = sdown + "px";
        s.left = sleft + "px";
    }else{
        return "";
    }
}

/**
 * If the window is resized, set the width of the window to the width of the window.
 * @returns Nothing.
 */
window.onresize = set_width;
function set_width() {
    if (on) {
        if (typeof (self.innerWidth) == "number") { swide = self.innerWidth; shigh = self.innerHeight; }
        else if (document.documentElement && document.documentElement.clientWidth) {
            swide = document.documentElement.clientWidth;
            shigh = document.documentElement.clientHeight;
        }
        else if (document.body.clientWidth) {
            swide = document.body.clientWidth;
            shigh = document.body.clientHeight;
        }
    } else {
        return "";
    }
}

/**
 * If the browser supports the getElementById method, and the on variable is true, then set the width
 * of the text, write the text, launch the text, and set the interval to stepthrough the text.
 */
function encender() {
    if(document.getElementById){
        if(on){
            set_width(); write_fite(); launch(); setInterval('stepthrough', speed);
        }
    }
}

/**
 * If the variable on is true, then set it to false, remove the body element, and stop the interval.
 */
function apagar() {
    if(on){
        on = false;
        document.getElementById("bod").remove();
        clearInterval('stepthrough()');
    }
}
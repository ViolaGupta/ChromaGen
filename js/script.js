/**
* @Author: gyanl, ananayarora, colllnwalkr
* @Date:   2016-10-03T09:56:56+05:30
* @Last modified by:   ananayarora
* @Last modified time: 2016-10-03T10:00:14+05:30
*/

var newColour = [];
var format = 'hex';
var currentColor = 0;
var numButtons = 6;
var listOfIndexes = [0,1,2,3,4,5];

function synchronize() {
    function synchronizeList(index) {
        if(index === currentColor) {
            document.getElementById("c" + index).classList.add("focus");
        }
        else {
            document.getElementById("c" + index).classList.remove("focus");
        }
    }

    listOfIndexes.forEach(synchronizeList);
}

function clearFocus() {
    function removeFocus(index) {
        document.getElementById("c" + index).classList.remove("focus");
    }

    listOfIndexes.forEach(removeFocus);
}

function changeColorFormat() {
    format = document.querySelector('input[type="radio"]:checked').value;
}

function genColor() {
    var a = "";
    for (var i = 0; i < 3; i++)
        a = a.concat(Math.floor(Math.random() * 255).toString(16));

    if (a.length < 6) {
        for (var i = 0; i < (6 - a.length); i++)
            a = "0" + a;
    }
    return "#" + a;
}

function changeColour(num) {
    if (num !== -1) {
        currentColor = num;
        new_color = newColour[num];
        synchronize();
        //outline();  either use the fn or just write the code here.
    } else {
        new_color = genColor();
        newColour.unshift(new_color);
        currentColor = 0;
        for (var i = 0; i < 6; i++) {
            var div_id = "c" + (i);
            document.getElementById(div_id).style.background = newColour[i];
            document.getElementById('c0').focus();
        }
        clearFocus();
    }
    updateUI(new_color);
}
function changeGradient(num) {
    
    if (num !== -1) {
        currentColor = num;
        new_color = newColour[num];
        synchronize();
        //outline();  either use the fn or just write the code here.
    } else {
       new_color = genColor();
      new_color2 = genColor();
       
        newColour.unshift(new_color);
        newColour.unshift(new_color2);
        currentColor = 0;
        for (var i = 0; i < 6; i++) {
            var div_id = "c" + (i);
            document.getElementById(div_id).style.background = "linear-gradient("+newColour[i]+", "+newColour[i+1]+")";  
            document.getElementById('c0').focus();
        }
        clearFocus();
    }
    updateUI2(new_color,new_color2);
}
function updateUI2(color,color2){
    if(color){
        document.body.style.background = "linear-gradient("+color+", "+color2+")";
        document.getElementById('clipboard').style.background = "linear-gradient("+color+", "+color2+")";
        document.getElementById('generate').style.background = "linear-gradient("+color+", "+color2+")";
        document.getElementById('copyall').style.background = "linear-gradient("+color+", "+color2+")";
        document.getElementById('gradient').style.background = "linear-gradient("+color+", "+color2+")";
        document.getElementById('clipboard').setAttribute("data-clipboard-text", formatColor2(color,color2));
    }
}
function updateUI(color){
    if(color){
        document.body.style.backgroundColor = color;
        document.getElementById('clipboard').style.background = color;
        document.getElementById('generate').style.background = color;
        document.getElementById('copyall').style.background = color;
        document.getElementById('gradient').style.background = color;
        document.getElementById('clipboard').setAttribute("data-clipboard-text", formatColor(color));
    }
}

function formatColor(color) {
    color = convertColor(color, format);
    return color;
}
function formatColor2(color,color2) {
    color = convertColor(color, format);
    color2 = convertColor(color2, format);
    return "linear-gradient("+color+", "+color2+")";
}

function toast(yo) {
    synchronize();
    yo.setAttribute("data-clipboard-text", formatColor(newColour[currentColor]));
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
    copyTextToClipboard(formatColor(newColour[currentColor]));
}

function copyAll(yo) {
    synchronize();
    var colors = formatColor(newColour[0]);
    for (var i = 1; i < 6; i++) {
        if (newColour[i]) {
            colors = colors + ", " + formatColor(newColour[i]);
        }
    }
    document.getElementById('copyall').setAttribute("data-clipboard-text", colors);
    copyTextToClipboard(colors)
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function start() {
    var clipboard = new Clipboard('.btn');
    changeColour(-1);
}

function shiftColorLeft(num){
    num -= 1;
    if(num < 0){
        num = numButtons - 1;
    }
    document.getElementById('c' + num).focus()
    updateUI(newColour[num]);
    currentColor = num;
}

function shiftColorRight(num){
    num += 1;
    if(num >= numButtons){
        num = 0;
    }
    document.getElementById('c' + num).focus()
    updateUI(newColour[num]);
    currentColor = num;
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 82:
        changeColour(-1);
        break;

        case 67:
        var color = document.getElementById('clipboard');
        toast(color)
        break;
        
        case 65:
        var color = document.getElementById('copyall');
        copyAll(color)
        break;

        case 37:
        shiftColorLeft(currentColor)
        break;

        case 39:
        shiftColorRight(currentColor)
        break;
    }
};

// From: Dean Taylor at http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
    } catch (err) {
    }

    document.body.removeChild(textArea);
}

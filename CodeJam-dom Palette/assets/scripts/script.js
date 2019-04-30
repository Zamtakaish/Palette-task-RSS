'use strict';

const buttonContainer = document.getElementsByClassName("main__workspace__tools__items");
const buttons = buttonContainer[0].getElementsByClassName("main__workspace__tools__items__tool");

function setActive() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            const current = buttonContainer[0].getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
            if (this === buttons[1]){
                document.body.addEventListener("mouseup", chooseColor);
            }
        });
        buttons[i].addEventListener("mousedown", function() {
            if (buttonContainer[0].getElementsByClassName("active") !== buttons[1]){
                document.body.removeEventListener("mouseup", chooseColor);
            }
        });
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === 'b'||event.key === 'B'||event.key === 'и'||event.key === 'И'){
            const current = buttonContainer[0].getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            buttons[0].className += " active";
        }
        if (event.key === 'e'||event.key === 'E'||event.key === 'у'||event.key === 'У'){
            const current = buttonContainer[0].getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            buttons[1].className += " active";
            document.body.addEventListener("mouseup", chooseColor);
        }
        if (event.key === 'm'||event.key === 'M'||event.key === 'ь'||event.key === 'Ь'){
            const current = buttonContainer[0].getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            buttons[2].className += " active";
        }
        if (event.key === 't'||event.key === 'T'||event.key === 'е'||event.key === 'Е'){
            const current = buttonContainer[0].getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            buttons[3].className += " active";
        }
    });
}

const canvas = document.getElementsByClassName("main__workspace__canvas");
const canvasCells = canvas[0].getElementsByClassName("main__workspace__canvas__item");

function canvasRespond(){
    for (let i = 0; i < canvasCells.length; i++) {
        canvasCells[i].addEventListener("click", function(event) {
            if (buttonContainer[0].getElementsByClassName("active")[0] === buttons[0]){
                canvasCells[i].style.backgroundColor = getComputedStyle(document.getElementsByClassName("main__workspace__colors__palette__item_color-display_current-color")[0]).backgroundColor;
            }
            if (buttonContainer[0].getElementsByClassName("active")[0] === buttons[3]){
                if (getComputedStyle(canvasCells[i]).borderRadius === '0px'){
                    canvasCells[i].style.borderRadius = '50%';
                }
                else
                    canvasCells[i].style.borderRadius = '0';
            }
        });
        canvasCells[i].addEventListener("mousedown", function(event){
            if (buttonContainer[0].getElementsByClassName("active")[0] === buttons[2]){
                move(this, event);
            }
        });
    }
}


function chooseColor() {
        if ((buttonContainer[0].getElementsByClassName("active")[0] === buttons[1])&&(event.which == 1)){
            const buffer = getComputedStyle(document.getElementById("curr-color")).backgroundColor;
            document.getElementById("curr-color").style.backgroundColor = getComputedStyle(event.target).backgroundColor;
            document.getElementById("prev-color").style.backgroundColor = buffer;
            console.log(buffer);
        }
}

function move(elem, e){

    if (e.which != 1) {
        return;
    }

    /*elem.className = elem.className.replace(" droppable", "");*/

    let downX = e.pageX;
    let downY = e.pageY;
    const prevX = +getComputedStyle(elem).left.slice(0, -2);
    const prevY = +getComputedStyle(elem).top.slice(0, -2);

    elem.style.zIndex = 10;

    function moveAt(e) {
        elem.style.left = prevX + e.pageX - downX + 'px';
        elem.style.top = prevY +  e.pageY - downY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };
    elem.onmouseup = function() {
/*        this.hidden = true;
        console.log(e.clientX + ":" + e.clientY);
        console.log(document.elementFromPoint(e.clientX, e.clientY).closest(".droppable"));
        let dropLocation = document.elementFromPoint(e.clientX, e.clientY).closest(".droppable");
        this.hidden = false;
        if (dropLocation){
            const bufferX = getComputedStyle(this).left;
            const bufferY = getComputedStyle(this).top;
            this.style.left = getComputedStyle(dropLocation).left;
            this.style.top = getComputedStyle(dropLocation).top;
            dropLocation.style.left = downX;
            dropLocation.style.top = downY;
        }
        this.className += " droppable";*/
        document.onmousemove = null;
        elem.onmouseup = null;
    };

    elem.ondragstart = function() {
        return false;
    };
}

setActive();
canvasRespond();

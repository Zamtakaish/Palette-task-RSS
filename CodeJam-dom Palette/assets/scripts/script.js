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
        });
    }
}

const canvas = document.getElementsByClassName("main__workspace__canvas");
const canvasCells = canvas[0].getElementsByClassName("main__workspace__canvas__item");
const stylesheet = document.styleSheets[0];

function canvasRespond(){
    for (let i = 0; i < canvasCells.length; i++) {
        canvasCells[i].addEventListener("click", function(event) {
            if (buttonContainer[0].getElementsByClassName("active")[0] === buttons[0]){
                canvasCells[i].style.backgroundColor = getComputedStyle(document.getElementsByClassName("main__workspace__colors__palette__item_color-display_current-color")[0]).backgroundColor;
            }
            if (buttonContainer[0].getElementsByClassName("active")[0] === buttons[3]){
                if (getComputedStyle(canvasCells[i]).borderRadius == '0px'){
                    canvasCells[i].style.borderRadius = '50%';
                }
                else
                    canvasCells[i].style.borderRadius = '0';
            }
        });
    }
}

setActive();
canvasRespond();

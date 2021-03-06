

const buttonContainer = document.getElementsByClassName('main__workspace__tools__items');
const buttons = buttonContainer[0].getElementsByClassName('main__workspace__tools__items__tool');
const canvas = document.getElementsByClassName('main__workspace__canvas');
const canvasCells = canvas[0].getElementsByClassName('main__workspace__canvas__item');
const reset = document.getElementsByClassName('footer_button_reset')[0];

function setActive() {
  function resetActiveClass(index) {
    const current = buttonContainer[0].getElementsByClassName('active');
    if (current.length > 0) {
      current[0].className = current[0].className.replace(' active', '');
    }
    buttons[index].className += ' active';
  }
  function setActiveByKeybind() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'b' || event.key === 'B' || event.key === 'и' || event.key === 'И') {
        resetActiveClass(0);
      }
      if (event.key === 'e' || event.key === 'E' || event.key === 'у' || event.key === 'У') {
        resetActiveClass(1);
      }
      if (event.key === 'm' || event.key === 'M' || event.key === 'ь' || event.key === 'Ь') {
        resetActiveClass(2);
      }
      if (event.key === 't' || event.key === 'T' || event.key === 'е' || event.key === 'Е') {
        resetActiveClass(3);
      }
    });
  }
  function setActiveByClick() {
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', () => {
        resetActiveClass(i);
      });
    }
  }

  return (function () {
    setActiveByClick();
    setActiveByKeybind();
  }());
}

function chooseColor() {
  function chooseColorHandler(event) {
    const menuButton = document.elementFromPoint(event.clientX, event.clientY).closest('.main__workspace__tools__items__tool');
    if ((buttonContainer[0].getElementsByClassName('active')[0] === buttons[1]) && (event.which === 1) && (menuButton === null)) {
      const buffer = getComputedStyle(document.getElementById('curr-color')).backgroundColor;
      document.getElementById('curr-color').style.backgroundColor = getComputedStyle(event.target).backgroundColor;
      document.getElementById('prev-color').style.backgroundColor = buffer;
    }
  }
  return document.body.addEventListener('mouseup', chooseColorHandler);
}


function fillCellByPaintBucket() {
  return (function () {
    for (let i = 0; i < canvasCells.length; i += 1) {
      canvasCells[i].style.backgroundColor = localStorage.getItem(`bckgr-clr-cell-${i}`);
      canvasCells[i].addEventListener('click', () => {
        if (buttonContainer[0].getElementsByClassName('active')[0] === buttons[0]) {
          const newColor = getComputedStyle(document.getElementsByClassName('main__workspace__colors__palette__item_color-display_current-color')[0]).backgroundColor;
          canvasCells[i].style.backgroundColor = newColor;
          localStorage.setItem(`bckgr-clr-cell-${i}`, newColor);
        }
      });
    }
  }());
}
function transformCell() {
  return (function () {
    for (let i = 0; i < canvasCells.length; i += 1) {
      canvasCells[i].style.borderRadius = localStorage.getItem(`form-cell-${i}`);
      canvasCells[i].addEventListener('click', () => {
        if (buttonContainer[0].getElementsByClassName('active')[0] === buttons[3]) {
          if (getComputedStyle(canvasCells[i]).borderRadius === '0px') {
            canvasCells[i].style.borderRadius = '50%';
            localStorage.setItem(`form-cell-${i}`, '50%');
          } else {
            canvasCells[i].style.borderRadius = '0';
            localStorage.setItem(`form-cell-${i}`, '0');
          }
        }
      });
    }
  }());
}

function moveCell() {
  function move(index, e) {
    if (e.which !== 1) {
      return;
    }
    const downX = e.pageX;
    const downY = e.pageY;
    const prevX = +getComputedStyle(canvasCells[index]).left.slice(0, -2);
    const prevY = +getComputedStyle(canvasCells[index]).top.slice(0, -2);

    canvasCells[index].style.zIndex = 10;
    localStorage.setItem(`z-index-cell-${index}`, canvasCells[index].style.zIndex);

    function moveAt(position) {
      canvasCells[index].style.left = `${prevX + position.pageX - downX}px`;
      canvasCells[index].style.top = `${prevY + position.pageY - downY}px`;
    }

    document.onmousemove = function (el) {
      moveAt(el);
    };
    canvasCells[index].onmouseup = function () {
      document.onmousemove = null;
      canvasCells[index].onmouseup = null;
      localStorage.setItem(`placement-x-cell-${index}`, canvasCells[index].style.left);
      localStorage.setItem(`placement-y-cell-${index}`, canvasCells[index].style.top);
    };

    canvasCells[index].ondragstart = function () {
      return false;
    };
  }
  return (function () {
    for (let i = 0; i < canvasCells.length; i += 1) {
      canvasCells[i].style.left = localStorage.getItem(`placement-x-cell-${i}`);
      canvasCells[i].style.top = localStorage.getItem(`placement-y-cell-${i}`);
      canvasCells[i].style.zIndex = localStorage.getItem(`z-index-cell-${i}`);
      canvasCells[i].addEventListener('mousedown', (event) => {
        if (buttonContainer[0].getElementsByClassName('active')[0] === buttons[2]) {
          move(i, event);
        }
      });
    }
  }());
}

function setCanvas() {
  fillCellByPaintBucket();
  transformCell();
  moveCell();
}

function setAdditionalInterface() {
  function resetLocalStorage() {
    reset.addEventListener('click', (event) => {
      if (event.which === 1) {
        localStorage.clear();
        document.location.reload();
      }
    });
  }
  return (function () {
    resetLocalStorage();
  }());
}

function run() {
  setActive();
  chooseColor();
  setCanvas();
  setAdditionalInterface();
}

run();

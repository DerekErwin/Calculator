let drawingBoard = document.getElementById('drawingBoard');
let gridBtn = document.getElementById('gridBtn');
let gridQuantity = document.getElementById('gridQuantity');
let gridQtyBtn = document.getElementById('gridQtyBtn');

function createGrid (size) {
    // let pixels = document.querySelectorAll(".pixel");
    // pixels.forEach((e) => {e.remove()});
    drawingBoard.innerHTML = '';
    drawingBoard.style = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`;
    for (let index = 0; index < (size * size); index++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', (e) => {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            e.target.style.background = "#" + randomColor;
        });
        drawingBoard.appendChild(pixel);
    }
}

gridBtn.addEventListener('click', () => {
    if (drawingBoard.classList.contains('grid')){
        drawingBoard.classList.remove('grid');
    }else{
        drawingBoard.classList.add('grid');
    }
});

gridQtyBtn.addEventListener('click', () => {
    createGrid(gridQuantity.value);
});



createGrid(5);

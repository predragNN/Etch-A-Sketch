const colorBtn = document.querySelector("#colorButton");
const eraseBtn = document.querySelector("#erase-button");
const colorPick = document.querySelector("#color-picker");
const rgbBtn = document.querySelector("#rainbow-button");
const rgbImg = document.querySelector("#rainbow");
const sizeBtn = document.querySelector("#size-button");
const grid = document.querySelector(".main");


/*START VALUE OD COLOR AND GRID SIZE*/
let color ="#808080";
let pixels = 16;
let divsInRow = 4;


/*FUCTIONS FOR CREATING AND CLEARING GRID - NEEDED WHEN RESIZING GRID */
function createGrid(pixels, divsInRow){
    for (let i=0; i<pixels; i++){
        const div = document.createElement("div");
        div.classList.add("kid");
        div.style.cssText=`flex: 1 1 calc(100% / ${divsInRow}); border: 1px dashed gray; cursor: pointer`;
        grid.appendChild(div);
    }
}
function clearGrid(){
    grid.innerHTML="";
}

/* INITIAL GRID CREATION */
createGrid(pixels, divsInRow);


/* COLOR BUTTON */
colorBtn.addEventListener("click", ()=>{
    colorPick.click();
});
colorPick.addEventListener("input", ()=>{
    color = colorPick.value;
    console.log(color);
    colorBtn.style.backgroundColor=color;
});


const kids = document.querySelectorAll(".kid");

/*RGB BUTTON, FUNCTION TO GET RANDOM COLOR, isClicked is used for toggling button AND COLORING IN MAIN FUNCTION */
function getRandColor(){
    let letters = '0123456789ABCDEF';
    let colorName = '#';
    for (let i = 0; i<6; i++){
        colorName += letters[Math.floor(Math.random() * 16)];
    }
    return colorName;
}
let isClicked = false;
rgbBtn.addEventListener("click",()=>{
    
    if(!rgbBtn.hasAttribute("data-clicked")){
        rgbBtn.setAttribute("data-clicked", "true");
        rgbImg.src='./images/rainbow2.png';
        isClicked = true;
        colorBtn.style.backgroundColor="#fbca1f";
    }

    else{
        rgbBtn.removeAttribute("data-clicked");
        rgbImg.src='./images/rainbow.png';
        isClicked = false;
        color="#808080";
    }
});



/*MAIN COLORING FUNCTION, COLOR ONLY WHEN MOUSE IS DOWN AND OVER */
let mouseDown = false;
document.addEventListener("mousedown",()=>{
    mouseDown = true;
});
document.addEventListener("mouseup",()=>{
    mouseDown = false;
});

kids.forEach(kid => {
    kid.addEventListener("mouseover", ()=>{
        if(mouseDown){
            if(isClicked === true){
                color="";
                color = getRandColor();
                kid.style.backgroundColor = color;
            }
            else {
                kid.style.backgroundColor = color;
            }
        }
    });
});


/*ERASE BUTTON, CLEARS THE SCREEN; TURNS DIVS BACK TO TRANSPARENT */
eraseBtn.addEventListener("click",()=>{
    const kids = document.querySelectorAll(".kid");
    kids.forEach(kid => {
        kid.style.backgroundColor = "transparent";
    });
    colorBtn.style.backgroundColor="#fbca1f";
    color = "#808080";
})


/*ADDING LISTENERS FOR COLORING; WHEN RESIZING NEW DIV(PIXEL) ELEMENTS APPEAR SO YOU NEED TO ADD LISTENERS FOR THEM
COULD HAVE BEEN AVOIDED WITH COLORING FUNCTION INSTED OF DIRECT COLORING, ALSO SAME FOR ERASE LISTENERS */
function addPixelListeners() {
    const kids = document.querySelectorAll(".kid");

    kids.forEach(kid => {
        kid.addEventListener("mouseover", () => {
            if (mouseDown) {
                if (isClicked === true) {
                    color = "";
                    color = getRandColor();
                    kid.style.backgroundColor = color;
                } else {
                    kid.style.backgroundColor = color;
                }
            }
        });
    });
}
function addEraseListeners() {
    eraseBtn.addEventListener("click", ()=>{
        kids.forEach(kid => {
            kid.style.backgroundColor = "transparent";
        });
    });
}


/*RESIZE BUTTON, CLEARS GRID THEN DUBBLES PIXELS UNTIL THEY REACH 1024, THEN IT TURNS BACK TO 16*/
sizeBtn.addEventListener("click",()=>{
    clearGrid();
    divsInRow *= 2;
    pixels = divsInRow * divsInRow;
    if (pixels > 1024){
        divsInRow = 4;
        pixels = 16;
    }
    createGrid(pixels, divsInRow);
    addPixelListeners();
});
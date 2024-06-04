const colorBtn = document.querySelector("#colorButton");
const eraseBtn = document.querySelector("#erase-button");
const colorPick = document.querySelector("#color-picker");
const grid = document.querySelector(".main");

let color ="#808080";
let pixels = 64;


let divsInRow = 8;
for (let i=0; i<pixels; i++){
    const div = document.createElement("div");
    div.classList.add("kid");
    div.style.cssText=`flex: 1 1 calc(100% / ${divsInRow}); border: 1px solid gray;`;
    grid.appendChild(div);
}

colorBtn.addEventListener("click", ()=>{
    colorPick.click();
});

colorPick.addEventListener("input", ()=>{
    color = colorPick.value;
    console.log(color);
    colorBtn.style.backgroundColor=color;
});


const kids = document.querySelectorAll(".kid");

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
            kid.style.backgroundColor = color;
        }
    });
});

eraseBtn.addEventListener("click",()=>{
    kids.forEach(kid => {
        kid.style.backgroundColor = "white";
    });
})
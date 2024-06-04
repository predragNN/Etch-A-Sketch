const colorBtn = document.querySelector("#colorButton");
const colorPick = document.querySelector("#color-picker");
let color ="";

colorBtn.addEventListener("click", ()=>{
    colorPick.click();
});

colorPick.addEventListener("input", ()=>{
    color = colorPick.value;
    console.log(color);
    colorBtn.style.backgroundColor=color;
});
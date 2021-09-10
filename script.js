let add = document.querySelector(".addme")
let idx = 1;
let size = document.querySelector(".font-size")
let she = document.querySelector(".sheet")
let fontWriteStyle= document.querySelector(".font-family")
let myAddress = document.querySelector(".cell-container")
let boldd = document.querySelector(".bold")
let italicc = document.querySelector(".italic")
let underlinee = document.querySelector(".underline")
she.addEventListener("click" , getactive)
add.addEventListener("click",function(){
    let baap = document.querySelector(".sheet-container")
    let allsheets = document.querySelectorAll(".sheet")
    let newSheet = document.createElement("div")
    newSheet.setAttribute("class" , "sheet")
    baap.appendChild(newSheet)
    idx++;
    newSheet.innerText = `Sheet ${idx}`
    for(let i = 0; i<allsheets.length;i++){
        allsheets[i].classList.remove("active")
    }
    newSheet.classList.add("active")
    newSheet.addEventListener("click" , getactive)
})
function getactive(o){
    let sheet = o.currentTarget
    let allsheets = document.querySelectorAll(".sheet")
    for(let i = 0; i<allsheets.length;i++){
        allsheets[i].classList.remove("active")
    }
    sheet.classList.add("active")
}

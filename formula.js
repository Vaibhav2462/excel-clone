let allCells = document.querySelectorAll(".cell")
let formulaContainer = document.querySelector(".formula-cont")

for(let i = 0 ; i<allCells.length ; i++){
    allCells[i].addEventListener("focus" , function(){
        let rid = allCells[i].getAttribute("rid")
        let cid = allCells[i].getAttribute("cid")
        size.value = sheetDb[rid][cid].fontSize
        fontWriteStyle.value = sheetDb[rid][cid].fontWrite
        boldd.value = sheetDb[rid][cid].bold
        if(sheetDb[rid][cid].bold == "900"){
            boldd.style.backgroundColor = "red"
        }
        else{
            boldd.style.backgroundColor = "#37b1d6"
        }
        italicc.value = sheetDb[rid][cid].italic
        if(sheetDb[rid][cid].italic == "italic"){
            italicc.style.backgroundColor = "red"
        }
        else{
            italicc.style.backgroundColor = "#37b1d6"
        }
        underlinee.value = sheetDb[rid][cid].underline
        if(sheetDb[rid][cid].underline == "underline"){
            underlinee.style.backgroundColor = "red"
        }
        else{
            underlinee.style.backgroundColor = "#37b1d6"
        }
    })
}
for(let i = 0 ; i<allCells.length;i++){
    allCells[i].addEventListener("blur",function(e){
        // console.log(e)
        // console.log(allCells[i].textContent)
        let rid = Number(allCells[i].getAttribute("rid"))
        let cid = Number(allCells[i].getAttribute("cid"))
        let val = getAddressFromRidCid(rid,cid)
        // console.log(val , rid , cid)
        if(allCells[i].textContent!=sheetDb[rid][cid].value){
            sheetDb[rid][cid].value = allCells[i].textContent
            let myFormula = sheetDb[rid][cid].formula
            let formulaArray = myFormula.split(" ")
            for(let i = 0 ; i<formulaArray.length ; i++){
                let ascii = formulaArray[i].charCodeAt(0)
                if(ascii >=65 && ascii<= 90){
                    let cellUnderObservation = formulaArray[i]
                    let {rid,cid} = getridcidfromaddress(cellUnderObservation)
                    let newChildArr = sheetDb[rid][cid].children.filter((x)=>{
                        return x!=val
                    })
                    sheetDb[rid][cid].children = newChildArr
                }
            }
            
        }
        overallGridChange(allCells[i])
        
    })
}


formulaContainer.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        let myFormula = formulaContainer.value
        // console.log(myFormula)
        let valueOfFormula = evaluateFormula(myFormula)
        let cellToBeUpdated = myAddress.value
        let {rid,cid} = getridcidfromaddress(cellToBeUpdated)
        let cellOnWork = document.querySelector(`[rid = "${rid}"][cid = "${cid}"]`)
        cellOnWork.textContent = valueOfFormula
        sheetDb[rid][cid].formula = myFormula
        sheetDb[rid][cid].value = valueOfFormula
        updateParents(myFormula , cellToBeUpdated)
        // console.log(e)
    }
})




function overallGridChange(parentCell){
    let rid = parentCell.getAttribute("rid")
    let cid = parentCell.getAttribute("cid")
    let childrens = sheetDb[rid][cid].children
    for(let i = 0 ; i<childrens.length ; i++){
        let childAddress = childrens[i]
        let {rid,cid} = getridcidfromaddress(childAddress)
        let childFormula = sheetDb[rid][cid].formula
        let myvalue = evaluateFormula(childFormula)
        sheetDb[rid][cid].value = myvalue
        let cellOnWork = document.querySelector(`[rid = "${rid}"][cid = "${cid}"]`)
        cellOnWork.innerText = myvalue
        overallGridChange(cellOnWork)
    }
}
function updateParents(formula,child){
    let formulaArray = formula.split(" ")
    for(let i = 0 ; i<formulaArray.length ; i++){
        let ascii = formulaArray[i].charCodeAt(0)
        if(ascii >=65 && ascii<= 90){
            let cellUnderObservation = formulaArray[i]
            let {rid,cid} = getridcidfromaddress(cellUnderObservation)
            sheetDb[rid][cid].children.push(child)
            console.log(sheetDb[rid][cid].children)
            // console.log("parent" , sheetDb[rid][cid])
        }
    }
}
function evaluateFormula(formula){
    let formulaArray = formula.split(" ")
    for(let i = 0 ; i<formulaArray.length ; i++){
        let ascii = formulaArray[i].charCodeAt(0)
        if(ascii >=65 && ascii<= 90){
            let cellUnderObservation = formulaArray[i]
            let {rid,cid} = getridcidfromaddress(cellUnderObservation)
            formulaArray[i] = sheetDb[rid][cid].value
        }
    }
    formulaArray = formulaArray.join(" ")
    return eval(formulaArray)
}
function getridcidfromaddress(address){
    rid = address.charCodeAt(1)-48;
    cid = address.charCodeAt(0)-64;
    return {"rid":rid , "cid" : cid}
}
// console.log(getAddressFromRidCid(1,1))
function getAddressFromRidCid(rid,cid){
    let a = String.fromCharCode(rid+48)
    let b = String.fromCharCode(cid+64)
    return b+a
}
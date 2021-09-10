let row_baap = document.querySelector(".row_count")
let col_baap = document.querySelector(".col_count")
let rows = 100
let cellContainer = document.querySelector(".cell-container")
for(let i = 0 ; i<rows ; i++){
    let newRow = document.createElement("div")
    newRow.innerText = i+1
    newRow.setAttribute("class" , "row")
    row_baap.appendChild(newRow)
}
let cols = 26
for(let i = 0 ; i <cols ; i++){
    let newCol = document.createElement("div")
    newCol.innerText = String.fromCharCode(65+i)
    newCol.setAttribute("class" , "col")
    col_baap.appendChild(newCol)
}
let sheetDb = [];
for(let i = 1 ; i<=rows ; i++ ){
    let somerow = [];
    for(let j = 1 ; j<=cols;j++){
        let pcell  = {
            fontWrite:"Times New Roman",
            fontSize:18,
            bold:"normal",
            underline:"initial",
            italic:"normal",
            value: "",
            formula: "",
            children: []
        }
        somerow.push(pcell);
    }
    sheetDb.push(somerow)
}
let grid = document.querySelector(".grid")
for(let i = 0 ; i<rows ; i++){
    let row = document.createElement("div")
    row.setAttribute("rid" , `${i+1}`)
    row.setAttribute("class","wholecell")
    for(let j = 0 ; j<cols ; j++){
        let col = document.createElement("div")
        col.setAttribute("class" , "cell")
        col.setAttribute("contentEditable" , "true")
        col.setAttribute("cid" , `${j+1}`)
        col.setAttribute("rid" , `${i+1}`)
        row.appendChild(col)
        // col.innerText = `${String.fromCharCode(65+j)}${i+1}`
        
        col.addEventListener("click" , function(){

            let colId = col.getAttribute("cid")
            colId = Number(colId)
            let rowId = row.getAttribute("rid")
            rowId = Number(rowId)
            cellContainer.value = `${String.fromCharCode(colId + 64)}${rowId}`
            let anyObj = sheetDb[rowId][colId]
            if(anyObj.bold == "bold"){
                boldd.classList.add("active-btn")
            }
            if(anyObj.bold == "normal"){
                boldd.classList.remove("active-btn")
            }
        })
        cellContainer.value='A' + 1
    }
    grid.appendChild(row)
}
let myvalue = ""
let myvaluearr = []
let tempcolid = 0;
let temprowid = 0;
let anything = 0;
let thatclass = ""
let obj = 0;
let mycell = document.querySelector(".cell-container")
let allTool = document.querySelectorAll(".toolme")
size.addEventListener("change",function(){
    let addressOfCellAtWork = myAddress.value
    let {rid,cid} = getridcidfromaddress(addressOfCellAtWork)
    sheetDb[rid][cid].fontSize = size.value
    // console.log(rid,cid)
    console.log(sheetDb[rid][cid])
    let specificcell = document.querySelector(`[rid="${rid}"]>[cid="${cid}"]`);
    specificcell.style.fontSize =  sheetDb[rid][cid].fontSize + "px"
    console.log(specificcell.style.fontSize)
})
fontWriteStyle.addEventListener("change" , function(){
    let addressOfCellAtWork = myAddress.value
    let {rid,cid} = getridcidfromaddress(addressOfCellAtWork)
    sheetDb[rid][cid].fontWrite = fontWriteStyle.value
    let specificcell = document.querySelector(`[rid="${rid}"]>[cid="${cid}"]`);
    specificcell.style.fontFamily =  sheetDb[rid][cid].fontWrite
    console.log(specificcell.style.fontFamily)
})
boldd.addEventListener("click",function(){
    let addressOfCellAtWork = myAddress.value
    let {rid,cid} = getridcidfromaddress(addressOfCellAtWork)
    let specificcell = document.querySelector(`[rid="${rid}"]>[cid="${cid}"]`);
    
    if(sheetDb[rid][cid].bold=="normal"){
        sheetDb[rid][cid].bold = "900"  
        specificcell.style.fontWeight =  sheetDb[rid][cid].bold 
        boldd.style.backgroundColor = "red"
    }
    else{
        sheetDb[rid][cid].bold = "normal"  
        specificcell.style.fontWeight =  sheetDb[rid][cid].bold
        boldd.style.backgroundColor = "#37b1d6"
    }
})
italicc.addEventListener("click",function(){
    let addressOfCellAtWork = myAddress.value
    let {rid,cid} = getridcidfromaddress(addressOfCellAtWork)
    let specificcell = document.querySelector(`[rid="${rid}"]>[cid="${cid}"]`);
    
    if(sheetDb[rid][cid].italic=="normal"){
        sheetDb[rid][cid].italic = "italic"  
        specificcell.style.fontStyle =  sheetDb[rid][cid].italic
        italicc.style.backgroundColor = "red"
    }
    else{
        sheetDb[rid][cid].italic = "normal"  
        specificcell.style.fontStyle =  sheetDb[rid][cid].italic
        italicc.style.backgroundColor = "#37b1d6"
    }
})
underlinee.addEventListener("click",function(){
    let addressOfCellAtWork = myAddress.value
    let {rid,cid} = getridcidfromaddress(addressOfCellAtWork)
    let specificcell = document.querySelector(`[rid="${rid}"]>[cid="${cid}"]`);
    
    if(sheetDb[rid][cid].underline=="initial"){
        sheetDb[rid][cid].underline = "underline"  
        specificcell.style.textDecoration =  sheetDb[rid][cid].underline
        underlinee.style.backgroundColor = "red"
    }
    else{
        sheetDb[rid][cid].underline = "initial"  
        specificcell.style.textDecoration =  sheetDb[rid][cid].underline
        underlinee.style.backgroundColor = "#37b1d6"
    }
})
// for download a file
let download = document.querySelector(".down")
let openme = document.querySelector(".open")
download.addEventListener("click" , function(){
    const data = JSON.stringify(sheetDb);
    const blob = new Blob([data], { type: 'application/json' });   // create a json file
    const url = window.URL.createObjectURL(blob);   // create a url wich is needed for the anchor tag
    let a = document.createElement("a")    // create an anchor tag
    a.download = "file.txt"   // name given to the file after download
    a.href = url    // copy the urll created above
    a.click()    // click on that url
})
openme.addEventListener("change" , function(){
    let filesarr = openme.files;  //this gives us an array of all files uploaded
    let fileobj = filesarr[0]    //gives the first file that was added
    let fr = new FileReader()    //object created for a file reader
    fr.readAsText(fileobj);     //confirm that the selected file is in text format and if not than convert it
    fr.onload = function(){     //this function loads the object
        console.log(fr.result)   //print the text on console of browser
    }
})
// 
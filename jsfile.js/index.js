console.log("Welcome To Magic Notes");
shownotes();
let btn = document.getElementById("addBtn");
btn.addEventListener('click', function (e) {
    let addtx = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes")
    let heading=document.getElementById("addHeading")
    console.log(notes)
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    
    let obj={
        title:`${heading.value}`,
        description:`${addtx.value}`
    }
    noteobj.push(obj)
    
    
    localStorage.setItem("notes", JSON.stringify(noteobj))
    
    addtx.value = ''
    heading.value=''
//    console.log(Object.keys(noteobj))
    // console.log(localStorage.getItem)
    shownotes();
})
function shownotes() {
    let notes = localStorage.getItem("notes")
    
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    let html = '';
    noteobj.forEach((function(element,index){
        
        html = html + ` <div class="note-card card my-2 mx-2" style="width: 18rem;">
        <div id=${element}${index} class="card-body" >
          <h5 class="card-title"> ${element.title}</h5>
          <p  class="card-text"> ${element.description}</p>
          <button id=${index} onclick =deletenotes(this.id) class="btn btn-primary">Delete Note</button>
          
   
        </div>
      </div> `
    }))
        
    

    let noteshtml = document.getElementById("notes");
    if (noteobj.length != 0) {
        noteshtml.innerHTML = html;
    }
    else {
        noteshtml.innerHTML = `Nothing to show use above text box to add notes`
    }
}


function deletenotes(key) {

    let notes = localStorage.getItem("notes")
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    noteobj.splice(key,1);
    localStorage.setItem("notes", JSON.stringify(noteobj));
    shownotes();

}
let inputtext=document.getElementById("inputtxt")
inputtext.addEventListener("input",function(){
    let searchnote=inputtext.value;
    let allcards=document.getElementsByClassName("note-card");
   
    Array.from(allcards).forEach(function(element){
        let ele=element.getElementsByTagName("p")[0].innerText
        let ele2=element.getElementsByTagName("h5")[0].innerText
        if(ele.includes(searchnote) || ele2.includes(searchnote)){
            element.style.display="block";
        }
        else{
            element.style.display="None";
        }
    })
})
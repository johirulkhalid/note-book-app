// selecting all document
const addBox = document.querySelector(".add_box"),
popupBox = document.querySelector(".popup_box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector('header i'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');

// months array
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
// getting loalstorage notes if exist and parsing them 
//to js object else passing an emty array or notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId;
addBox.addEventListener('click', () =>{
    titleTag.focus();
    popupBox.classList.add('show');
});
closeIcon.addEventListener('click', () =>{
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove('show');
});

// let's show localstorage data here
function showNotes() {
    // removing all previous notes before adding new
     document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) =>{
       let liTag = ` <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
       <div class="bottom_content">
           <span>${note.data}</span>
           <div class="settings">
               <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
               <ul class="menu">
                   <li onclick="updateNote(${index}, '${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                   <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Trash</li>
               </ul>
           </div>
       </div>
   </li>`
   addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
// click to showing menu
function showMenu(elem){
    elem.parentElement.classList.add('show');
    // removing show class from the settings menu on document click
    document.addEventListener('click', e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    })
}

// delete note function
function deleteNote(noteId){
   let confirmDel = confirm("Are you sure you want to delete this note?");
   if(!confirmDel) return;
    notes.splice(noteId, 1); // removing selected note from array
     // saving update note to localstorage
     localStorage.setItem("notes", JSON.stringify(notes));
     showNotes();
}
// editNote
function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}
// let's work on add note button
addBtn.addEventListener('click', e =>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        // get current date month day year 
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        // creating an object of title , desc, data
        let noteInfo = {
            title: noteTitle, description: noteDesc,
            data : `${month}, ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo); //adding new note to notes
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo; //updating specified note
        }
        
        notes.push(noteInfo); //adding new note to notes
        // saving note to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
   
})
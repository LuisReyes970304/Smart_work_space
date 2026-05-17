import Messages from "./objets.js";

const mes = new Messages();

const formNote = document.querySelector("form");
const inputNote = formNote.querySelector(".input");
const notes = document.querySelector(".listNotes");

document.addEventListener("DOMContentLoaded", () => {
    notes.innerHTML = localStorage.getItem("data") || "";
});

formNote.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = inputNote.value.trim();
    inputNote.value = "";
    if(data != "") {
        createNote(notes, data);
        console.log("New note added");
    } else { 
        console.error("Cannot create an Empty note");
        return;
    }
});

function createNote(notes, data) {
    notes.innerHTML += `
    <li class="liNote">
        <button class="deleteNote">x</button>
        <p>${data}</p>
    </li>
    `
    localStorage.setItem("data", notes.innerHTML);
};

notes.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteNote")) {
        const liNote = e.target.parentNode;
        const confirmed = await mes.confirmPopUp();
        if(confirmed){
            notes.removeChild(liNote);
            localStorage.setItem("data", notes.innerHTML);
            console.log("Note deleted from DOM and LocalStorage");
        }
    }
});



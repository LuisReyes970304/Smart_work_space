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
        <label class="state">
            <input type="checkbox" class="taskStatus">
            <span class="status">To complete</span>
        </label>
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

notes.addEventListener("change", (e) => {
    if (e.target.classList.contains("taskStatus")) {
        const status = e.target.nextElementSibling;
        if (status) {
            if (e.target.checked) {
                status.textContent = "Completed";
            } else {
                status.textContent = "To complete";
            }
            localStorage.setItem("data", notes.innerHTML);
        }
    }
});



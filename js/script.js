import Messages from "./objets.js";

const mes = new Messages();

const formNote = document.querySelector("form");
const inputNote = formNote.querySelector(".input");
const notes = document.querySelector(".listNotes");


const btnAll = document.getElementById("btnAll");
const btntoDo = document.getElementById("btntoDo");
const btnCompleted = document.getElementById("btnCompleted");

function saveNotes() {
    localStorage.setItem("notes", notes.innerHTML);
}


document.addEventListener("DOMContentLoaded", () => {
    notes.innerHTML = localStorage.getItem("notes") || "";

    const currentFilter = sessionStorage.getItem("filter") || "all";
    applyFilter(currentFilter);
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
        <p class="pLiNote">${data}</p>
        <label class="state">
            <input type="checkbox" class="taskStatus">
            <span class="status" style="color: rgb(213, 23, 2)">To complete</span>
        </label>
    </li>
    `
    saveNotes();
};

notes.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteNote")) {
        const liNote = e.target.parentNode;
        const confirmed = await mes.confirmPopUp();
        if(confirmed){
            notes.removeChild(liNote);
            saveNotes();
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
                status.style.color = "rgb(0, 98, 28)";
                e.target.setAttribute("checked", "checked"); 
            } else {
                status.textContent = "To complete";
                status.style.color = "rgb(213, 23, 2)";

                e.target.removeAttribute("checked");
            }
        saveNotes();
        }
    }
});


function applyFilter(filter) {
    const allNotes = document.querySelectorAll(".liNote");

    allNotes.forEach(note => {
        const checkbox = note.querySelector(".taskStatus");

        switch(filter) {
            case "all":
                note.style.display = "flex";
                break;

            case "todo":
                note.style.display = checkbox.checked ? "none" : "flex";
                break;

            case "completed":
                note.style.display = checkbox.checked ? "flex" : "none";
                break;
        }
    });
}

notes.addEventListener("dblclick", (e) => {
    if(e.target.classList.contains("pLiNote")){
        const pLiNote = e.target;
        pLiNote.contentEditable = "true";
        pLiNote.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                e.preventDefault();
                pLiNote.contentEditable = "false";
                saveNotes();
            }
        })
    }
})

btnAll.addEventListener("click", () => {
    sessionStorage.setItem("filter", "all");
    applyFilter("all");
});

btntoDo.addEventListener("click", () => {
    sessionStorage.setItem("filter", "todo");
    applyFilter("todo");
});

btnCompleted.addEventListener("click", () => {
    sessionStorage.setItem("filter", "completed");
    applyFilter("completed");
});
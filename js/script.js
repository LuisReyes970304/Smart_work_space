import Messages from "./objets.js";

const mes = new Messages();

const formNote = document.querySelector("form");
const inputNote = formNote.querySelector(".input");
const notes = document.querySelector(".listNotes");


const btnAll = document.getElementById("btnAll");
const btntoDo = document.getElementById("btntoDo");
const btnCompleted = document.getElementById("btnCompleted");

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
        <p class="pLiNote">${data}</p>
        <label class="state">
            <input type="checkbox" class="taskStatus">
            <span class="status" style="color: rgb(213, 23, 2)">To complete</span>
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
                status.style.color = "rgb(0, 98, 28)";
                e.target.setAttribute("checked", "checked"); 
            } else {
                status.textContent = "To complete";
                status.style.color = "rgb(213, 23, 2)";

                e.target.removeAttribute("checked");
            }
            localStorage.setItem("data", notes.innerHTML);
        }
    }
});


function filterNotes(filterType) {
    const allNotes = notes.querySelectorAll(".liNote");

    allNotes.forEach(note => {
        const checkbox = note.querySelector(".taskStatus");
        
        switch (filterType) {
            case "all":
                note.classList.remove("hidden");
                break;
            case "todo":
                if (!checkbox.checked) {
                    note.classList.remove("hidden");
                } else {
                    note.classList.add("hidden");
                }
                break;
            case "completed":
                if (checkbox.checked) {
                    note.classList.remove("hidden");
                } else {
                    note.classList.add("hidden");
                }
                break;
        }
        sessionStorage.setItem("data", notes.innerHTML);
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
                localStorage.setItem("data", notes.innerHTML);
            }
        })
    }
})

btnAll.addEventListener("click", () => filterNotes("all"));
btntoDo.addEventListener("click", () => filterNotes("todo"));
btnCompleted.addEventListener("click", () => filterNotes("completed"));
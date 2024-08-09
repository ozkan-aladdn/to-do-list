const toDo = document.querySelector("#toDo");
const date = document.querySelector("#date");
const todos = document.querySelector("#todos");

toDo.focus();

function addButon() {
  if (toDo.value === "" || date.value === "") {
    Swal.fire({
      title: "Lütfen boş alanları doldurunuz! ✏️",
    });
  } else {
    let li = document.createElement("li");
    li.classList.add("list");

    let p = document.createElement("p");
    p.textContent = `🟠 ` + toDo.value;
    p.classList.add("gorev");

    let span = document.createElement("span");
    span.textContent = date.value;
    span.classList.add("tarih");

    let div = document.createElement("div");
    div.innerHTML = "\u00d7";
    div.classList.add("delete");

    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(div);

    todos.appendChild(li);
    saveData();
  }
  toDo.value = "";
  date.value = "";
  toDo.focus();
}

const list = document.querySelector(".list");

todos.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("check");
      saveData();
    } else if (e.target.tagName === "DIV") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          e.target.parentElement.remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });

      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", todos.innerHTML);
}

function showTask() {
  todos.innerHTML = localStorage.getItem("data");
}
showTask();

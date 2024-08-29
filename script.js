let todos = [];
let completedCnt = 0;

function addTodo(){
  todos.push(
    {
      task : document.querySelector("input").value,
      completed  : false,
    }
  );

  render();
}


function clearTodos(hasCompleted){
  todos = [];
  completedCnt = 0;
  render(hasCompleted);
}

function deleteTodo(idx){
  console.log("Task completed" +  todos[idx].completed);
  if(todos[idx].completed == true){
    completedCnt--;
  }

  todos.splice(idx,1);

  render();

  if(completedCnt === todos.length){
    clearTodos(true);
  }
}

function cancelEditTodo(idx){
  let todotask = todos[idx];
  let oldDiv = createTodoComponent(todotask, idx);

  let topDiv = document.getElementById("todos");
  const newDiv = topDiv.children[idx];

  topDiv.replaceChild(oldDiv, newDiv);
}

function saveEditTodo(idx){
  const editBox = document.getElementById("" + idx);
  todos[idx] = {
    task: editBox.value,
    completed : false,
  }

  let oldDiv = createTodoComponent(todos[idx], idx);

  let topDiv = document.getElementById("todos");
  const newDiv = topDiv.children[idx];

  topDiv.replaceChild(oldDiv, newDiv);
}

function editTodo(idx){
  const topDiv = document.getElementById("todos");
  const oldDiv = topDiv.children[idx];

  const newDivEl = document.createElement("div");

  const editBox = document.createElement("input");
  editBox.setAttribute("type", "text");
  editBox.value = todos[idx].task;
  editBox.setAttribute("id", idx);

  const cancelButton  = document.createElement("button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.setAttribute("onclick", "cancelEditTodo(" + idx + ")");
  cancelButton.className = "cancel";

  const saveButton  = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.setAttribute("onclick", "saveEditTodo(" + idx + ")");
  saveButton.className = "save";

  newDivEl.appendChild(editBox);
  newDivEl.appendChild(cancelButton);
  newDivEl.appendChild(saveButton);

  newDivEl.className = "horizontal-center";

  topDiv.replaceChild(newDivEl,oldDiv);

}


function strikeTodo(idx){
  if(todos[idx].completed === false){
    completedCnt++;
  }

  if(completedCnt === todos.length){
    clearTodos(true);
    
  }

  else{

  let todotask = todos[idx];
  todos[idx].completed = true;
  let oldDiv = createTodoComponent(todotask, idx, 1);

  let topDiv = document.getElementById("todos");
  const newDiv = topDiv.children[idx];

  topDiv.replaceChild(oldDiv, newDiv);
  }
}



function createTodoComponent(todo, idx){

  const spanEl = document.createElement("span");
  const divSpan = document.createElement("div");
  const delButton = document.createElement("button");
  const editButton = document.createElement("button");
  const finishedButton  = document.createElement("button");

  spanEl.innerHTML = todo.task;
  if(todo.completed === true) spanEl.className = "strikeout";
  divSpan.appendChild(spanEl);
  divSpan.className = "tasksdiv";

  delButton.innerHTML = "Delete";
  delButton.setAttribute("onclick", "deleteTodo(" + idx + ")");
  delButton.className = "delete";

  editButton.innerHTML = "Edit";
  editButton.setAttribute("onclick", "editTodo(" + idx + ")");
  editButton.className = "edit";

  finishedButton.innerHTML = "Done";
  finishedButton.setAttribute("onclick", "strikeTodo(" + idx + ")");
  finishedButton.className = "completed";

  const divEl = document.createElement("div");

  divEl.appendChild(divSpan);
  divEl.appendChild(editButton);
  divEl.appendChild(delButton);
  divEl.appendChild(finishedButton);

  divEl.className = "horizontal-center";

  return divEl;
}


function render(hasCompleted){
  document.querySelector("#todos").innerHTML = "";
  for(let i  = 0; i < todos.length; i++){
    let todo = todos[i];
    const ele = createTodoComponent(todo, i);
    document.querySelector("#todos").appendChild(ele);
  }

  if(hasCompleted){
    setTimeout(function(){
      alert("Congratulations, you won today, keep winning!!!");
    }, 500);
  }
}
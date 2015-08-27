var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks")

// new task list item
var createNewTaskElement = function(taskString) {
  // create list item
  var listItem = document.createElement("li");
  
  // input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  // label
  var label = document.createElement("label");
  // input (text)
  var editInput = document.createElement("input");
  // button.edit
  var editButton = document.createElement("button");
  // button.delete
  var deleteButton = document.createElement("button");
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  // append elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

// add a new task
var addTask = function() {
  // create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);  
  // if input field is not add list item to incompleteTaskHolder
  if (taskInput.value !== '') {
    // append list item to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    // clears the "ADD ITEM" input field
    taskInput.value ="";
  }
}

// edit an existing task
var editTask = function() {
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
  
    // if the class of the parent is .editMode
    if (containsClass) {   
      // switch from .editMode
      // label text becomes the inputs value
      label.innerText = editInput.value;   
    } else {
      // switch to .editMode
      // input value becomes the labels text
      editInput.value = label.innerText;
    }
    
    // toggle .editMode on the list item
    listItem.classList.toggle("editMode");   
}

// delete an existing task
var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // remove parent list item from the ul
    ul.removeChild(listItem);
}

// mark a task as complete
var taskCompleted = function() {
    // append the task list item to completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// mark a task as incomplete
var taskIncomplete = function() {
    // append task list item to #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  // select taskListsItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    // bind editTask to edit button
    editButton.onclick = editTask;
    // bind the deleteTask to the delete button
    deleteButton.onclick = deleteTask;
    // bind taskIncomplete to the checkbox
    checkBox.onchange = checkBoxEventHandler;    
}

// set click handler to add task function
addButton.addEventListener("click", addTask);
// cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // bind events to list items children(taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // bind events to list items children(taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}









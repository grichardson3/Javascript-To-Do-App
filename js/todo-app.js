let toDo = [
  {
    id: 0,
    title: "groceries",
    completed: false,
  },
  {
    id: 1,
    title: "laundry",
    completed: true,
  },
  {
    id: 2,
    title: "cook dinner",
    completed: true,
  },
];

// Filters to-do items with search

const filters = {
  searchText: '',
  hideCompleted: false
}

const renderToDos = (toDo, filters) => {

  const filteredToDos = toDo.filter((todo) => {
    const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  if (!filteredToDos.length) {
    document.querySelector('#toDos').innerHTML = '<p><i style="color: #666;">no results found...</i></p>';
  } else {
    document.querySelector('#toDos').innerHTML = '';
  }

  filteredToDos.forEach((todo) => {

    const toDoElement = document.createElement('p');
    toDoElement.setAttribute('class', 'paragraph');

    /*const toDoDelete = document.createElement('a');
    toDoDelete.setAttribute('href', '#');
    toDoDelete.setAttribute('class', 'deleteItem');
    toDoDelete.setAttribute('id', todo.id);
    toDoDelete.textContent = "Delete Item";*/

    if (!todo.completed) {
      toDoElement.textContent = todo.title + " - " + "incomplete";
      document.querySelector('#toDos').appendChild(toDoElement);
      // document.querySelector('#toDos').appendChild(toDoDelete);
    } else {
      toDoElement.textContent = todo.title + " - " + "completed";
      document.querySelector('#toDos').appendChild(toDoElement);
      // document.querySelector('#toDos').appendChild(toDoDelete);
    }
  });

  const incompleteToDos = toDo.filter((todo) => {
    return !todo.completed;
  });

  if (document.querySelector("h3")) {
    const changeSummary = document.querySelector("h3");
    if (incompleteToDos.length > 1 || incompleteToDos.length == 0) {s = "s"} else {s = ""}
    changeSummary.textContent = `You have ${incompleteToDos.length} incomplete todo${s} left`;
  }
}

renderToDos(toDo, filters);

document.querySelector('#searchToDo').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderToDos(toDo, filters);
});

document.querySelector("#toDoForm").addEventListener('submit', (e) => {

  e.preventDefault();

  if (!e.target.elements.toDoInput.value == "") {
    toDo.push({
      id: toDo.length,
      title: e.target.elements.toDoInput.value,
      completed: false
    });
  }

  renderToDos(toDo, filters);
  e.target.elements.toDoInput.value = "";
});

document.querySelector('#hideCompleted').addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  renderToDos(toDo, filters);
});

document.querySelectorAll('.deleteItem').forEach(element => {
  element.addEventListener('click', (e) => {
    // If statement that complares individual toDo.id to id attached on delete item button
    // This should be a forEach function
    /*console.log(e.target.id);
    if (toDo.id == e.target.id) {
      toDo.pop();
    }*/
  });
  renderToDos(toDo, filters);
});

/*****/

// Return and render incomplete to-do items

const incompleteToDos = toDo.filter((todo) => {
  return !todo.completed;
});

const summary = document.createElement("h3");
if (incompleteToDos.length > 1 || incompleteToDos.length == 0) {s = "s"} else {s = ""}
summary.textContent = `You have ${incompleteToDos.length} incomplete todo${s} left`;
document.querySelector("body").appendChild(summary);

/*****/

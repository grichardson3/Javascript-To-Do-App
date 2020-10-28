const toDo = getSavedToDos();

const filters = {
  searchText: '',
  hideCompleted: false
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
      id: uuidv4(),
      title: e.target.elements.toDoInput.value,
      completed: false
    });
  }
  saveToDos(toDo);
  renderToDos(toDo, filters);
  e.target.elements.toDoInput.value = "";
});

document.querySelector('#hideCompleted').addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderToDos(toDo, filters);
});

renderDOMSummary();
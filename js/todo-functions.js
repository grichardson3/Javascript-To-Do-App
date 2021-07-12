const getSavedToDos = () => {
    const toDoJSON = localStorage.getItem('toDo');
    if (toDoJSON !== null) {
        return JSON.parse(toDoJSON);
    } else {
        return [];
    }
}

const saveToDos = (toDo) => {
    localStorage.setItem('toDo', JSON.stringify(toDo));
}

const removeToDo = (id) => {
    const toDoIndex = toDo.findIndex((todo) => {
        return todo.id === id;
    });

    if (toDoIndex > -1) {
        toDo.splice(toDoIndex, 1);
    }
}

const renderToDos = (toDo, filters) => {

    const filteredToDos = toDo.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    if (!filteredToDos.length) {
        document.querySelector('#toDos').innerHTML = '<div><span><i>no results found...</i></span></div>';
    } else {
        document.querySelector('#toDos').innerHTML = '';
    }

    filteredToDos.forEach((todo) => {

        const toDoElement = document.createElement('div');
        const checkbox = document.createElement('input');
        const toDoText = document.createElement('span');
        const deleteButton = document.createElement('button');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'form-check-input')
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.textContent = "Delete";

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked == true) {
                todo.completed = true;
                saveToDos(toDo);
                renderToDos(toDo, filters);
            } else {
                todo.completed = false;
                saveToDos(toDo);
                renderToDos(toDo, filters);
            }
        });

        deleteButton.addEventListener('click', (e) => {
            removeToDo(todo.id);
            saveToDos(toDo);
            renderToDos(toDo, filters);
        });

        if (todo.title.length > 0) {
            toDoText.textContent = todo.title;
        } else {
            toDoText.textContent = "Unnamed to-do";
        }

        if (!todo.completed) {
            // toDoText.textContent = todo.title + " - incomplete";
            toDoText.textContent = todo.title;
            document.querySelector('#toDos').appendChild(toDoElement);
            toDoElement.appendChild(checkbox);
            toDoElement.appendChild(toDoText);
            toDoElement.appendChild(deleteButton);
            checkbox.checked = false;
        } else {
            // toDoText.textContent = todo.title + " - completed";
            toDoText.textContent = todo.title;
            document.querySelector('#toDos').appendChild(toDoElement);
            toDoElement.appendChild(checkbox);
            toDoElement.appendChild(toDoText);
            toDoElement.appendChild(deleteButton);
            checkbox.checked = true;
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

const renderToDoDOM = (todo) => {
    const toDoElement = document.createElement('div');
    if (todo.title.length > 0) {
        toDoElement.textContent = todo.title;
    } else {
        toDoElement.textContent = "Unnamed to-do";
    }
    return toDoElement;
}

const renderDOMSummary = () => {
    const incompleteToDos = toDo.filter((todo) => {
        return !todo.completed;
    });
    const summary = document.createElement("h3");
    if (incompleteToDos.length > 1 || incompleteToDos.length == 0) {s = "s"} else {s = ""}
    summary.textContent = `You have ${incompleteToDos.length} incomplete todo${s} left`;
    document.querySelector("#container").appendChild(summary);
}
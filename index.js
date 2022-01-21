add = document.getElementById("add");
let todoArray = [];
update();
function update() {
    todoStr = localStorage.getItem('todoJson');
    console.log(todoStr);
    let tableBody = document.getElementById("table-body");
    if (todoStr != null) {
        todoArray = JSON.parse(todoStr);
        str = "";
        todoArray.forEach((element, index) => {
            str += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleteItem(${index})">Delete</button></td>
      </tr>`;
        });
    }
    else {
        str = `<span class="noitemtext">No items to display here just testing</span>`;
    }
    tableBody.innerHTML = str;
}


add.addEventListener("click", () => {
    console.log("Listening....");
    taskTitle = document.getElementById(`task-title`).value;
    console.log("title=",taskTitle);
    description = document.getElementById(`description`).value;
    if (taskTitle != "") {
        if (localStorage.getItem('todoJson') == null) {
            todoArray = [];
            todoArray.push([taskTitle, description]);
            console.log(todoArray);
            localStorage.setItem('todoJson', JSON.stringify(todoArray));
        }
        else {
            todoStr = localStorage.getItem('todoJson');
            todoArray = JSON.parse(todoStr);
            console.log(todoArray);
            todoArray.push([taskTitle, description]);
            localStorage.setItem('todoJson', JSON.stringify(todoArray));
        }
        let tableBody = document.getElementById("table-body");
        str = "";
        todoArray.forEach((element, index) => {
            str += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="delbtn btn btn-sm btn-primary" onclick="deleteItem(${index})">Delete</button></td>
      </tr>`;
        });
        tableBody.innerHTML = str;
    }
})

function deleteItem(itemIndex) {
    console.log("deleting...!")
    todoStr = localStorage.getItem('todoJson');
    todoArray = JSON.parse(todoStr);
    todoArray.splice(itemIndex, 1);
    localStorage.setItem('todoJson', JSON.stringify(todoArray))
    update();
}

function clearStorage() {
    console.log("clearing storage....")
    if (confirm("This will delete all the todos from storage.Do want to continue...")) {
        localStorage.clear();
        update();
    }
}
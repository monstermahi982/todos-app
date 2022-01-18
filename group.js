// checking session of user
const userName = sessionStorage.getItem("name");
const userId = sessionStorage.getItem("id")
if (!userName || !userId) {
    window.location.href = "login.html";
}


// set user name
const nameU = document.getElementById('user-name');
nameU.innerText = userName

// logout
function logout() {
    sessionStorage.clear();
    window.location.reload()
}


// dislay the data
const div = document.getElementById("tasks");
const total_task = document.getElementById("total_task");
const compete_task = document.getElementById("complete_task");
const incomplete_task = document.getElementById("incomplete_task");

async function getTasks() {

    const total_data = await axios.get(`http://localhost:3000/group`);
    total_task.innerText = `${total_data.data.length}`;

    const comp_data = await axios.get(`http://localhost:3000/group?status=true`);
    compete_task.innerText = `${comp_data.data.length}`;

    const incomp_data = await axios.get(`http://localhost:3000/group?status=false`);
    incomplete_task.innerText = `${incomp_data.data.length}`;

    const data = await axios.get(`http://localhost:3000/group`)
    // checking length
    if (data.data.length === 0) {
        div.innerHTML = ` <h3 style="text-align:center;">no task is there</h3> `;
        return
    }
    data.data.slice().reverse().forEach(function (data) {
        if (data.status === true) {
            var task = document.createElement('div');
            task.innerHTML = `<div class="particular-task">
                                <input type="checkbox" disabled checked id="task-check">
                                <div class="label">
                                    <h6 class="kast" id=" task-given">Given by :- ${data.given_name}</h6>
                                    <h6 class="kast" id=" task-taken">Completed by :- ${data.done_name}</h6>
                                </div>
                                <label id=" task-message" style="text-decoration: line-through;">${data.task}</label>
                                <label id="task-time">${data.time} time</label>
                                <button id="delete-task" onClick="deleteTask(${data.id})">delete</button>
                            </div>`
            div.appendChild(task);
        } else {
            var task = document.createElement('div');
            task.innerHTML = `<div class="particular-task">
                                    <input type="checkbox" id="task-check" onClick="taskComp(${data.id})">
                                    <div class="label">
                                        <h6 class="kast" id=" task-given">Given by :- ${data.given_name}</h6>
                                    </div>
                                    <label id=" task-message">${data.task}</label>
                                    <label id="task-time">${data.time} time</label>
                                    <button id="delete-task" onClick="deleteTask(${data.id})">delete</button>
                                </div>`
            div.appendChild(task);
        }
    })
}

// calling display task
getTasks()

// adding new task

const taskBut = document.getElementById("taskBut");
taskBut.addEventListener('click', async () => {
    var task = document.getElementById("task-input").value;
    var given_name = sessionStorage.getItem('name');
    var time = document.getElementById("time").value
    if (task === "" || time === '') {
        return;
    }
    addTasks(task, time, given_name);
})

async function addTasks(task, time, given_name) {
    await axios.post("http://localhost:3000/group", {
        given_name,
        task,
        time,
        status: false,
    });
    window.location.reload()
}

// delete task
async function deleteTask(id) {
    console.log(id);
    await axios.delete(`http://localhost:3000/group/${id}`);
    window.location.reload()
}


// complete task
async function taskComp(id) {
    const done_name = sessionStorage.getItem('name');
    const data = await axios.get(`http://localhost:3000/group/${id}`)
    await axios.put(`http://localhost:3000/group/${id}`, {
        ...data.data,
        done_name,
        status: true
    });
    window.location.reload()
}

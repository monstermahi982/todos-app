// dislay the data

const ul = document.getElementById("tasks");

async function getTasks() {
    const data = await axios.get("http://localhost:3000/tasks?user_id=1")
    data.data.slice().reverse().forEach(function (data) {
        var li = document.createElement('li');
        var test = document.createTextNode(data.task);
        li.append(test);
        ul.appendChild(li);
    })
}

// calling display task
getTasks()

// adding new user

const button = document.getElementById("but");

button.addEventListener('click', (e) => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(name);
    if (name === "" || email === "" || password === "") {
        alert("somethibng is epyty");
    }
    addUser(name, email, password);
})

async function addUser(name, email, password) {
    const data = await axios.post("http://localhost:3000/users", {
        name, email, password
    });
    console.log(data);
}

// validating the user
const loginButton = document.getElementById("login");

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById('loginemail').value;
    var password = document.getElementById('loginpassword').value;
    validateUser(email, password);

})

async function validateUser(email, password) {
    const data = await axios.get(`http://localhost:3000/users?email=${email}`);
    console.log(data);
    if (data.data.length === 0) {
        alert("user not found");
    } else {
        if (data.data[0].password === password) {
            alert("corrent user")
        } else {
            console.log("password is wrong");
        }
    }
}

// adding new task

const taskBut = document.getElementById("taskBut");

taskBut.addEventListener('click', async () => {
    // alert()
    var task = document.getElementById("task").value
    addTasks(task);
    // console.log(task)

})

async function addTasks(task) {

    await axios.post("http://localhost:3000/tasks", {
        task,
        status: false,
        user_id: 1
    });
}
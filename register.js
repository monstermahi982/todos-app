// adding new user

const button = document.getElementById("register-btn");

button.addEventListener('click', (e) => {
    e.preventDefault();
    var name = document.getElementById("reg-name").value;
    var email = document.getElementById("reg-email").value;
    var password = document.getElementById("reg-pass").value;
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
    sessionStorage.setItem("name", name)
    sessionStorage.setItem("id", data.data.id)
    window.location.href = "index.html";
}
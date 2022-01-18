// validating the user
const loginButton = document.getElementById("login-btn");

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-pass').value;
    console.log(password, "user pass");
    validateUser(email, password);

})

async function validateUser(email, password) {
    const data = await axios.get(`http://localhost:3000/users?email=${email}`);
    console.log(data);
    if (data.data.length === 0) {
        alert("user not found");
    } else {
        if (data.data[0].password === password) {
            sessionStorage.setItem("name", data.data[0].name)
            sessionStorage.setItem("id", data.data[0].id)
            window.location.href = "index.html";
        } else {
            console.log("password is wrong");
        }
    }
}
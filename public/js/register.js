console.log("TEST")

const token = localStorage.getItem("JWT");
if (token != null) {
    localStorage.href = "/public/employee-dashboard.html";
}
const registerForm = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await register();

});

async function register() {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;


    const registerRequestBody = {
        name: name,
        email: email,
        password: password,
    };
    const response = await fetch("http://localhost:8080/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerRequestBody),
        }
    )

    if (response.ok) {
        alert("Register Successful!");
        location.href = "/public/login.html";
    } else {
        alert("Register failed.");
    }
}

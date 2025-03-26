const token = localStorage.getItem("JWT");
if (token != null) {
    localStorage.href = "/scan-client.html";
}
const registerForm: Element = document.querySelector("#registerForm");

const nameImput: Element = document.querySelector("#name");
const positionImput: Element = document.querySelector("#position");
const emailImput: Element = document.querySelector("#email");
const passwordImput: Element = document.querySelector("#password");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await register();

});

async function register() {
    const name = nameImput.value;
    const email = emailImput.value;
    const password = passwordImput.value;


    const registerRequsBody = {
        name: name,
        email: email,
        password: password,
    };
    const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerRequsBody),
        }
    )
};
if (response.ok) {
    alert("Register Successful!");
    location.href = "login.html";
} else {
    alert("Register failed.");
}
const token = localStorage.getItem("JWT");
if (token != null) {
    localStorage.href = "/public/scan-client.html";
}
const registerForm: Element = document.querySelector("#registerForm");

const nameImput: Element = document.querySelector("#name");
const emailImput: Element = document.querySelector("#email");
const phoneImput: Element = document.querySelector("#phone");
const passwordImput: Element = document.querySelector("#password");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await register();

});

async function register() {
    const name = nameImput.value;
    const email = emailImput.value;
    const phone = phoneImput.value;
    const password = passwordImput.value;


    const registerRequsBody = {
        name: name,
        email: email,
        phone: phone,
        password: password,
    };
    const response = await fetch("http://localhost:8080/customers", {
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
    location.href = "/public/scan-client.html";
} else {
    alert("Register failed.");
}
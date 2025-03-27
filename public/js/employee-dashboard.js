const token = localStorage.getItem("JWT");

if (token == null) {
    location.href = "/public/login.html";
}
function searchCustomer() {
    const uuid = document.getElementById("uuidInput").value.trim();

    if (!uuid) {
        alert("Bitte geben Sie eine gültige UUID ein.");
        return;
    }

    // Здесь выполняется запрос на сервер для получения данных клиента
    fetch(`http://localhost:8080/customers/${uuid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde nicht gefunden");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("customerInfo").innerHTML = `
                        <h2>Kundendaten</h2>
                        <p><strong>ID:</strong> ${data.customerID}</p>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Telefon:</strong> ${data.phone}</p>
                        <p><strong>E-Mail:</strong> ${data.email}</p>
                    `;
        })
        .catch(error => {
            document.getElementById("customerInfo").innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}
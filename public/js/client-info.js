document.addEventListener("DOMContentLoaded", async function() {
    const uuid = "550e8400-e29b-41d4-a716-446655440000"; // Можно заменить на динамическое значение
    const historyTable = document.getElementById("pointsHistory");

    async function fetchClientData() {
        try {
            const response = await fetch(`http://localhost:8080/api/customers/${uuid}`);
            if (!response.ok) throw new Error("Kunde nicht gefunden");

            const clientData = await response.json();

            // Заполняем данные о клиенте
            document.getElementById("clientUUID").textContent = clientData.uuid;
            document.getElementById("clientName").textContent = clientData.name;
            document.getElementById("clientPhone").textContent = clientData.phone;
            document.getElementById("clientEmail").textContent = clientData.email;
            document.getElementById("clientPoints").textContent = clientData.points;

            // Заполняем историю начислений
            historyTable.innerHTML = ""; // Очищаем перед вставкой данных
            clientData.history.forEach(entry => {
                let row = historyTable.insertRow();
                row.insertCell(0).textContent = entry.date;
                row.insertCell(1).textContent = entry.reason;
                row.insertCell(2).textContent = entry.points;
            });

        } catch (error) {
            console.error("Fehler beim Abrufen der Kundendaten:", error);
        }
    }

    await fetchClientData();

    // Функция для обновления баланса на сервере
    window.updatePoints = async function(action) {
        let pointsInput = document.getElementById("pointsInput").value;
        let reasonInput = document.getElementById("reasonInput").value;

        if (!pointsInput || !reasonInput) {
            alert("Bitte geben Sie Punkte und einen Grund ein.");
            return;
        }

        let points = parseInt(pointsInput);
        if (isNaN(points)) {
            alert("Bitte geben Sie eine gültige Zahl ein.");
            return;
        }
        if (action === "subtract") points = -points;

        try {
            const response = await fetch(`http://localhost:8080/api/customers/${uuid}/points`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ reason: reasonInput, points: points })
            });

            if (!response.ok) throw new Error("Fehler beim Aktualisieren der Punkte");

            await fetchClientData(); // Обновляем данные после успешного запроса

        } catch (error) {
            console.error("Fehler beim Senden der Daten:", error);
        }
    };
});
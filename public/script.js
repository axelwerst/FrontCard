document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        de: {
            welcome: "Willkommen",
            choose_action: "Wählen Sie eine Aktion:",
            register: "Neuen Mitarbeiter registrieren",
            login: "Bereits registriert? Einloggen",
            name: "Name:",
            position: "Position:",
            birthdate: "Geburtsdatum:",
            email: "E-Mail:",
            confirm_email: "E-Mail bestätigen:",
            password: "Passwort:",
            submit: "Senden",
            back: "Zurück"
        },
        en: {
            welcome: "Welcome",
            choose_action: "Choose an action:",
            register: "Register new employee",
            login: "Already registered? Log in",
            name: "Name:",
            position: "Position:",
            birthdate: "Date of birth:",
            email: "Email:",
            confirm_email: "Confirm email:",
            password: "Password:",
            submit: "Submit",
            back: "Back"
        },
        uk: {
            welcome: "Ласкаво просимо",
            choose_action: "Оберіть дію:",
            register: "Зареєструвати нового співробітника",
            login: "Вже зареєстровані? Увійти",
            name: "Ім'я:",
            position: "Посада:",
            birthdate: "Дата народження:",
            email: "Електронна пошта:",
            confirm_email: "Підтвердьте пошту:",
            password: "Пароль:",
            submit: "Надіслати",
            back: "Назад"
        }
    };

    function changeLanguage(lang) {
        if (!translations[lang]) return; // Проверяем, есть ли такой язык

        document.querySelectorAll("[data-lang]").forEach(el => {
            const key = el.dataset.lang;
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        localStorage.setItem("selectedLang", lang); // Сохраняем выбор языка
    }

    // Проверяем, есть ли сохраненный язык
    const savedLang = localStorage.getItem("selectedLang") || "de";
    changeLanguage(savedLang);

    // Если есть переключатель языка — добавляем обработчик
    const langSwitcher = document.getElementById("languageSwitcher");
    if (langSwitcher) {
        langSwitcher.value = savedLang; // Устанавливаем сохраненный язык
        langSwitcher.addEventListener("change", function () {
            changeLanguage(langSwitcher.value);
        });
    }

    // Обработка формы регистрации
    const form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Отключаем стандартную отправку формы

            const name = document.getElementById("name").value;
            const position = document.getElementById("position").value;
            const email = document.getElementById("email").value;
            const confirmEmail = document.getElementById("confirm_email").value;

            if (email !== confirmEmail) {
                alert(translations[savedLang]["confirm_email"] + " stimmt nicht überein!");
                return;
            }

            const requestData = { name, position, email };

            try {
                const response = await fetch("http://localhost:8080/api/employees/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                if (response.ok) {
                    alert(translations[savedLang]["submit"] + " erfolgreich!");
                    form.reset();
                } else {
                    const errorData = await response.json();
                    alert("Fehler: " + errorData.message);
                }
            } catch (error) {
                console.error("Fehler:", error);
                alert("Ein Fehler ist aufgetreten.");
            }
        });
    }
    fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            position: position,
            email: email,
            confirmEmail: confirmEmail,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Преобразуем в JSON только если статус OK
        })
        .then(data => {
            console.log('Успех:', data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});
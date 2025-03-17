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
        document.querySelectorAll("[data-lang]").forEach(el => {
            el.innerHTML = translations[lang][el.dataset.lang];
        });
        localStorage.setItem("selectedLang", lang); // Сохраняем выбор языка
    }

    // Проверяем, есть ли сохраненный язык
    const savedLang = localStorage.getItem("selectedLang") || "de";
    changeLanguage(savedLang);

    // Проверяем, есть ли на странице переключатель языка
    const langSwitcher = document.getElementById("languageSwitcher");

    if (langSwitcher) {
        langSwitcher.value = savedLang; // Устанавливаем сохраненный язык в select
        langSwitcher.addEventListener("change", function () {
            changeLanguage(langSwitcher.value);
        });
    }
});
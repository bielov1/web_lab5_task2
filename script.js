function printError(error, id) {
    document.getElementById(id).textContent = error;
}

function successPage() {
    window.location.href = "./success.html";
}

function isValidEmail(email) {
    if (!email) {
        printError("будь ласка, введіть пошту", 'email_complain');
        return false;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        printError("було введено некоректну пошту: пошта повинна закінчуватися на @gmail.com", 'email_complain');
        return false;
    }
    document.getElementById('email_complain').textContent = '';
    return true;
}

function isValidDate(dateString) {
    if (!dateString) {
        printError("будь ласка, введіть вашу дату народження", 'date_complain');
        return false;
    }
    
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Місяці в Date починаються з 0
    const day = parseInt(dateParts[2], 10);
    
    const birthDate = new Date(year, month, day);

    const currentDate = new Date();
    if (birthDate > currentDate) {
        printError("Такої дати народження не існує", 'date_complain');
        return false;
    }

    document.getElementById('date_complain').textContent = '';
    return true;
}

function isConfirmedPassword(password, confirmPassword) {
    if (!password && !confirmPassword) {
        printError("Будь ласка, введіть свій пароль", 'password_complain');
        printError("Будь ласка, введіть підтверджений пароль", 'confirm_password_complain');
        return false;
    }

    if (!password && confirmPassword) {
        document.getElementById('confirm_password_complain').textContent = '';
        printError("Будь ласка, введіть свій пароль", 'password_complain');
        return false;
    }

    if (password && !confirmPassword) {
        document.getElementById('password_complain').textContent = '';
        printError("Будь ласка, введіть підтверджений пароль", 'confirm_password_complain');
        return false;
    }

    if (password.length !== confirmPassword.length) {
        document.getElementById('password_complain').textContent = '';
        printError("Введений підтверджений пароль не спіспадає з вашим паролем", 'confirm_password_complain');
        return false;
    }

    for (let i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) !== confirmPassword.charCodeAt(i)) {
            document.getElementById('password_complain').textContent = '';
            printError("Введений підтверджений пароль не спіспадає з вашим паролем", 'confirm_password_complain');
            return false;
        }
    }

    document.getElementById('password_complain').textContent = '';
    document.getElementById('confirm_password_complain').textContent = '';
    return true;
}

function verification() {
    let email = document.getElementById('email_input').value;
    let date = document.getElementById('date_input').value;
    let password = document.getElementById('password_input').value;
    let confirmPassword = document.getElementById('corfirm_password_input').value;;

    console.log(isValidEmail(email));
    console.log(isValidDate(date));
    console.log(isConfirmedPassword(password, confirmPassword));

    if (isValidEmail(email) && 
        isValidDate(date) && 
        isConfirmedPassword(password, confirmPassword)
    ) {
        successPage();
    }
}
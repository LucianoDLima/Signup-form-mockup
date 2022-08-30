/* === VARIABLES === */
const formBtn = document.querySelector('#formBtn');
const formInput = document.querySelectorAll('.form__input');
const nameInput = document.querySelector('#name');
const lastNameInput = document.querySelector('#lname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const iconError = document.querySelectorAll('.form__claim-error-icon');
const formError = document.querySelectorAll('.form__claim-error-text');
const visibilityBox = document.querySelector('.form__eye-password-visibility');
const visibilityButton = document.querySelector('.form__eye-password-visibility a');


/* === EVENT LISTENERS ===*/

// Button responsible for submition.
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nameValidation();
    mailValidation();
    passwordValidation();
    inputStyle();
    submitValidation();
})

// Responsible for making the eye button appear when pressing a key on password
passwordInput.addEventListener('keyup', () => {
    if(passwordInput.value.length >= 1 && !iconError[3].classList.contains('disable')) {
        visibilityBox.classList.remove('disable');
        visibilityBox.style.right = '4rem';
    }
    else if(passwordInput.value.length >= 1) {
        visibilityBox.classList.remove('disable');
    }
    else if(passwordInput.value == '') {
        visibilityBox.classList.add('disable')
    }
})

// Responsible for changing the input type from Text to Password 
visibilityButton.addEventListener('click', () => {
    const visibilityOn = document.querySelector('.form__password-eye-open');
    const visibilityOff = document.querySelector('.form__password-eye-close');

    visibilityOn.classList.toggle('disable')
    visibilityOff.classList.toggle('disable')

    if(visibilityOff.classList.contains('disable')) {
        passwordInput.type = 'text';
    }
    else {
        passwordInput.type = 'password';
    }
})

/* === FUNCTIONS === */

// Validades the name and the last name input
function nameValidation() {
    let noSpecialCharacters = /^[a-z]+$/ig;
    const namesRegexError = document.querySelectorAll('.form__claim-error-text2');

    formInput.forEach((item, index) => {
        switch(item.value) {
            case '':
                if(item === nameInput) {
                    addDefaultError(index);
                    item.classList.remove('completed');
                    namesRegexError[index].classList.add('disable');
                }

                if(item === lastNameInput) {
                    addDefaultError(index);
                    item.classList.remove('completed');
                    namesRegexError[index].classList.add('disable');
                }
            break;

            default:
                if(item === nameInput && !item.value.match(noSpecialCharacters)) {
                    iconError[index].classList.remove('disable');
                    formError[index].classList.add('disable');
                    namesRegexError[index].classList.remove('disable');
                    item.classList.remove('completed');
                }
                else if(item === nameInput && item.value.match(noSpecialCharacters)) {
                    removeDefaultError(index);
                    namesRegexError[index].classList.add('disable');
                    item.classList.add('completed');
                }

                if(item === lastNameInput && !item.value.match(noSpecialCharacters)) {
                    iconError[index].classList.remove('disable');
                    formError[index].classList.add('disable');
                    namesRegexError[index].classList.remove('disable');
                    item.classList.remove('completed');
                } 
                else if(item === lastNameInput && item.value.match(noSpecialCharacters)){
                    removeDefaultError(index);
                    namesRegexError[index].classList.add('disable');
                    item.classList.add('completed');
                }
        }
    })
}

// Validates only the email input
function mailValidation() {
    const mailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
    const mailError = document.querySelector('#mail-error');

    formInput.forEach((item, index) => {
        if(item === emailInput && item.value === ''){
            addDefaultError(index);
            mailError.classList.add('disable');
            item.classList.remove('completed');
        }

        if(item === emailInput && !item.value.match(mailRegex) && item.value !== '') {
            formError[index].classList.add('disable');
            iconError[index].classList.remove('disable')
            mailError.classList.remove('disable');
            item.classList.remove('completed');
        }

        else if(item === emailInput && item.value.match(mailRegex)) {
            removeDefaultError(index);
            mailError.classList.add('disable');
            item.classList.add('completed');
        }



    })
}

// Validates only the password input
function passwordValidation() {
    const passwordError = document.querySelector('#password-too-short');

    formInput.forEach((item, index) => {
        if(item === passwordInput && item.value === '') {
            addDefaultError(index);
            passwordError.classList.add('disable');
            item.classList.remove('completed');
        }
        if(item === passwordInput && item.value.length > 0 && item.value.length <6) {
            formError[index].classList.add('disable');
            iconError[index].classList.remove('disable');
            passwordError.classList.remove('disable');
            item.classList.remove('completed');
        }
        else if(item === passwordInput && item.value.length >= 6) {
            removeDefaultError(index);
            passwordError.classList.add('disable');
            item.classList.add('completed');
            
        }

        if(item === passwordInput && item.classList.contains('completed')) {
            visibilityBox.style.right = '1.9rem';
        }
        else if(item === passwordInput && !item.classList.contains('completed')) {
            visibilityBox.style.right = '4rem';
        }
        
    })
}

// Adds the border styles after validation
function inputStyle() {
    let completed = '2px solid var(--clr-input-border-completed)';
    let notCompleted = '2px solid var(--clr-input-border-error)';

    formInput.forEach((item) => {
        if(item.classList.contains('completed')) {
            item.style.border = completed;
        }
        else {
            item.style.border = notCompleted;
        }
    })
}

// Adds the icon and empty message error
function addDefaultError(index) {
    iconError[index].classList.remove('disable');
    formError[index].classList.remove('disable');
}

// Removes the icon and empty message error
function removeDefaultError(index) {
    iconError[index].classList.add('disable');
    formError[index].classList.add('disable');
}

// Makes sure all inputs have been filled correctly
function submitValidation(){
    if(nameInput.classList.contains('completed')
    && lastNameInput.classList.contains('completed')
    && emailInput.classList.contains('completed')
    && passwordInput.classList.contains('completed')) {
        setTimeout(() => {
            alert('Form submited successfully!');
            document.location.reload() 
        }, 500);
    }
}


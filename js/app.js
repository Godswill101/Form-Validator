const form = document.getElementById('form');
const username = document.getElementById('username');
const email= document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm password');
const pwShowHide = document.querySelectorAll('.showHidePw');
const pwFields = document.querySelectorAll('.password');


// Show error message
function showError(input, message){
    const formContol = input.parentElement;
    formContol.className = 'form-control error';
    const small = formContol.querySelector('small');
    small.innerText = message;
}

// Show success message on outline
function showSuccess(input){
    const formContol = input.parentElement;
    formContol.className = 'form-control success';
}

// Show / Hide Password And Change Icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', () => {
        pwFields.forEach(pwField => {
            if(pwField.type === 'password'){
                pwField.type = 'text';

                pwShowHide.forEach(icon => {
                    icon.classList.replace('fa-eye-slash', 'fa-eye')
                })
            } else {
                pwField.type = 'password';

                pwShowHide.forEach(icon => {
                    icon.classList.replace('fa-eye', 'fa-eye-slash')
                })
            }
        })
    })
});

function hideButton(x){
    x.style.visibility = 'collapse';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else{
        showError(input, 'Email is not valid')
    }
}

// Check required on every fields
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// Check to confirm Submit Btn

// Check input length on username and password
function checkLength(input, min, max){
    if(input.value.length < min) {
        showError(
            input, `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if(input.value.length > max){
        showError(
            input, `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

// Check and confirm password match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    }
}

// Get the first Field Character Name toUpperCase()
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault()

    checkRequired([ username, email, password, password2 ]);
    checkLength(username, 6, 100);
    checkLength(password, 6, 100);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})

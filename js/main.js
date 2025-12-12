const inputDivs = document.querySelectorAll('.input-div');
const form = document.querySelector('.signup-form');
const firstName = document.getElementById("firstName");
const lastName = document.getElementById('lastName');
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errors = document.querySelectorAll('.error')
const signupMsg = document.querySelector('.signup-msg');
const signupBtns = document.querySelectorAll('.signup-btn');
const requiredInputs = document.querySelectorAll('input[required]')

// deal with focus style for input-div
inputDivs.forEach(div => div.addEventListener('click',()=>{
    const input = div.querySelector('input, select');
    if (input) {
        input.focus();
        div.classList.add('focus');
    };
}))

document.addEventListener('click', (e)=>{
    inputDivs.forEach(div => {
        if (!div.contains(e.target)) div.classList.remove('focus');
    });
});

// validation
function setError(input, msg){
    input.parentElement.parentElement.querySelector('.error').textContent = msg;
}

function clearErrors(){
    errors.forEach(error => error.textContent = '');
    signupMsg.textContent = '';
}

let valid = true;

function checkEmpty(input){
    if (input.value.trim()==='') {
        setError(input, '*This field is required')
        valid=false;
    }
}
function applyCheckEmpty(){
    requiredInputs.forEach(input => checkEmpty(input))
}

function checkEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.value.match(emailPattern)) {
        setError(email, 'Enter a valid email')
        valid=false;
    }
}

function checkPhone(){
    const phonePattern = /^(?:\+[1-9]\d{7,14}|0\d{7,14})$/;
    if (phone.value.trim() !== '' && !phone.value.match(phonePattern)){
        setError(phone,'Enter a valid phone')
        valid=false;
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearErrors();
    valid=true;
    checkEmail();
    checkPhone();
    applyCheckEmpty();
})
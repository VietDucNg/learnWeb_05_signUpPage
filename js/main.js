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
function setInvalid(input, msg){
    input.parentElement.parentElement.querySelector('.error').textContent = msg;
    input.parentElement.classList.add('invalid');
}

function setValid(input) {
    input.parentElement.classList.add('valid');
}

function clearValidation(){
    errors.forEach(error => error.textContent = '');
    signupMsg.textContent = '';
    inputDivs.forEach(div => div.classList.remove('invalid','valid'))
}

let valid = true;

function checkName(name){
    const string = name.value.trim();
    if (!string.match(/^[a-zA-Z ]{2,30}$/)){
        setInvalid(name, 'Enter a valid name');
        valid=false
    } else setValid(name);
}

function checkEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.value.match(emailPattern)) {
        setInvalid(email, 'Enter a valid email')
        valid=false;
    } else setValid(email);
}

function checkPhone(){
    const value = phone.value.trim();
    const digits = value.replace(/\+/g, '');
    if (value && !value.match(/^\+?\d+$/)) {
        setInvalid(phone, 'Phone number can only contain digits, or start with +')
        valid=false;
    } else if (value && digits.length < 8 || digits.length > 15) {
        setInvalid(phone,'Phone number must contain 8-15 digits');
        valid=false;
    } else if (value && value.startsWith('+')) {
        if (!value.match(/^\+\d/)) {
            setInvalid(phone,'Number cannot end with +. It must be followed by digits');
            valid=false
        } else if (value.match(/^\+0/)) {
            setInvalid(phone, 'When using international format (+), the first digit cannot be 0');
            valid=false;
        }
    } else if (value && !value.match(/^0/)){
        setInvalid(phone, 'Local numbers must start with 0');
        valid=false;
    } else if (value) setValid(phone);
}

function checkPass(){
    const value = password.value.trim();
    if (value.length < 8) {
        setInvalid(password, 'Password must be at least 8 characters long');
        valid=false;
    } else if (!value.match(/[A-Z]/)) {
        setInvalid(password, 'Password must contain at least one uppercase letter');
        valid=false;
    } else if (!value.match(/[0-9]/)) {
        setInvalid(password, 'Password must contain at least one number');
        valid=false;
    } else if (!value.match(/[#?!@$%^&*-]/)) {
        setInvalid(password, 'Password must contain at least one special character');
        valid=false;
    } else setValid(password);
}

function checkConfirmPass() {
    if (confirmPassword.value !== password.value) {
        setInvalid(confirmPassword, 'Passwords do not match');
        valid=false;
    } else if (confirmPassword.value.trim().length>0) setValid(confirmPassword);
}

function checkEmpty(input){
    if (input.value.trim()==='') {
        setInvalid(input, '*This field is required')
        valid=false;
    }
}
function applyCheckEmpty(){
    requiredInputs.forEach(input => checkEmpty(input))
}

function reset() {
    if (valid) {
        clearValidation();
        signupMsg.textContent = 'Welcome to the ring!';
        form.reset();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearValidation();
    valid=true;
    checkName(firstName);
    checkName(lastName);
    checkEmail();
    checkPhone();
    checkPass();
    checkConfirmPass();
    applyCheckEmpty();
    reset();
})


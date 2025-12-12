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
    const value = phone.value.trim();
    const digits = value.replace(/\+/g, '');
    if (value && !value.match(/^\+?\d+$/)) {
        setError(phone, 'Phone number can only contain digits, or start with +')
        valid=false;
    } else if (value && digits.length < 8 || digits.length > 15) {
        setError(phone,'Phone number must contain 8-15 digits');
        valid=false;
    } else if (value && value.startsWith('+')) {
        if (!value.match(/^\+\d/)) {
            setError(phone,'Number cannot end with +. It must be followed by digits');
            valid=false
        } else if (value.match(/^\+0/)) {
            setError(phone, 'When using international format (+), the first digit cannot be 0');
            valid=false;
        }
    } else if (value && !value.match(/^0/)){
        setError(phone, 'Local numbers must start with 0');
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
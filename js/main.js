const inputDivs = document.querySelectorAll('.input-div');
const firstName = document.getElementById("firstName");
const lastName = document.getElementById('lastName');
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errors = document.querySelector('.error')
const signupMsg = document.querySelector('.signup-msg');


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


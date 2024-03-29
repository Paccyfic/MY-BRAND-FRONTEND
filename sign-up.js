

const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  validateForm();

  if (isFormValid()) {
    try {
      const response = await fetch('https://my-brand-backend-m9p9.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          name: usernameInput.value, 
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const result = await response.json();
      console.log (result);

      if (response.status === 201) {
        // Successful signup
        alert('Account created successfully!');
        // Redirect or perform any other actions after successful signup
        window.location.href = 'login.html';
      } else {
        // Handle signup errors
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll('.input-group');
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains('error')) {
      result = false;
    }
  });
  return result;
}

function validateForm() {
  //USERNAME
 if (usernameInput.value.trim() === '') {
    setError(usernameInput, 'Name is required!');
 } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
    setError(usernameInput, 'Name must be min 5 and max 15 charecters');
 } else {
    setSuccess(usernameInput);
 }
 //EMAIL
 if (emailInput.value.trim() == '') {
    setError(emailInput, 'Provide email address');
 } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
 } else {
    setError(emailInput, 'Provide a valid email address');
 }

 //PASSWORD
 if (passwordInput.value.trim() == '') {
    setError(passwordInput, 'Password can not be empty');
 } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
    setError(passwordInput, 'Password min 6 max 20 charecters');
 } else {
    setSuccess(passwordInput);
 }
 //CONFIRM PASSWORD
 if (confirmPasswordInput.value.trim() == '') {
    setError(confirmPasswordInput, 'This field can not be empty');
 } else if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, 'Password does not match');
 } else {
    setSuccess(confirmPasswordInput);
 }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}






/* const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm ();

});

function validateForm() {
    if (usernameInput.value.trim()==='') {
        setError(usernameInput, 'Username Required!')
    }
} */
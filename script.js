// Get DOM elements for login and signup forms and switches
const loginForm = document.getElementById('loginForm'); // Login form container
const signupForm = document.getElementById('signupForm'); // Signup form container
const switchToSignup = document.getElementById('switchToSignup'); // Link to switch to signup
const switchToLogin = document.getElementById('switchToLogin'); // Link to switch to login
const logoutNav = document.getElementById('logoutNav'); // Logout nav link

// Switch to signup form on click
switchToSignup.addEventListener('click', e => {
  e.preventDefault(); // Prevent default link behavior
  loginForm.classList.add('hidden'); // Hide login
  signupForm.classList.remove('hidden'); // Show signup
});

// Switch to login form on click
switchToLogin.addEventListener('click', e => {
  e.preventDefault(); // Prevent default link behavior
  signupForm.classList.add('hidden'); // Hide signup
  loginForm.classList.remove('hidden'); // Show login
});

// Handle login form submission
document.querySelector('#loginForm form').addEventListener('submit', e => {
  e.preventDefault(); // Prevent page reload

  const email = document.getElementById('loginEmail').value; // Get email input
  const password = document.getElementById('loginPassword').value; // Get password input

  // Check stored password in localStorage for user email
  if (localStorage.getItem(`user_${email}`) === password) {
    localStorage.setItem('token', btoa(email + ':' + password)); // Store token (base64 encoded)
    localStorage.setItem('userEmail', email); // Store user email
    window.location.href = 'form.html'; // Redirect to form page
  } else {
    alert('Invalid login'); // Show error
  }
});

// Handle signup form submission
document.querySelector('#signupForm form').addEventListener('submit', e => {
  e.preventDefault(); // Prevent reload

  const email = document.getElementById('signupEmail').value; // Get signup email
  const password = document.getElementById('signupPassword').value; // Get signup password

  // Check if user already exists in localStorage
  if (localStorage.getItem(`user_${email}`)) {
    alert('Account already exists'); // Show error
  } else {
    localStorage.setItem(`user_${email}`, password); // Save password
    localStorage.setItem('token', btoa(email + ':' + password)); // Save token
    localStorage.setItem('userEmail', email); // Save email
    window.location.href = 'form.html'; // Redirect
  }
});

// Logout functionality (clears localStorage and redirects)
logoutNav.addEventListener('click', e => {
  e.preventDefault(); // Prevent default link behavior
  localStorage.removeItem('token'); // Remove token
  localStorage.removeItem('userEmail'); // Remove email
  window.location.href = 'index.html'; // Redirect to login/signup page
});

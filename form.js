// Select DOM elements for the advice form, result display, logout button, and welcome message
const adviceForm = document.getElementById('adviceForm'); // Form element
const result = document.getElementById('result'); // Result output div
const logoutBtn = document.getElementById('logoutBtn'); // Logout button
const welcome = document.getElementById('welcome'); // Welcome message

// Retrieve user email and token from localStorage
const userEmail = localStorage.getItem('userEmail'); // Stored user email
const token = localStorage.getItem('token'); // Auth token (base64 encoded)

// Show welcome message with user email if logged in
if (userEmail) {
  welcome.textContent = `Welcome, ${userEmail}! Please evaluate the advice.`; // Set welcome text
} else {
  window.location.href = 'index.html'; // Redirect if not logged in
}

// Submit advice form handler
adviceForm.addEventListener('submit', async e => {
  e.preventDefault(); // Prevent reload on submit

  // Gather form data into an object
  const data = {
    question: e.target.question.value.trim(), // Question text
    answer: e.target.answer.value.trim(), // Answer text
    harm: e.target.harm.value, // Harm yes/no
    level: e.target.level.value // Harm level 1-5
  };

  try {
    // Send POST request to backend with JSON data and Authorization header with token
    const response = await fetch('/api/advice', {
      method: 'POST', // HTTP POST method
      headers: {
        'Content-Type': 'application/json', // Content type JSON
        'Authorization': `Basic ${token}` // Authorization header with token
      },
      body: JSON.stringify(data) // Convert data to JSON string
    });

    // Check response status
    if (response.ok) {
      const resData = await response.json(); // Parse JSON response
      result.textContent = 'Advice submitted successfully!'; // Success message
      adviceForm.reset(); // Clear form
    } else {
      const error = await response.json(); // Parse error response
      result.textContent = `Error: ${error.message}`; // Show error message
    }
  } catch (err) {
    result.textContent = `Network error: ${err.message}`; // Network error handling
  }
});

// Logout button clears localStorage and redirects
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token'); // Remove token
  localStorage.removeItem('userEmail'); // Remove email
  window.location.href = 'index.html'; // Redirect to login/signup
});

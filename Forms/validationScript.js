// JavaScript code for form validation
// Prevent form from submitting

// Retrieve the input field value
let form_input = document.getElementById('inputField');

// Regular expression pattern for alphanumeric input
let regex = /^[a-zA-Z0-9]*$/;

// Check if the input value matches the pattern
document.getElementById('myForm').addEventListener('submit', function(event) {
  if (regex.test(form_input.value)) {
    // Valid input: display confirmation and submit the form
    alert('Your form has been submitted!');
  }
  else {
    // Invalid input: display error message
    alert('Invalid Format! Form must be alphanumeric.');
    event.preventDefault();
  }
});


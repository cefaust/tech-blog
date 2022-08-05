

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('.usernameSignUp').value.trim();
  const email = document.querySelector('.emailSignUp').value.trim();
  const password = document.querySelector('.passwordSignUp').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

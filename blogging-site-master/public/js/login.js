const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Redirect to home page upon successful login
            window.location.replace("/home.html");
        })
        .catch((error) => {
            alert(error.message);
        });
});

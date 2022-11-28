let Greeting = document.getElementById("greeting")
function getSignIn() {
    console.log("hello")
    window.location.href = '/loginPage.html';
}

function sendUserData() {
    let firstName = document.getElementById("firstname");
    let lastName = document.getElementById("lastname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let Greeting = document.getElementById("greeting")
    let userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }
    console.log(userData)
    fetch("/newUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(res => {
        console.log("Request complete! response:", res.body);
        return res.json()
    }).then(data => {
        console.log(data)

        window.location.href = '/index.html';

    });

}

function logInUser() {
    let email = document.getElementsByName("logInEmail");
    let password = document.getElementsByName("logInPassword");

    let guestUser = {
        email: email[0].value,
        password: password[0].value
    }

    fetch("/toLogIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestUser)
    }).then(res => {
        console.log(res);
        return res.json()
    }).then(data => {
        console.log(data)


        window.location.href = '/index.html';

    })



}

function toContact() {

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let text = document.getElementById("greeting")
    let contactData = {
        name: name.value,
        email: email.value,
        message: message.value
    }
    fetch("http://localhost:3000/toContact", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
    }).then(res => {
        console.log("Request complete! response:", res.body);
        return res.json()
    }).then(data => {
        console.log(data)
        text.innerHTML = data.data
    });



}
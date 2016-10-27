"use strict";

var signUpForm = document.getElementById("signin-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    //use Firebase to sign in 
    //using the email name and password...
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            window.location = "secure.html";
        })
        .catch(function(err) {
            alert(err.message);
            //better to create a div that has the text directly on screen as opposed to using an alert
        })


    return false;
});
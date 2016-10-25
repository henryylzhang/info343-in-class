//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
  // Initialize Firebase
var config = {
    // apiKey: "AIzaSyCo3i6fH9uSNbWB-ZQ9umYyQHzlEYz2h-I",
    // authDomain: "info343-inclass-example.firebaseapp.com",
    // databaseURL: "https://info343-inclass-example.firebaseio.com",
    apiKey: "AIzaSyCvSoZTeGRTtt43bY7_KKO-vUlCYJiWS3U",
    authDomain: "tasks-demo-b3fd6.firebaseapp.com",
    databaseURL: "https://tasks-demo-b3fd6.firebaseio.com",
    storageBucket: "info343-inclass-example.appspot.com",
    messagingSenderId: "678462082190"
};
firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

//calls method on firebase whenever someone signs in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider); //forces user to sign in
    }
}); 

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");

var purgeButton = document.querySelector(".btn-purge");

//shows up on firebase b/c the tag is "tasks"
var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    
    tasksRef.push(task);

    taskTitleInput.value = "";

    return false;
})

function renderTask(snapshot) {
    var task = snapshot.val();
    var li = document.createElement("li");

    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);

    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow() + " by " + (task.createdBy["displayName"] || task.createdBy.email); //some fun short-circuit syntax
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }

    li.addEventListener("click", function(){
        // console.log("click for " + task.title);
        snapshot.ref.update({
            done: !task.done
        })
    });

    taskList.appendChild(li);
}

function render(snapshot) {
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask)
}

//.on = .addEventListener
tasksRef.on("value", render);

purgeButton.addEventListener("click", function() {
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        })
    })
});
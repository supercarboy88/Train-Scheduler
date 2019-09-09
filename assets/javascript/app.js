// Initialize Firebase
var config = {
    apiKey: "AIzaSyDclNjk-yy3r68O-NiSOaL_ST1PVDccx54",
    authDomain: "uw-bootcamp2019.firebaseapp.com",
    databaseURL: "https://uw-bootcamp2019.firebaseio.com",
    projectId: "uw-bootcamp2019",
    storageBucket: "uw-bootcamp2019.appspot.com",
    messagingSenderId: "689225463206",
    appId: "1:689225463206:web:5a5abed561acfc58"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var firstTrain = "";
var frequency= "";

$("#add-train").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequencey-input").val().trim();

    // Code for the push
    database.ref().push({

        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(firstTimeConverted);

    // full list of items to the well
    $("#train-list").append("<tr><td>" + childSnapshot.val().name + " </td><td> "
    + childSnapshot.val().destination + " </td><td> "
    + childSnapshot.val().frequency + " </td><td> "
    + childSnapshot.val().firstTrain + " </td><td> "
    + childSnapshot.val().firstTrain + " </td></tr> ");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

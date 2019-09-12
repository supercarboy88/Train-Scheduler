// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcd2P9yQwNvmFzUutBuxDQPTi1iNU9S4k",
    authDomain: "train-schedule-520bd.firebaseapp.com",
    databaseURL: "https://train-schedule-520bd.firebaseio.com",
    projectId: "train-schedule-520bd",
    storageBucket: "train-schedule-520bd.appspot.com",
    messagingSenderId: "1079022582679",
    appId: "1:1079022582679:web:57adc62966d8ad89fc62d2"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//Run Time  
setInterval(function(startTime) {
    $("#timer").html(moment().format('hh:mm a'))
  }, 1000);

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

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm A").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTraintime = moment(nextTrain).format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
    console.log(nextTraintime);

    // Code for the push
    database.ref().push({

        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        tMinutesTillTrain:tMinutesTillTrain,
        nextTraintime: nextTraintime
    });
});


database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $("#train-list").append("<tr><td>" + childSnapshot.val().name + " </td><td> "
    + childSnapshot.val().destination + " </td><td> "
    + childSnapshot.val().frequency + " </td><td> "
    + childSnapshot.val().nextTraintime + " </td><td> "
    + childSnapshot.val().tMinutesTillTrain + " </td></tr> ");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

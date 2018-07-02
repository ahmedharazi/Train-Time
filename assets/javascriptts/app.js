// Initialize Firebase
var config = {
    apiKey: "AIzaSyDy8OlMC7g_Fo5DgOYeZ4QjInl-c9mHEDo",
    authDomain: "train-time-7118e.firebaseapp.com",
    databaseURL: "https://train-time-7118e.firebaseio.com",
    projectId: "train-time-7118e",
    storageBucket: "train-time-7118e.appspot.com",
    messagingSenderId: "395950233911"
};
firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var first = "";
var frequency = "";

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    train = $("#train").val().trim();
    destination = $("#destination").val().trim();
    first = $("#first").val().trim();
    frequency = $("#frequency").val().trim();


    var newTrain = {
        train: train,
        destination: destination,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    };

    //push the new trian to the firebase
    database.ref().push(newTrain);
    //clears text inputs


    $("#train").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");


});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first);
    console.log(childSnapshot.val().frequency);

    train = childSnapshot.val().train;
    destination = childSnapshot.val().destination;
    first = childSnapshot.val().first;
    frequency = childSnapshot.val().frequency;


    var newtr = $("<tr>");
    var traintd = $("<td>").text(childSnapshot.val().train);
    var destinationtd = $("<td>").text(childSnapshot.val().destination);
    var firsttd = $("<td>").text(moment(childSnapshot.val().first).format("MMM Do YYYY"));
    var frequencytd = $("<td>").text(moment(childSnapshot.val().frequency).diff(moment(), "months") * -1);

    newtr.append(traintd);
    newtr.append(destinationtd);
    newtr.append(firsttd);
    newtr.append(frequencytd);



    $("#train-table tbody").append(newtr);


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
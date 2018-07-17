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

// var trainName = "";
// var destination = "";
// var firstTrain = "";
// var frequency = "";

// Click
$("#submit").on("click", function () {
	// event.preventDefault(); // preventing from a default refresh

	var trainName = $("#train").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = $("#first").val().trim();
	var frequency = $("#frequency").val().trim();

	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);


	alert("New train was added!");

	// Clears the old user input
	$('#train').val("");
	$('#destination').val("");
	$('#first').val("");
	$('#frequency').val("");

	return false;
});

database.ref().on("child_added", function (childSnapshot) {

	console.log(childSnapshot.val());

	var snapName = childSnapshot.val().name;
	var snapDestination = childSnapshot.val().destination;
	var snapFrequency = childSnapshot.val().frequency;
	var snapFirstTrain = childSnapshot.val().firstTrain;


	var timeArrive = snapFirstTrain.split(":");
	var trainTime = moment().hours(timeArrive[0]).minutes(timeArrive[1]);
	var maxMoment = moment.max(moment(), trainTime);
	var trainMinutes;
	var tArrival;


	if (maxMoment === trainTime) {
		tArrival = trainTime.format("hh:mm A");
		trainMinutes = trainTime.diff(moment(), "minutes");
	} else {

		var differenceTimes = moment().diff(trainTime, "minutes");
		var trainRemainder = differenceTimes % snapFrequency;
		trainMinutes = snapFrequency - trainRemainder;

		tArrival = moment().add(trainMinutes, "m").format("hh:mm A");
	}
	console.log("trainMinutes:", trainMinutes);
	console.log("tArrival", tArrival);

	$(".table  tbody").append("<tr><td>" + snapName + "</td><td>" + snapDestination + "</td><td>" +
		snapFrequency + "</td><td>" + tArrival + "</td><td>" + trainMinutes + "</td></tr>");
});
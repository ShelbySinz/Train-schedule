var config = {
    apiKey: "AIzaSyAJW8iVtgoIZSfGIfkNIrVHjJIpZAhBT9c",
    authDomain: "train-schedule-1-fc9c0.firebaseapp.com",
    databaseURL: "https://train-schedule-1-fc9c0.firebaseio.com",
    projectId: "train-schedule-1-fc9c0",
    storageBucket: "train-schedule-1-fc9c0.appspot.com",
    messagingSenderId: "259785091479"
  };
  firebase.initializeApp(config);

var database = firebase.database();





$("#submit-train").on("click", function(event) {
   
    event.preventDefault();

var trainName = $("#train-name").val().trim();
var Destination = $("#where-to").val().trim();
var TrainTime = moment($("#train-time").val().trim(), "hh:mm").format("hh:mm a");
var Frequency = $("#frequency-min").val().trim();

//moment(, "HH:mm").format()
    var newTrain = {
    trainName: trainName,
    Destination: Destination,
    TrainTime: TrainTime,
    Frequency: Frequency,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
    }

 
database.ref().push(newTrain);

$("#train-name").val("");
$("#where-to").val("");
$("#train-time").val("");
$("#frequency-min").val("");
    
 
});

database.ref().on("child_added", function(snapshot){
  
    console.log(snapshot.val());

    var tName = snapshot.val().trainName;
    var tDest = snapshot.val().Destination;
    var tTime = snapshot.val().TrainTime;
    var tFreq =  snapshot.val().Frequency;
   
    



// Difference between the times
var currentTime = moment();


var firstTime = moment(tTime, "HH:mm").subtract(1, "years");

var diffTime = moment().diff(moment(firstTime, "minutes"));
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFreq;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");


var newRow = $("<tr>").append(

    $("<td>").text(tName),
    $("<td>").text(tDest),
    $("<td>").text(tFreq),
    $("<td>").text(moment(nextTrain).format("HH:mm")),
    $("<td>").text(tMinutesTillTrain)
    
);

    $("#tableBody").append(newRow);
    
   // $("#currentTime").append(moment().format("hh:mm A"));
});






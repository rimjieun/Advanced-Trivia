$(document).ready(function() {

	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var selectedAnswers = [];
	var timer;
	var count;
	var correct; // boolean

	var questionAnswers = [
		{question: "Q1", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q2", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q3", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q4", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q5", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q6", choices: ["A", "B", "C", "D"], answer: "C"}
	];

	$("#start-button").on("click", function() {
		loadQuestion();
	})

	function countDown() {
		count--;
		$("#timer").html(count);
		if (count === 0) {
			clearInterval(timer);
			
			loadQuestion();
			unanswered++;
		}
	}

	function loadQuestion() {
		timer = setInterval(countDown, 1000);
		count = 10;
		$("#game-section").html("<div id='timer'>" + count + "</div>");
		$("#game-section").append("<div id='question'>" + questionAnswers[0].question + "</div>");
		$("#question").append("<ul id='choices'></ul>");
		for (i = 0; i < questionAnswers[0].choices.length; i++) {
			$("#choices").append("<li value=" + questionAnswers[0].choices[i] +" "+ "data-answer=" + questionAnswers[0].answer + ">" + questionAnswers[0].choices[i] + "</li>");
		}
		questionAnswers.shift();

		$("li").on("click", function() {
			clearInterval(timer);
			checkAnswer(this);
			loadAnswer(this);
			setTimeout(loadQuestion, 3000);
		})

	}

	function checkAnswer(choice) {
		if ($(choice).attr("value") === $(choice).attr("data-answer")) {
				alert("correct");
				correct = true;
		}
		else {
			alert("incorrect");
				correct = false;
		}
	}

	function loadAnswer(choice) {
		$("#question, #choices").remove();
		if (correct === true) {
			$("#game-section").append("Correct!");
			$("#game-section").append("<div><img src='assets/images/cat.jpg'></div>");
		}
		else {
			$("#game-section").append("Incorrect");
			$("#game-section").append("<div>The correct answer was: " + $(choice).attr("data-answer") + "</div>");
			$("#game-section").append("<div><img src='assets/images/cat.jpg'></div>");

		}
	}








})
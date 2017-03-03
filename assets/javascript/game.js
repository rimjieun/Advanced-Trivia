$(document).ready(function() {

	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var timer;
	var count;
	var isCorrect; // boolean

	var questionAnswers = [
		{question: "Q1", choices: ["A", "B", "bunny", "D"], answer: "bunny"},
		{question: "Q2", choices: ["A", "B", "cat", "D"], answer: "cat"},
		{question: "Q3", choices: ["A", "B", "hello", "D"], answer: "hello"},
		{question: "Q4", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q5", choices: ["A", "B", "C", "D"], answer: "C"},
		{question: "Q6", choices: ["A", "B", "C", "D"], answer: "C"}
	];


	var message = {
		correct: function() {
			$("#question-section").append("Correct!");
			$("#question-section").append("<div><img src='assets/images/cat.jpg'></div>");
		},
		incorrect: function(answer) {
			$("#question-section").append("Incorrect");
			$("#question-section").append("<div>The correct answer was: " + answer + "</div>");
			$("#question-section").append("<div><img src='assets/images/cat.jpg'></div>");
		},
		outOfTime: function(answer) {
			$("#question-section").append("Out of time!");
			$("#question-section").append("<div>The correct answer was: " + answer + "</div>");
			$("#question-section").append("<div><img src='assets/images/cat.jpg'></div>");
		}
	}


	$("#start-button").on("click", function() {
		loadQuestion();
	});

	$(document).on("click", "#start-over", function() {
		startOver();
	});

	//-------------------------------------------------------------------------------------------------

	function loadQuestion() {
		var current = questionAnswers[0];
		timer = setInterval(countDown, 1000);
		count = 5;
		$("#game-section").html("<div id='timer'>" + count + "</div>");
		$("#game-section").append("<div id='question-section'></div>");
		$("#question-section").append("<div id='question'>" + current.question + "</div>");
		$("#question").append("<ul id='choices'></ul>");
		for (i = 0; i < current.choices.length; i++) {
			$("#choices").append("<li value=" + current.choices[i] + ">" + current.choices[i] + "</li>");
		}

		$("li").on("click", function() {
			clearInterval(timer);
			checkAnswer(this, current.answer);
			loadAnswer(current.answer);
			loadNext();
		});

		function countDown() {
			count--;
			$("#timer").html(count);
			if (count === 0) {
				isCorrect = false;
				clearInterval(timer);
				loadAnswer(current.answer);
				loadNext();
			}
		}
	}

	function checkAnswer(choice, answer) {
		if ($(choice).attr("value") === answer) {
				isCorrect = true;
		}
		else {
				isCorrect = false;
		}
	}

	function loadAnswer(answer) {
		$("#question-section").empty();
		if (isCorrect === true) {
			correct++;
			message.correct();
		}
		if ((count === 0) && (isCorrect === false)) {
			unanswered++;
			message.outOfTime(answer);
		}
		if ((count > 0) && (isCorrect === false)) {
			incorrect++;
			message.incorrect(answer);
		}
	}

	function loadNext() {
		questionAnswers.shift();
		if (questionAnswers.length === 0) {
			setTimeout(loadResults, 3000);
		}
		else {
			setTimeout(loadQuestion, 1000);
		}
	}

	function loadResults() {
		$("#question-section").empty();
		$("#question-section").append("<div id='result-msg'>All done! Here's how you did: </div>");
		$("#result-msg").append("<ul id='results'></ul>");
		$("#results").append("<li>Correct: " + correct + "</li>");
		$("#results").append("<li>Incorrect: " + incorrect + "</li>");
		$("#results").append("<li>Unanswered: " + unanswered + "</li>");
		$("#game-section").append("<button id='start-over' type='button'>Start Over</button>");
	}

	function startOver() {

		correct = 0;
		incorrect = 0;
		unanswered = 0;

		questionAnswers = [
			{question: "Q1", choices: ["A", "B", "bunny", "D"], answer: "bunny"},
			{question: "Q2", choices: ["A", "B", "cat", "D"], answer: "cat"},
			{question: "Q3", choices: ["A", "B", "hello", "D"], answer: "hello"},
			{question: "Q4", choices: ["A", "B", "C", "D"], answer: "C"},
			{question: "Q5", choices: ["A", "B", "C", "D"], answer: "C"},
			{question: "Q6", choices: ["A", "B", "C", "D"], answer: "C"}
		];

		loadQuestion();
	}

});
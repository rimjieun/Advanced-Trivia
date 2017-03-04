$(document).ready(function() {

	
	
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var timer;
	var count;
	var isCorrect;
	var questAnsTemp = [];

	var questionAnswers = [
		{
			question: "Who is goddess of vengeance?",
			choices: ["NEMESIS", "ANTHEIA", "CETO", "HARMONIA"],
			answer: "NEMESIS",
			image: "assets/images/nemesis.jpg"
		},
		{
			question: "Who is goddess of rainbows?",
			choices: ["MANIA", "METIS", "IRIS", "HERA"],
			answer: "IRIS",
			image: "assets/images/iris.gif"
		},
		{
			question: "Who is god of the woods?",
			choices: ["PAN", "HEBE", "MOMUS", "KRATOS"],
			answer: "PAN",
			image: "assets/images/pan.gif"
		},
		{
			question: "Who is goddess of nature?",
			choices: ["NYX", "RHEA", "ELECTRA", "PLUTUS"],
			answer: "RHEA",
			image: "assets/images/rhea.png"
		},
		{
			question: "Who is god of death?",
			choices: ["MAIA", "HADES", "NEREUS", "THANATOS"],
			answer: "THANATOS",
			image: "assets/images/thanatos.jpg"
		},
		{
			question: "Who is goddess of victory?",
			choices: ["HESTIA", "DORIS", "ERIS", "NIKE"],
			answer: "NIKE",
			image: "assets/images/nike.jpg"
		},
		{
			question: "Who is goddess of Earth?",
			choices: ["EROS", "GAIA", "OCEANUS", "PALLAS"],
			answer: "GAIA",
			image: "assets/images/gaia.jpg"
		},
		{
			question: "Who is god of darkness?",
			choices: ["URANUS", "TRITON", "EREBUS", "ZEUS"],
			answer: "EREBUS",
			image: "assets/images/erebus.jpg"
		},
		{
			question: "Who is god of time?",
			choices: ["POSEIDON", "CHRONOS", "HERACLES", "KRONOS"],
			answer: "CHRONOS",
			image: "assets/images/chronos.jpg"
		},
		{
			question: "Who is god of war?",
			choices: ["ARES", "BIA", "EUTERPE", "DEMETER"],
			answer: "ARES",
			image: "assets/images/ares.jpg"
		}
	];


	var message = {
		correct: function(current) {
			$("#question-section").append("<div><img src='" + current.image + "'></div>");
			$("#question-section").append("<div class='message'><p>Correct</p></div>");
			
		},
		incorrect: function(current) {
			$("#question-section").append("<div><img src='" + current.image + "'></div>");
			$("#question-section").append("<div class='message'><p>Incorrect</p><div>");
			$(".message").append("<p>Answer: " + current.answer + "</p>");
			
		},
		outOfTime: function(current) {
			$("#question-section").append("<div><img src='" + current.image + "'></div>");
			$("#question-section").append("<div class='message'><p>Out of time</p></div>");
			$(".message").append("<p>Answer: " + current.answer + "</p>");
			
		}
	}

	// Event handlers-------------------------------------------------------------------------------

	// To start game, click the start button.
	$("#start-button").on("click", function() {
		loadQuestion();
	});
<<<<<<< HEAD
=======

	$(document).on("click", "#start-over", function() {
		startOver();
	});

	//-------------------------------------------------------------------------------------------------
>>>>>>> js-testing

	// Loading one question at a time
	function loadQuestion() {
		var current = questionAnswers[0];
		timer = setInterval(countDown, 1000);
		count = 30;
		$("#game-section").html("<div id='timer'><p>Time remaining: " + count + "</p></div>");
		$("#game-section").append("<div id='question-section'></div>");
		$("#question-section").append("<p id='question'>" + current.question + "</p></div>");
		$("#question-section").append("<ul id='choices'></ul>");
		for (i = 0; i < current.choices.length; i++) {
			$("#choices").append("<li value=" + current.choices[i] + ">" + current.choices[i] + "</li>");
		}

		// When you click an answer choice, check answer.
		$("li").on("click", function() {
			clearInterval(timer);
			checkAnswer(this, current);
			loadAnswer(current);
			loadNext();
		});

		// Count down function for timer
		function countDown() {
			count--;
			$("#timer").html("<p>Time remaining: " + count + "</p>");
			if (count === 0) {
				isCorrect = false;
				clearInterval(timer);
				loadAnswer(current);
				loadNext();
			}
		}
	}
<<<<<<< HEAD
	
	// Check answer function comparing selected choice and the actual answer
	function checkAnswer(choice, answer) {
		if ($(choice).attr("value") === answer) {
				alert("correct");
				isCorrect = true;
=======

	function checkAnswer(choice, current) {
		if ($(choice).attr("value") === current.answer) {
			isCorrect = true;
>>>>>>> js-testing
		}
		else {
			isCorrect = false;
		}
	}

<<<<<<< HEAD
	// Printing answer after user selects a choice
	function loadAnswer(answer) {
=======
	function loadAnswer(current) {
>>>>>>> js-testing
		$("#question-section").empty();
		if (isCorrect === true) {
			correct++;
			message.correct(current);
		}
		if ((count === 0) && (isCorrect === false)) {
			unanswered++;
			message.outOfTime(current);
		}
		if ((count > 0) && (isCorrect === false)) {
			incorrect++;
			message.incorrect(current);
		}
	}

	function loadNext() {
		questAnsTemp.push(questionAnswers.shift());
		if (questionAnswers.length === 0) {
			setTimeout(loadResults, 1000 * 4);
		}
		else {
			setTimeout(loadQuestion, 1000 * 4);
		}
	}

	function loadResults() {
		$("#question-section").empty();
		$("#question-section").append("<p id='results' class='result-msg'>All done! Here's how you did: </p>");
		$("#results").append("<p class='result-msg'>Correct: " + correct + "</p>");
		$("#results").append("<p class='result-msg'>Incorrect: " + incorrect + "</p>");
		$("#results").append("<p class='result-msg'>Unanswered: " + unanswered + "</p>");
		$("#game-section").append("<button id='start-over' type='button'>Start Over</button>");
	}

	function startOver() {
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		questionAnswers = questAnsTemp;
		questAnsTemp = [];

		loadQuestion();
	}

	// Go to next question or final results page in 3 sec
	function loadNext() {
		questionAnswers.shift();
		if (questionAnswers.length === 0) {
			setTimeout(loadResults, 3000);
		}
		else {
			setTimeout(loadQuestion, 1000);
		}
	}

	// Print final results page
	function loadResults() {
		$("#question-section").empty();
		$("#question-section").append("<div id='result-msg'>All done! Here's how you did: </div>");
		$("#result-msg").append("<ul id='results'></ul>");
		$("#results").append("<li>Correct: " + correct + "</li>");
		$("#results").append("<li>Incorrect: " + incorrect + "</li>");
		$("#results").append("<li>Unanswered: " + unanswered + "</li>");
		$("#game-section").append("<button id='start-button' type='button'>Start Over</button>");
	}

	

	

	

});
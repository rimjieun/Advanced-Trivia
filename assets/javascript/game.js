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
		count = 30;
		$("#game-section").html("<div id='timer'><p>Time remaining: " + count + "</p></div>");
		$("#game-section").append("<div id='question-section'></div>");
		$("#question-section").append("<p id='question'>" + current.question + "</p></div>");
		$("#question-section").append("<ul id='choices'></ul>");
		for (i = 0; i < current.choices.length; i++) {
			$("#choices").append("<li value=" + current.choices[i] + ">" + current.choices[i] + "</li>");
		}

		$("li").on("click", function() {
			clearInterval(timer);
			checkAnswer(this, current);
			loadAnswer(current);
			loadNext();
		});

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

	function checkAnswer(choice, current) {
		if ($(choice).attr("value") === current.answer) {
			isCorrect = true;
		}
		else {
			isCorrect = false;
		}
	}

	function loadAnswer(current) {
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

});
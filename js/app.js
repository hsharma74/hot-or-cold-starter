$(document).ready(function(){

  // variable declaration
	var compGuess;      // random number generated by computer to guess
	var userGuess;      // value guessed by the user
	var guessCount;     // keeps a running count of the number of guesses 
	var guessMatch; // did the user find the match?
	var DEBUG_MODE;     // debug mode for verbosity
	var guessHistory = [];  // history of user's guesses	
	var validFlag;  // is the user guess valid


	newGame();
	
	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  	
	// start a new game when "newGame" button is pressed
	$(".new").click(function (event) {
		event.preventDefault();
		newGame();
	});

	// extract userGuess from the the text field
	function getUserGuess(){
		userGuess = $("#userGuess").val();
		console.log("User guess: " + userGuess);    // DEBUG
		return userGuess;
	}

	// clear userGuess field
	function clearUserGuess() {
		$("#userGuess").val('');
	}

	// set the guess count value
	function setGuessCount(count) {
		$("#count").text(count);
	}

	// set the feedback field
	function setFeedback(msg) {
		$("#feedback").text(msg);
	}



	// on form submission 
	$("form").submit( function (event) {
		event.preventDefault();

		if (!guessMatch) {
			userGuess = getUserGuess();
			validFlag = userGuessValid(userGuess);
			clearUserGuess();
			if (validFlag) {
				guessCount++;
				setGuessCount(guessCount);
				guessHistory.push(userGuess);
				$("ul#guessList").append("<li>" + userGuess + "</li>");
				guessMatch = hotCold(userGuess);
			};
		} else {
			// the user has already guessed the secret number
			// just prompt user that game is already over 
			// and to start a new game

			setFeedback("You guessed already. Please start a new game.");
		}
	});




	// start a new game
	// initialize all the global variables
	// clear all text fields to their default

	function newGame() {
		guessCount = 0;
		userGuess = 0;
		guessMatch = false;
		validFlag = false;
		guessHistory = [];
		compGuess = generateGuess();

		$('ul#guessList li').remove();
		setFeedback("Make your guess!");
		clearUserGuess();
		setGuessCount(0);
	}


	// there is a special case when the user enters an invalid
	// choice. We need to distinguish this case from valid case
	// as in the invalid case, we do not want to update the guess
	// list and the guess count, but only prompt user to enter a
	// valid guess

	function userGuessValid(userGuess) {
		msg = "";
		if (isNaN(userGuess) || (userGuess < 1 || userGuess > 100) ||
			  (userGuess === '')){
			msg = "Integer numbers between 1 and 100 only (inclusive)";
			setFeedback(msg);
			return false;
		} else {
			return true;
		}
	}

	// Takes user guess as an input and compares it to the 
	// the computer generated number. Gives feedback on how
	// close/far user guess is to the actual value.
	// Returns false on 'no match'; true on 'match'

	function hotCold(userGuess) {
		var diff = Math.abs(userGuess - compGuess);

		if (diff >= 50) {
			setFeedback("Ice Cold");
			return false;
		} else if (diff < 50 && diff >= 30) {
			setFeedback("Cold");
			return false;
		} else if (diff < 30 && diff >= 20) {
			setFeedback("Warm");
			return false;
		} else if (diff < 20 && diff >= 10) {
			setFeedback("Hot");
			return false;
		} else if (diff < 10 && diff >= 1) {
			setFeedback("Very Hot");
			return false;
		} else {
			setFeedback("Just Right");
			return true;
		}

	}



  // generate the number to be guessed by the user

	function generateGuess() {
		var myGuess = Math.floor(Math.random() * 100) + 1;
		console.log("Secret number: " + myGuess);
		return myGuess;
	}


});


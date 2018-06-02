/*
 * Create a list that holds all of your cards
 */	
	const cardArray = [
		"fa-diamond", "fa-diamond",
		"fa-paper-plane-o", "fa-paper-plane-o",
		"fa-anchor", "fa-anchor",
		"fa-bolt", "fa-bolt",
		"fa-cube", "fa-cube",
		"fa-leaf", "fa-leaf",
		"fa-bicycle", "fa-bicycle",
		"fa-bomb", "fa-bomb",
		];
		
	const deck = $(".deck");
	const modal = $(".modal");
	const message = $(".message");
	const button = $("button");
	let clickCounter = 2;
	let clickedCards = [];
	let matchedCards = [];
	let savedCards = [];
	let match = 0;
	let moves = 0;
	let stars = 3;
	let timeStatus = 0;
	let time = 0;
	let minutes = 0;
	let seconds = 0;
	let timer = $(".timer").html(minutes + ":" + seconds);

	
$(document).ready(function() {

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//restart the game
$("#restartGame").on("click", function () {
		location.reload();
	});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardArray) {
    let currentIndex = cardArray.length, temporaryValue, randomIndex;
 
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }
    return cardArray;
}

function newGame() {
	shuffle(cardArray);
	//hide the modal
	$(".modal").hide();
	//start the timer
	start();
	$(".deck").on("click", "li", function() {
		//count each mouse click
		moveCounter();
		$(this).toggleClass("open show");
		//pushes the clicked cards to an empty array
		clickedCards.push(this);
		//each clicked card removes a click from the counter
		clickCounter--;
		//determines how many clicks the user has
		if (clickCounter === 0) {
			compareCards();
		}else{
			// endGame();
			return;
		}
	});	
};

function moveCounter() {
		moves++;
		$(".moves").html(moves);
		console.log("moves " + moves);
		//remove stars
			if (moves === 15) {
				$("#star1").hide();
				stars--;
			}else if (moves === 20) {		
				$("#star2").hide();
				stars--;
			}else if (moves === 30) {		
				$("#star3").hide();
				stars--;
			}else if (stars === 0) {
				stop();
				endGame();
			}else {
				return;
			}
}

function compareCards() {
	//if the cards match, move to the matchedCard function
	if ($(clickedCards[0]).find('i').attr('class') === $(clickedCards[1]).find('i').attr('class')) {
		console.log("match");
		match++
		console.log("match count " + match);
		matchedCard();
	//if cards do not match, flip cards back over and play continues	
	}else {
		console.log("no match");
		setTimeout(function(){
			$("li").removeClass("open show");
			clickCounter = 2;
			clickedCards = [];
		}, 1000);
	}
}

function matchedCard() {
	matchedCards.push(clickedCards);
	console.log("matched cards" + matchedCards);
	// match++;
	setTimeout(function() {
		//matched cards change colors
		$(matchedCards[0]).removeClass("open show");
		$(matchedCards[0]).addClass("match");
		$(matchedCards[1]).removeClass("open show");
		$(matchedCards[1]).addClass("match");
			//return click counter back to 2
			clickCounter = 2;
			//empty clickedCards array
			clickedCards = [];
			//push matched cards to new savedCards array
			savedCards.push(matchedCards);
			//empty the matchedCards array
			matchedCards = [];
			// compareCards();
		}, 1000);
	//count the matches and if they equal 8, end the game
	if (match === 8) {
		setTimeout(function() {
			endGame()
			stop()}, 1500);
	}else {
		return;
	}
}
//keep playing the game if there are still matches to be made
function keepPlaying() {
	$(".deck").on("click", "li", function() {
		$(this).toggleClass("open show");
		//pushes the clicked cards to an empty array
		clickedCards.push(this);
		// (event.target.innerHTML);
			console.log("clicked cards " + clickedCards);
		//each clicked card removes a click from the counter
		clickCounter--;
			console.log("click counter " + clickCounter);
		//determines how many clicks the user has
		if (clickCounter === 0) {
			compareCards();
		}else{
			return;
		}
	});	
}
//timer
function start() {
	timeStatus = 1;
	startTimer();
}

function stop() {
	timeStatus = 0;
}

function startTimer() {
		if (timeStatus === 1) {
			setTimeout(function() {
				time++;
				let minutes = Math.floor(time/100/60);
				let seconds = Math.floor(time/100);

				if(minutes < 10) {
					minutes = "0" + minutes;
				}
				if(seconds >= 60) {
					seconds = seconds % 60;
				}
				if (seconds < 10) {
					seconds = "0" + seconds; 
				}
				$(".timer").html(minutes + ":" + seconds);
				startTimer();

			}, 10);
		}
}

function endGame() {
	if(match === 8) {
		$(".modal").show();
		let timer = $(".timer").html();
		$(".message").html("Congratulations!  You won with " + moves + " moves and a star rating of " + stars + "!  Your time was " + timer + ".");
		$("button").on("click", function () {
			location.reload();
		});
	}else if (stars === 0) {
		$(".modal").show();
		$(".message").html("Game Over! You ran out of stars!");
		$("button").on("click", function () {
			location.reload();
		});
	}
}

newGame();

});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
  //newGame()
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 //compareCards()
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

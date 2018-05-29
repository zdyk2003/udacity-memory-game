/*
 * Create a list that holds all of your cards
 */

	
	const cardArray = [
		"fa-diamond",
		"fa-diamond",
		"fa-paper-plane-o",
		"fa-paper-plane-o",
		"fa-anchor",
		"fa-anchor",
		"fa-bolt",
		"fa-bolt",
		"fa-cube",
		"fa-cube",
		"fa-leaf",
		"fa-leaf",
		"fa-bicycle",
		"fa-bicycle",
		"fa-bomb",
		"fa-bomb",
		];

	const deck = $(".deck");
	let clickCounter = 2;
	let clickedCards = [];
	let matchedCards = [];
	let savedCards = [];
	let match = 0;

$(document).ready(function() {

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function newGame() {
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
	
};

function compareCards() {
	if ($(clickedCards[0]).find('i').attr('class') === $(clickedCards[1]).find('i').attr('class')) {
		console.log("match");
		matchedCard();
		// console.log(matchedCards);
		
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
	// $(this).removeClass("open show");
	// $(this).addClass("match");
	match++;
	setTimeout(function() {
	$(matchedCards[0]).removeClass("open show");
	$(matchedCards[0]).addClass("match");
	$(matchedCards[1]).removeClass("open show");
	$(matchedCards[1]).addClass("match");
	// match++
	// setTimeout(function() {
			clickCounter = 2;
			clickedCards = [];
			// compareCards();
		}, 1000);
	// savedCards.push(matchedCards);
	// matchedCards = [];
}
//
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

let mainQuoteContainer = document.getElementById('main-quote-block');

// Get first random quote once page loads
window.onload = requestQuote(true);

// Get random quote when clicked on quote

let quoteButton = document.querySelector('#nav-quote');

quoteButton.addEventListener('click', function(){
	requestQuote();
	
});


function requestQuote(first=false){
	let requestQuote = new XMLHttpRequest();
	
	requestQuote.open('GET', '/main-quote');
	requestQuote.onload = function() {
		let quote = JSON.parse(requestQuote.responseText);
		let quoteHTML = "<p class='quote'>" + quote[1] + "</p> \
						 <p class='the-work'>'" + quote[2] + "'</p>";
		updateMainQuote(quoteHTML, first);
	};
	
	requestQuote.send();
}

function updateMainQuote(quoteHTML, first=false) {
	if (first) {
		mainQuoteContainer.innerHTML = quoteHTML;
	}
	else {
		mainQuoteContainer.classList.remove('quote-center');
		mainQuoteContainer.classList.add('quote-right');
		setTimeout(function () {
			mainQuoteContainer.classList.remove('quote-right');
			mainQuoteContainer.innerHTML = quoteHTML;
			mainQuoteContainer.classList.add('quote-left');
			setTimeout(function () {
				mainQuoteContainer.classList.remove('quote-left');
				mainQuoteContainer.classList.add('quote-center');
			}, 500);
		}, 500);
	}

}


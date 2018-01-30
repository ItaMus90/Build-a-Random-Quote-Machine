//Option write Jquery or $ in start

$(document).ready(function(){
	var quote;
	var author;
	//Make AJAX request
	function getNewQuote(){
		$.ajax({
			url: 'http://api.forismatic.com/api/1.0/',
			jsonp: 'jsonp',// The name of the callback parameter, as specified by the YQL service
			dataType:'jsonp',// Tell jQuery we're expecting JSONP
			data:{
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp'
			},
			success: function(respone){
				quote = respone.quoteText;
				author = respone.quoteAuthor;

				$('#quote').text(quote);

				if (author) {
					$('#author').text('-> Said by: ' + author);
				}else{
					$('#author').text('-> Unknown');
				}
			}
		});
	}
	getNewQuote();

	$('.btn-quote').on('click',function(event){
		event.preventDefault();
		getNewQuote();
	});

	$('.btn-twitter').on('click',function(event){
		event.preventDefault();
		window.open('https://twitter.com/intent/tweet?text= ' + encodeURIComponent(quote + ' -- ' + author));
	});
});

/*
The Event interface's preventDefault() method 
tells the user agent that if the event 
does not get explicitly handled, 
its default action should not be taken as it normally would be. 
The event continues to propagate as usual, 
unless one of its event listeners calls stopPropagation() 
or stopImmediatePropagation(), either of which terminates propagation at once
*/
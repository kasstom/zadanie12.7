// KLASA CARD

function Card(id, name) {
	var self  = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.$element = createCard();
	
	function createCard() {
		 var $card = $('<li>').addClass('card');
		 var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		 var $cardDeleteButton = $('<button>').addClass('card-delete btn');
		 var $cardDeleteSymbol = $('<span  class="glyphicon glyphicon-remove" aria-hidden="true" aria-hidden="true"></span>');
		 
		 $cardDeleteButton.click(function(){
			 self.deleteCard();
		 });
		 
		 $cardDeleteButton.append($cardDeleteSymbol);
		 $card.append($cardDeleteButton).append($cardDescription);
		 
		 console.log($card);
		 return $card;
	}
}

Card.prototype = {
		deleteCard: function() {
			var self = this;
			
			$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
				}
			});
		}
}
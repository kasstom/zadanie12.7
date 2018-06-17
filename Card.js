function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardEditBtn = $('<button class="btn-edit-card">edit</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.on('click', function(){
			self.removeCard();
		});

		cardEditBtn.on('click', function(){
			self.editCard();
		});
		
		card.append(cardDeleteBtn);
		card.append(cardEditBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
	    $.ajax({
	    	url: baseUrl + '/card/' + self.id,
	    	method: 'DELETE',
	     	success: function(){
	        	self.element.remove();
	      	}
	    });
	},

	editCard: function() {
		var self = this;
		var newName = prompt("Enter a new name of the card", this.element.children("p").text());
		var columnId = $(this.element).closest("div").attr('id');
		if (newName) {
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
				    name: self.name,
				    bootcamp_kanban_column_id: columnId
				},
				success: function(response){
					self.element.children("p").text(newName);
				}
			});
		}
	}
};
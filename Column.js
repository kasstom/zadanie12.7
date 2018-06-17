function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>').attr('id', self.id);
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnEdit = $('<button class="btn-edit-column">Edit name</button>');
		var columnAddCard = $('<button class="btn-add-card">Add a card</button>');
		
		
		columnDelete.on('click', function() {
			self.deleteColumn();
		});

		columnEdit.on('click', function() {
			self.editColumn();
		});
		
		columnAddCard.on('click', function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			if (cardName) {
				$.ajax({
				    url: baseUrl + '/card',
				    method: 'POST',
				    data: {
				    name: cardName,
				    bootcamp_kanban_column_id: self.id
				    },
				    success: function(response) {
				    	var card = new Card(response.id, cardName);
				        self.createCard(card);
				    }
				});
			}
		});

		column.append(columnTitle)
			.append(columnDelete)
			.append(columnEdit)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	 	this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	  	var self = this;
	    $.ajax({
	      	url: baseUrl + '/column/' + self.id,
	      	method: 'DELETE',
	      	success: function(response){
	        	self.element.remove();
	      	}
    	});
	},
	editColumn: function() {
		var self = this;
		var newCardName = prompt("Enter a new name of the column", this.element.children("h2").text());
		if (newCardName) {
			$.ajax({
				url: baseUrl + '/column/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
				    name: self.name,
				},
				success: function(response){
					self.element.children("h2").text(newCardName);
				}
			});
		}
	}
};
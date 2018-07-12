function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name;
	this.$element = createColumn(); //przechowuje utworzoną kolumnę


	function createColumn(){
		
		//tworzymy poszczególne elementy kolumny:
		
		var $column=$('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDeleteButton = $('<button>').addClass('btn-delete btn');
		var $columnDeleteSymbol = $('<span  class="glyphicon glyphicon-remove" aria-hidden="true" aria-hidden="true"></span>');
		var $columnAddCard = $('<button>').addClass('add-card btn btn-success btn-sm').text('Add a Card');
		
		//ustawiamy nasłuchiwanie zdarzeń
	
		$columnDeleteButton.click(function(){
			self.removeColumn();
		});
	
		$columnAddCard.click(function(event){
		
			var cardName = prompt('Enter the name of the card', 'no name');
			event.preventDefault();
		if(cardName == "") {cardName = cardName + "Untitled";}
		
			if(cardName !== null){
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
					},
					success: function(response){
					
						var card = new Card(response.id, cardName);	
						self.addCard(card);
					}
			
				}); // end of ajax request
			}	
		});
	
	$columnDeleteButton.append($columnDeleteSymbol);
	$column.append($columnTitle).append($columnDeleteButton).append($columnAddCard).append($columnCardList);
	return $column;
	console.log($column);
	
	}// end of createColumn
	
}//end of Column

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		var self = this;
		$.ajax({
		url: baseUrl + '/column/' + self.id,
		method: 'DELETE',
		success: function(response){
			self.$element.remove();
		}	
		});
		
	}
};
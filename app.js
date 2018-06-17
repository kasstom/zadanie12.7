var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2907',
  'X-Auth-Token': 'b4d4da1b137f229e9e2b5279156af6db'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
  url: baseUrl + '/board',
  method: 'GET',
  success: function(response) {
    setupColumns(response.columns);
  }
});

function setupColumns(columns) {
  columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
    board.createColumn(col);
    setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
    card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.createCard(card);
  });
}
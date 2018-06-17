var board = {
	name: 'Kanban Board',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

function initSortable() {
  $('.card-list').sortable({
    connectWith: '.card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

$('.btn-create-column').on('click', function(){
	var columnName = prompt('Enter a column name');
  if (columnName) {
    $.ajax({
    	url: baseUrl + '/column',
     	method: 'POST',
      data: {
        name: columnName
      },
   		success: function(response){
   			var column = new Column(response.id, columnName);
   			board.createColumn(column);
      }
    });
  }
});
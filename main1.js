var parkingLot = {
	rows: 4,
	cols: 2,
	slots: [
		null,
		{ owner: 'Jake', color: 'red' },
		null,
		null,
		{ owner: 'Russel', color: 'skyblue' },
		{ owner: 'Amber', color: 'gold' },
		null,
		null
	] 
};

/* Accessing individual values in the nested data structure
parkingLot.rows // 4
parkingLot.cols // 2
parkingLot.slots[0] // null
parkingLot.slots[1] // { owner: 'Jake', color: 'red' }
parkingLot.slots[5].color // gold
*/

var createParkingLot = function(parkingLotData) {
	var table = $('<table class="parking-lot">');

	// create each row
	for(var i=0; i<parkingLotData.rows; i++) {
		var row = $('<tr>');
		table.append(row);

		// create the cells within the row
		for(var j=0; j<parkingLotData.cols; j++) {
			var cellIndex = i*parkingLotData.cols + j;
			var cell = $('<td>');
			row.append(cell);

			// if there's a bike in the slot, render it
			if(parkingLotData.slots[cellIndex]/* !== null*/) {
				cell.text('o-}o');
				cell.css('color', parkingLotData.slots[cellIndex].color || 'black')
			}
		}
	}

	return table;
};

$(document).on('ready', function() {

	var table = createParkingLot(parkingLot);
	$('body').append(table);

});
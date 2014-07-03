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

// searches the parking lot for a bike with the given owner
var getBikeByOwner = function(parkingLotData, owner) {
	for(var i=0; i<parkingLotData.slots.length; i++) {
		var currentBike = parkingLotData.slots[i];
		if(currentBike && currentBike.owner === owner) {
			return currentBike;
		}
	}
	return null;
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
			var bike = parkingLotData.slots[cellIndex];
			row.append(createBikeCell(bike));
		}
	}

	return table;
};

// create a cell element for the given bike object
var createBikeCell = function(bike) {
	var cell = $('<td>');

	// if there's a bike in the slot, render it
	if(bike) {
		cell.attr('data-owner', bike.owner);
		cell.append('<span class="bike">o-}o</span>');
		cell.css('color', bike.color || 'black')

		// add color swatches
		var blackSwatch = createSwatch('black');
		var redSwatch = createSwatch('red');
		var blueSwatch = createSwatch('skyblue');
		var goldSwatch = createSwatch('gold');
		cell.append(blackSwatch, redSwatch, blueSwatch, goldSwatch);

		// fancy!
		// cell.append(['black', 'red', 'skyblue', 'gold'].map(createSwatch));
	}

	return cell;
};

// create a swatch element
var createSwatch = function(color) {
	return $('<a href="#" class="swatch">').css('background-color', color);
};

$(document).on('ready', function() {

	// attach handlers
	$(document).on('click', '.swatch', function(e) {
		e.preventDefault();

		// get swatch color
		var swatchColor = $(this).css('background-color');

		// access the td
		var td = $(this).closest('td');

		// change the color of the td
		td.css('color', swatchColor);

		// get the bike object associated with this cell
		// get the owner
		var owner = td.attr('data-owner');
		var bike = getBikeByOwner(parkingLot, owner);
		bike.color = swatchColor;
	});

	// create table
	var table = createParkingLot(parkingLot);
	$('body').append(table);

});
var latlong = require( './..' ),
	test = require( 'tape' );

test( 'parse string with comma', function( t ) {

	t.plan( 4 );

	var value = latlong( '-90,53.333' );

	t.ok( value.lat, 'has lat' );
	t.ok( value.lng, 'has lng' );
	t.equal( value.lat, -90, 'latitude value was parsed' );
	t.equal( value.lng, 53.333, 'longitude value was parsed' );
});

test( 'parse string with whitespace', function( t ) {

	t.plan( 4 );

	var value = latlong( '-90 ,             53.333' );

	t.ok( value.lat, 'has lat' );
	t.ok( value.lng, 'has lng' );
	t.equal( value.lat, -90, 'latitude value was parsed' );
	t.equal( value.lng, 53.333, 'longitude value was parsed' );
});

test( 'parse string with other delimiter', function( t ) {

	t.plan( 4 );

	var value = latlong( '-90|53.333', { delimiter: '|' } );

	t.ok( value.lat, 'has lat' );
	t.ok( value.lng, 'has lng' );
	t.equal( value.lat, -90, 'latitude value was parsed' );
	t.equal( value.lng, 53.333, 'longitude value was parsed' );
});

test( 'normalize 1', function( t ) {

	t.plan( 4 );

	var value = latlong( {

		latitude: -45.333,
		longitude: 253.333
	});

	t.ok( value.lat, 'has lat' );
	t.ok( value.lng, 'has lng' );
	t.equal( value.lat, -45.333, 'latitude value was parsed' );
	t.equal( value.lng, 253.333, 'longitude value was parsed' );
});

test( 'normalize 2', function( t ) {

	t.plan( 4 );

	var value = latlong( {

		lat: -45.333,
		longitude: 253.333
	});

	t.ok( value.lat, 'has lat' );
	t.ok( value.lng, 'has lng' );
	t.equal( value.lat, -45.333, 'latitude value was parsed' );
	t.equal( value.lng, 253.333, 'longitude value was parsed' );
});
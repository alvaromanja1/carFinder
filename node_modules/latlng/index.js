/** @module latlng **/

function e( value ) {

	return value !== undefined;
}

/**
 * Parse out an object with lat and lng from a string. Or you can use
 * this to normalize objects to lat long format.
 *
 * You can pass in an options object which modifies how lat lng's are parsed.
 *
 * Here are options you can pass in:
 * ```javascript
 * {
 * 	delimiter: ',' // you can pass in a delimiter which is used to find a longitude and latitude
 * }
 * ```
 * 
 * @param  {String|Object} value A lat long value you'd like to convert to an object
 * @param  {Object} options This is an options object which can be used to parse the lat long. See above
 * @return {Object|Null} This function will turn an object which will contain the variables lat and lng
 *                       when parsing succeeds. If it fails null is passed back.
 *
 * @example
 * ```javascript
 * var val = require( 'latlng' )( '-54.23,34' );
 * 
 * console.log( rVal ); // { lat: -54.23, lng: 34 }
 * ```
 */
module.exports = function( value, options ) {

	var rVal = {}, type = typeof value, split;

	options = options || {};

	// TODO: parse out fancy ways of writing lat and longitude
	// http://www.geomidpoint.com/latlon.html
	if( type == 'string' ) {

		split = value.split( options.delimiter || ',' );

		if( split.length == 2 ) {

			rVal.lat = parseFloat( split[ 0 ] );
			rVal.lng = parseFloat( split[ 1 ] );
		} else {

			rVal = null;
		}
	} else if( Array.isArray( value ) ) {

		rVal.lat = parseFloat( value[ 0 ] );
		rVal.lng = parseFloat( value[ 1 ] );
	} else if( type == 'object' ) {

		// try to normalize the value of latitude to lat
		if( e( value.lat ) )
			rVal.lat = value.lat;
		else if( e( value.latitude ) )
			rVal.lat = value.latitude;
		else
			rVal = null;

		// if we got a latitude value
		// try to normalize the value longitude
		if( rVal != null ) {

			if( e( value.lng ) )
				rVal.lng = value.lng;
			else if( e( value.long ) ) 
				rVal.lng = value.long;
			else if( e( value.longitude ) )
				rVal.lng = value.longitude;
			else
				rVal = null;
		}
	}

	return rVal;
};
<a name="module_latlng"></a>
#latlng
<a name="exp_module_latlng"></a>
##module.exports(value, options) ⏏
Parse out an object with lat and lng from a string. Or you can use
this to normalize objects to lat long format.

You can pass in an options object which modifies how lat lng's are parsed.

Here are options you can pass in:
```javascript
{
	delimiter: ',' // you can pass in a delimiter which is used to find a longitude and latitude
}
```

**Params**

- value `String` | `Object` - A lat long value you'd like to convert to an object  
- options `Object` - This is an options object which can be used to parse the lat long. See above  

**Returns**: `Object` | `Null` - This function will turn an object which will contain the variables lat and lng
                      when parsing succeeds. If it fails null is passed back.  
**Example**  
```javascript
var val = require( 'latlng' )( '-54.23,34' );

console.log( rVal ); // { lat: -54.23, lng: 34 }
```


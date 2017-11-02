/**
* @author Supal Dubey, modified, extended and adapted to RomanArabConverter by @dipina
* http://roadtobe.com/supaldubey/
**/

function dispatch(handler, req, res) {
	var content = "";
	if (typeof handler === 'function') {
		content += handler(req, res);
		/*res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(content);*/
		/*
		res.writeHead(200, {"Content-Type": "text/xml", "Cache-Control": "no-cache"});
		console.log("***Response: '" + content +"'");
		res.write(content);
		res.end(); */
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('"No request handler found: ' + handler);
		response.end();
	}
}

exports.dispatch = dispatch;

all:
	npm install -d
	cp length.js dist/length.js
	cat length.js | ./node_modules/.bin/uglifyjs -m -nc -mt -c  > dist/length.min.js

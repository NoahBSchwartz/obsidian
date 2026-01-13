Web Client -> Protocol -> Web Server/ Application -> Web Resource
- Protocols: http, https (s is more secure)
	- URL = locator, URN = name, URI = either one
		Ex. URN: `dmn.tld/page.htlml` URL: `http/colorado.edu`
	- HTTP: used to transfer data
		- HTTP is Stateless: the server doesn't need to save information about the user over multiple requests (you can easily switch servers for every request which makes things faster)
		- Return codes: 200 = Ok, 302 = redirect, 400 = bad request, 401 = unauthorized (don't have the right api key), 403 = forbidden  (have the right api key but not allowed to access data), 404 = not found, 500 = server error
- Format for how data can be exchanged
	1. XML (Extensible markup language)
		- Tag based like HTML
		- Tags only describe data (don't display data)
		- Written in markup (human and machine readable) (Uses a parser)
```xml
<bookstore>  
	<book category="cooking">  //book 1
		<title lang="en">Everyday Italian</title>  
		<author>Giada De Laurentiis</author>  
		<price>30.00</price>  
	</book>  
	<book category="children">  //book 2
		<title lang="en">Harry Potter</title>  
	</book>  
	<book category="web">  //book 3
		<title lang="en">XQuery Kick Start</title>  
		<author>James McGovern</author>  
		<author>Per Bothner</author>  
		<author>Kurt Cagle</author>  
		<author>James Linn</author>  
		<year>2003</year>  
		<price>49.99</price>  
	</book>  
</bookstore>
```

	2. JSON (javascript object notation): format for how data can be exchanged
```json
"bookstore": {  
	"book": [  
		{"title": "Everyday Italian",  //book 1
		“author": "Giada De Laurentiis",  
		"price": "30.00"},  
		{"title": "Harry Potter"}, //book 2
		{"title": "XQuery Kick Start",  //book 3
		"author": ["James McGovern",  
		"Per Bothner",  
		"Kurt Cagle",  
		"James Linn"],  
		"year": "2003",  
		"price": "49.99"}  
	]  
}

bookstore.book[1].author[2] //query JSON
```

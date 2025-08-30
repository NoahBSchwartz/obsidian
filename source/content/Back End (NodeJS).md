NodeJS can: create HTML on the fly, manipulate files on the server, process form data, manipulate DB
- Communication
	1. req: the HTTP request coming from the client
	2. res: the HTTP response being sent back to client
- Routing: the way NodeJS responds to request for endpoint (using Express app object)
	Ex. Use `app.get(/)` for get requests vs `app.post(/)`
- Initializing a Node Project
	- `npm init`: Initialize node project and generate package.json
	- `package.json`: stores all modules, packages, etc
	- `node_modules`: contains all file dependencies
		- `.gitignore`: make sure to ignore node_modules folder
- HTML Forms: get info from user and pass it to web server (which passes form data as input to server script)
	- GET works by appending data to end of url
```js
//WebPage Code
<form action="http://URL"> //url is name of script on server
<form method="GET"> //sends small amount of data
<form method="POST"> //sends lot of data with security
<form action="localhost:<PORT_NUMBER>/getRecipeById?recipeID=1"> //call function /getRecipeById and pass recipeID = 1 in

//Server Code
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'recipes_db',
	user: 'postgres',
	password: 'pwd'
};
const db = pgp(dbConfig);
app.get('/', function(req,res){ //default functions, always runs when page loads
	res.send('<h1>Hello World<h1>');
})
app.get('/getRecipeById', (req, res) => { //when /getRecipeById is called, run function
    let rId = req.query.id; //read data in the request
    let query = `SELECT * FROM recipes WHERE recipeId = ${rId};`;
    db.any(query)
    .then((rows) => {
        res.send(rows); //send the response from the database back to the client
    })
});
```
- To test, type `local host:80/welcome` into address bar
```js
app.get('/getRecipeByName/:name', (req,res) => { } //use :name as another way to pass value (ie. localhost:<PORT_NUMBER>/getRecipeByName/tirimisu)
app.post('/users', (req, res) => {} //Used to create new resources on the server. Like creating new user in database
app.put('/users/:id', (req, res) => {}//Used for updating existing resources
app.delete('/users/:id', (req, res) => {} //delete existing resources from server
```
- Handelbar: insert dynamic content into webpage (if apple is typed into search bar, only images of apples are shown)
	1. Layouts: main.hbs (has partials with code that will by dynamically rendered)
	2. Partials: header.hbs, menu.hbs, footer.hbs
		- Create re-usable components of webpage which make it easier to maintain code
		- Note: these may change or may not (them being .hbs doesn't matter)
		- Syntax: `{{> myPartial}}`
	3. Pages: stores pages that will fill webpage
```html
//resources/css/style.css
<div class="container">
	<h1>{{message}}<h1>
```
```js
const hbs = handlebars.create({...});
app.get('/getRecipeByName/:name', (req,res) => { 
	//res.send is for static data, instead use:
	{{> head.hbs}}
	res.render(`pages/home`,{
		my_title: "Home",
		stylesheet : "../resources/css/style.css"
		message : "Welcome to this demo"
	}
}
//head.hbs 
{{#each data}} //equivalent to using a for loop to print array when rendering
	<tr>
		<td>{{recipe}}</td>
		<td>{{times}}</td>
	</tr>
{{/each}}
{{#if first_name}}
	<title> {{first_name}} - CSCI 3308 Lab 7 </title>
	{{else}}
	<title> CSCI 3308 Lab 7 </title>
{{/if}}
  ```
[[Relational Databases]]
[[SQL]]

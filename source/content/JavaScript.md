The primary client-side language
 - Uses DOM HTML Tree to render elements![[Screenshot 2024-02-05 at 11.31.49 AM 1.png]]
 - You can build an entire HTML page using just JS, change/ add/ remove HTML attributes/ events, change CSS styles
 - All this is done by using tags. Here's an example of changing HTML and CSS attributes:
 ```HTML
<html>  
  <body>  
	<h1 onclick="alert('You clicked this heading');">
		Click Here!  
	</h1>
	<p id="demo"> </p>
	<script> //anything within script auto-executes
	  document.getElementById("demo").innerHTML=".";  
	//getElementByID is method, .innerHTML is property
	  document.getElementById("demo").backgroundColor = "blue"; //change CSS
	  alert("Hello World"); //shows an alert on site
	</script>  
  </body>  
</html>  

//or include an external js sheet
<html>
	<head>
		<script src="./resources/js/script.js"></script>
	</head>
</html>
```
- Specifics
	- `<script>`  can be declared either within the head or the body (including in head could slow loading of page down)
		- Use `async` to load elements in parallel that don't matter to webpage (ie.  advertisements)
		- Use `defer` to load elements in parallel that do matter to webpage (ie. pictures)
	 - Dynamically typed: `x = 4, x = "h", x =...`
```HTML
<html>
  <body>
    <div onmouseover="mOver(this);" onmouseout="mOut(this);" style="background-color:yellow;  width:120px; height:20px; padding:40px;">
      Mouse Over the Box
    </div>
    <script>
      function mOver(obj) {
        obj.innerHTML = "Moused Over";
      }
      function mOut(obj) { //no return type specified b/c js is dynamically typed 
			var days = [‘Mon’, ‘Tue’, ‘Wed’, ‘Fri’];  
			var i = 0;  
			while (i < 5) {  
				document.write(’<p>’);  
				document.write(days[i]);  
				document.write(‘</p>’);  
				i += 1;  
			}
		    obj.innerHTML = "all done";
      }
    </script>
  </body>
</html>
```
- JS doesn't need a compiler because browser has its own runtime environment (meaning there's no `main` function)
	 - Event-Driven: Function runs when events trigger it
	 - Event Handlers: Dictates the actions that follow events
	 - Events "bubble upwards" so if button is in box on website and the user clicks, the whole website will register click. Use `ev.stopPropagation();` to stop this
	 - Note: when using functions w/ events, you can't pass values
```js
const btn = document.querySelector('button’);  
function bgChange() {  
	const rndCol = 'rgb(' + random(255);
}
btn.onclick = bgChange;
//or you can use an anonymous function:  
btn.onclick = function() { alert('hello'); }
//this is wrong because you can't pass values
btn.onclick = bgChange('blue');
```
- Callback Function: a function passed into  another function as an argument. Important for things like API calls where things need to happen asynchronously but also happen in right order
	Ex. order is input -> get results -> print,         print might be 1st
	- Higher-Order Function: the outside function which accepts the callback function
	- `setTimeout`: offloads a task for the browser to process
```js
function greeting(name) {  
	alert('Hello ' + name);  
}  
function processUserInput(callback) {  
	var name = prompt('Please enter your name.’); 
	callback(name); 
}
processUserInput(greeting);
```
- JQuery: Javascript library which lets you write things short
```js
//now buttons can be defined and used in 1 line
(“button”).click(function(){alert(‘button clicked’);})
```
- Complex code 
```html
<html>
  <head>
	<script src="./resources/js/script.js"></script>
  </head>
  <body onload="mOut"> //call mOut as soon as page loads
    <script>
	    var newDiv = document.createElement('div');
		var newAnchor = document.createElement('a');
		newDiv.append(newAnchor); //add content to newDiv
    </script>
  </body>
</html>
```
```js

```
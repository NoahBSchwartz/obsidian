Coding language for things like color, shape, style...
- Style levels
	1. Tag-level: Style attributes within a tag on a page.
	2. Page-level: Style defined within  `<head>` of each page. 
	3. Site-Level: Within an external file, pulled into each page for an entire website. Enables consistency.
	- Each level overrides the one below. To override the precedence you can use `!important`.
- Specifics
	- Within the `<head>` of the element you want to change, add a style modifier
	- Use ID's to specify formatting on specific objects
	- Classes: a way of giving multiple elements the same style
		- To reference a class name `.classTest1`
```html
<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        body {  
            font-family: Arial, sans-serif;  
            font-size: 16pt; 
        }  
        h1 {  
            color: black; 
        }
        #specialParagraph {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p id="specialParagraph">This has style. </p>
</body>
</html>

//or include as an external css sheet
<html>
  <head>
   <link rel="stylesheet" href="./resources/css/style.css" />
  </head>
</html>
	```
	
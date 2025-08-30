- Getting Started
	1. Wireframe: Start with blueprint that focusses on the structure and navigation of UI (gives an idea of the interface, display, and navigation)
	2. Mockup: High fidelity model to show the final appearance of the app
	3. Prototype: Early model of actual application, shows basic functionality
- Development: 
	- Cache: browser caches pages, beware when reloading
- HTML: 
	- Tags: Bring specific qualities with them. Use lower case for tags, Anything in quotes is case-sensitive
	- HTML not sensitive to spaces
	- Always use end tags (but not needed for images...)
	- Use `HTML:5` to autofill template, then use tab to make sure all tags are correct syntax
- Specifics
	- `id = "xxxx"` to label tags
	- `class="classname"`: ties it into a group for style
	- `style="xxxxx"`: xxx list of style elements
```HTML
<!DOCTYPE html>  
<html>  
	<head> 
	</head>  
	<body>  
		<p> text goes here</p>
		<h1> big heading </h1>
		<div> contains divisions of page </div>
		<ol> an ordered list </ol>
	</body>  
</html>
```
- Hyper Link: takes web user to another document, implemented via `<a>` tag and `href = "xxxx"`
	- Use absolute paths for links over the internet and relative path when linking to something in your own website
```Html
<a href="https://www.google.com">Google</a> <br>
<a href="../downloads/home.html">Beautified Home</a> <br> <!--go up a directory from where script is located and then go into downloads/home.html
```
- Images
	- `alt="xxxx"`: alternate text, what displays if an image doesn't load
	- `src=“path to file”`: location of image
```html
<img  
src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg"  
alt="An image of a dog"  
width="220px"  
/> //notice the lack closing tags
```
- Tables and Forms
```html
<table border="1">  
<tr>  
	<th>Name</th>  
	<th>Image</th>  
</tr>  
<tr>
<form method=“GET”> //get data
```
[[CSS]]
[[JavaScript]]

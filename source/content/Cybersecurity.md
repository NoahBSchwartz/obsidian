# Review 
##### Building a Website
[[Front End (Presentation Layer)]]
1. Your computer ("client") asks for the Client-Side Code (written in HTML HyperText Markup Language) of the website from the "server". Your computer turns this into a picture 
	- HTML: isn't a programming language. it encloses content in tags and website can go through program in any order
	- Javascript adds interactivity (actually a programming language) and CSS lets you change how things look
2. The server sends the code to the client and constantly listens for connections 
	- GET requests make the server send you code. POST requests change server (forms tell the action that happens)
	```python
	from flask import Flask, render_template
	app = Flask(__name__)
	app.route("/")
	def index():
		return "<h1> Welcome </h1>" # send small code to client!
	def index():
		return render_template("index.html", visitors = 5) # send big code to client! 
	app.run(port=5000) # run website forever (even if script turned off)
	```

```HTML
**

<!-- index.html -->
<pre id="chat">

    {{ messages }}

</pre>

<form action="/post" method="post">
    <input type="text" name="message">

    <input type="submit" value="Submit">
</form>
```
##### Navigating Websites
- You can have multiple paths by adding a string after webpage
# Takeaways
1. Never make any security changes to client-side code (HTML)!
2. 

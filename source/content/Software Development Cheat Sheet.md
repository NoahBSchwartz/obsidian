Saas = Software as a service
Paas = Platform as a service (Azure, Render) gives whole infrastructure to deploy website
Iaas = Infrastructure as a service: hardware provided but you need to decide OS, middleware...
Need to know all commands that you used in docker (need to know about docker compose.yaml)
What kind of typing does Javascript use for its variables (Dynamic, don't specify type when declaring variable `let`)
In the context of Agile, what does the phrase "Definition of Done", with respect to a user story, refer to?  (The acceptance criteria that a user story must be met to be considered complete.)
Product backlog has all epics and all user stories you need to eventually build
Sprint backlogs are all tasks you need to preform in a given week (aka sprint cycle)
Non-Functional Requirements: Requirements from developer's perspective (how you do something)
Functional Requirements: Requirements from business perspective, all the functionality you need (what you need to do)
- `[B-DT-Z].{1,}(gh)+.*` means (Bought, Dough, Wrought are in REGEX).      (Straight, bought are not in REGEX)
For JSON, if there's a square bracket you need to provide an index. If there's a curly brace, use a dot
![[Screenshot 2024-05-01 at 12.04.40 PM.png]]
- `employees[1].lastName` works
Post is used for creating resources. Put is used for updating resources. Get is used to fetch existing resource
400: Resource Not Found, 300: redirect, 500: internal server errors 
### Testing
1. Unit Testing: works well with modular (lot of functions) code, where each function has a unit test. 
	- Tests look for expected and unexpected inputs
	- Automated Testing: most often used, be sure to have a testing framework, have expected value for every function, 
1. Integration Testing: individual units are combined and tested as a group
2. Regression Testing: re-execute all tests to see if anything is impacted by code changes (before pushing to production)
3. Use Case Testing: tests based on the use cases of the app (test out for different kinds of users)
4. User Acceptance Testing: like a focus group to see if the system is intuitive and good for real people
	- Have an outline of testing strategy
	- Have a log of what happened
	- Collect a user sign off (indicate that they're satisfied)
5. Performance Testing: establish the benchmark behavior of system
	- Load testing/ volume testing/ endurance testing: testing sustainability of system under continuous load
	- Stress testing: make sure if system fails, nothing catastrophic will happen
6. Waterfall Testing Practices: there is a sequence of stages in which the output of each stage becomes the input for the next
- Development
	1. Test Driven Development: write your tests before you write your functions
	2. Behavior Driven Development: extension of TDD where test cases are written in natural language for technical and nontechnical stakeholders 
		- In the form of: given, when, then
			Ex. given: user navigates to home page, when: user clicks search, then: user sees search results
	3. Continuous Integration: integrate and build the system several times a day to make sure everything's working. Every time a person pushes their code to the repository, automated integration testing runs
### Agile Development
Client is constantly involved (more expensive at the start of the project but better as project goes on because it guarantees the client is happy)
1. Get input from stakeholders (clients, project team, managers)
	- Put input into Product Backlog (list of features needed for development)
2. Team has a Sprint Planning Meeting to figure out which features to prioritize
	- Put this plan into Sprint Backlog 
3. Task Breakout: each member of the team picks a task that they want to complete
4. Meetings
	- There are standup meetings every 24 hrs where each member explains what they're doing
	- Ending cycle (every 2 weeks)
		- There is a sprint review where team reflects on its work
		- There are sprint retrospectives where team talks with client to see what they could have done better
	- Start the next one
5. Scum Master: takes notes during the standups and then contacts different members of the team to resolve blockers
	- They're not a manager, they don't assign tasks or order people around 
- Technical Debt: if you write bad code today, it will multiply and hurt you tomorrow (caused by business pressure, lack of understanding, lack of tests, lack of documentation)
### Database
- Searching Through Database: use primary key
	- Composite Key: consists of two or more columns (ie. Noah, Comp Sci)
	- Primary Key: the main way of identifying rows. There can be only one primary key. Can be composite for more specificity 
		- Alternate Key (AK): other keys that could be primary keys if needed
	- Surrogate Key: artificial column added to a relational database to act as primary key (for increased efficiency)
	- Foreign Key: key of one relation that is placed in another relation to form a link between relations
		- Referential Integrity Constraint: limits the values of the foreign key to those existing in primary key (of relation `#1`
- SQL
	- NOT NULL: requires that a field be set when a new entry is added to the table.
	- SERIAL: creates an auto-increment that is managed by the database. Each time a new entry is added to the table, the SERIAL column is set and the value is incremented by 1
	-  VARCHAR(#): A variable-length character string, where # defines the maximum number of characters
	- TEXT: similiar to the VARCHAR(#) data type, but removes the character lim
```
CREATE TABLE students(
	studentId BIGINT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
);
INSERT INTO mytable(val1,val2,str3) VALUES (1,2,'hi'), (3,4,'yo'), (5,6,'wow')

// Add up all units which match category_id
SELECT category_id, SUM(units_in_stock)
FROM products
GROUP BY category_id;
HAVING SUM(units_in_stock) > 100; //filter sums

SELECT p.name, COUNT(m.id)
FROM platforms p
JOIN movies m ON p.id = m.platform_id
GROUP BY p.id
ORDER BY COUNT(m.id) DESC
LIMIT 1;

//update
UPDATE movies
SET platform_id = (
	SELECT id
	FROM platforms
	WHERE name = 'Netflix'
)
WHERE year_of_release = 2004;

ALTER TABLE table_name  
ADD COLUMN new_column_name data_type constraint;

//inner join
SELECT  
	employee.name,  
	salary.current_salary  
FROM  
	employee  
	INNER JOIN salary
		ON employee.id = salary.employee_id;
```
### Git Stuff
- Regex: `(^CSCI [0-9][0-9][0-9][1,3,5,7,9])` this gets all odd numbered courses ie. 1003, 2935...
- Clear terminal: `clear`, Go back a directory: `cd ..` (to go back multiple: `cd ../../..`), To relocate a file: `mv ./folder1/sample.txt ../folder2`, Search for a phrase in file: `grep "test" file.txt`,  Change file permission to make it executable: `chmod +x file.sh` 
- Piping: if you want to pass output of one command to another command ie. `grep "test" file.txt | tee output.txt` (tee is write command)
  - Print contents of file: `cat file.cpp`, Print head of file: `head`, Print tail of file: `tail`
	- Write to file: `echo "Hello World" > sample.txt` (overwrites), Append to file: `echo "Hello World" >> sample.txt`
- Vim: another way to modify file. Create file: `vi sample.txt`, When in file, press `i` to start typing (press esc to exit insert mode), Exit file: `:q` or `:wq` (write and quit to save file before exiting) 
- Docker: `docker compose down -v` (end docker and remove volumes)
- `docker compose up -d`
- See all Containers: `docker ps -a` See Running Containers: `docker ps` Remove Containers: `docker rm hello_world_container`
- Run an image interactively: `docker run -it ubuntu` To exit: `exit`
- View all running instances: `docker compose ps`

- `git rebase`: when there are changes in main that we want to reflect and bring our branch to the same state as main
- `git fetch`: pulls all new branches from main so they can be in local repo, `git checkout`: navigate between branches created by fetch
- `git rm`: remove files that have been staged for commit but are no longer needed, `git rm --cached` (will only remove from staging area)
- `git stash`: store/save your current changes safely in one place so that you can work on something else and come back to project `git stash -u:` stashes untracked
### Web Services
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
### Review
- `id = "xxxx"` to label tags, `class="classname"`: ties it into a group for style, `style="xxxxx"`: xxx list of style elements
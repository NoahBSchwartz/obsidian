Stores both data (in tables) and relations (between tables)
- Ex. Each student is an *object* of the *entity* "students"
- ACID
	- Atomicity: takes an all or nothing approach for data transfer (if data is moved from one place but doesn't get put in another place, the transaction reverses )
	- Consistency: different rows should always agree with eachother
	- Isolation: Transactions occur independently (you may not see the most updated values because changes only occur after a transaction finishes)
	- Durability: Once a transaction occurs, it will be permanently locked in
- Steps for Constructing Data Base
	1. Normalize data into multiple tables with standardized columns
	2. Construct a Data Model
		- Define an entity (category you want to track)
		- Define objects (all members of the entity you track in rows)
		- Define attributes (all columns you want to track)
		- Define relations (how different columns connect)
	3. Follow the rules of table-making
		- Every cell can have exactly one value
		- There must be a unique ID for each column (but not each row)
- Searching Through Database
	- Key: consists of one or more columns to identify specific relations
		- Composite Key: consists of two or more columns (ie. Noah, Comp Sci)
		- Primary Key: the main way of identifying rows. There can be only one primary key. Can be composite for more specificity 
			- Alternate Key (AK): other keys that could be primary keys if needed
		- Surrogate Key: artificial column added to a relational database to act as primary key (for increased efficiency)
		- Foreign Key: key of one relation that is placed in another relation to form a link between relations
			- Referential Integrity Constraint: limits the values of the foreign key to those existing in primary key (of relation `#1`)
- Normalization: Normal Forms: rules to follow
	1. (1NF) Remove any multi-valued cells, and/or any rows requiring a specific sequence  
	2. (2NF) For entities with composite keys, make sure that all attributes are dependent on the full key
	3. (3NF) Make sure that no attributes are dependent on any other non-key attributes
	 Ex. Email ID doesn't relate to recipe so it should be removed![[Screenshot 2024-02-14 at 11.36.00 AM.png]]
- Data Modeling ![[Screenshot 2024-02-14 at 11.38.57 AM.png]]
	- Specify whether attributes can can have null entered or whether they need to be filled
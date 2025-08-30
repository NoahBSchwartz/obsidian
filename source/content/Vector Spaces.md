- Summing it All Up
	- What are vectors? Is it an arrow in space or is it a set of numbers, might seem obvious that it's numbers but determinant and cross product are inherently spatial. So what's going on
	- Think about other vectorish things like Functions: sort of like vectors, you can add 2 functions together and scale them (by adding up every single point or applying the same operation to every single point). This is like scaling a vector coordinate by coordinate, now there's just infinitely many coordinates 
		- You can even do a linear transform of a function (think of a derivative) (this is called a Linear Operator). What does linear mean talking about functions? "Must preserve addition and multiplication"
			1. Add 2 vectors and transform =  Transform 2 vectors and then add them 
			2. Scale and transform = transform and then scale ![[Screenshot 2024-08-12 at 4.33.32 PM.png]]
		- Example: with vectors, the way transformations work is by scaling the basis vectors by a certain amount (if you have a vector that you're transforming, write in terms of basis vectors, transform, and then get out the output vector). Use this to Linearly Transform a function to take its derivative
			1. Choose Basis System: This is arbitrary but it makes a lot of sense to make each basis vector a power of x (ie. the more powers of x, the more dimensions a function has) ![[Screenshot 2024-08-18 at 9.42.49 AM.png]]
			2. Make a matrix representing derivative: count up from 0 so `x^0 = basis * 0`, `x^1 =basis * 1`, `x^2 = basis * 2`![[Screenshot 2024-08-18 at 9.51.54 AM.png]]
			3. Matrix Multiplication ![[Screenshot 2024-08-18 at 9.53.40 AM.png]]
	-  Takeaway: Vector Spaces: there are so many things in math that look kind of like a vector. ==As long as you are dealing with a set of objects (where there's a property of scaling and adding), everything we've learned in linear algebra (transformation, eigenvectors, dot product...) should be able to apply==\
		- Mathematicians have a few rules for vector spaces and as long as the system can fit the rules, we can use linear algebra 
		- This is why mathematicians work abstractly! They can make a space with a bunch of rules so that someone only needs to translate their problem into the space to take advantage of all the tools
		- ==Abstractness is the price of generality==
		Example: Prove that a set of numbers is a vector space (you need to show it's a field (ie. that it's defined for addition and multiplication))![[Screenshot 2024-09-03 at 11.47.23 AM.png]]
		- Note: a group is a set that has associativity, identity, and inverses. An Abelian is a group that has all that and commutativity. A field is 2 Abelian groups defined for addition and multiplication 
Show that a given polynomial is always positive by proving that it's a sum of squares!
1. We can take a problem like "find the best route to work given the current traffic condition". Turn it into a polynomial and the solution is the minimum value of the polynomial (ie. find all the very best arguments to minimize this huge problem)
	- Verification angle: if we don't want our self-driving car to crash into the wall, overlay a grid on the road and make the wall be negative space and everything else be positive. Make this fit as closely as possible using sum of squares. Then check that the polynomial is never negative
2. Solving for the minimum value of a polynomial is super hard. But we can ask ourselves: "What’s the most I can subtract from a nonnegative polynomial before it turns negative somewhere?" Subtract 1, 2, 3... until we can't prove sum of squares
3. How do we actually do sum of squares optimally? Translate it into a semi-definite program!
	- Semidefinite Program: goal is to minimize a linear function subject to constraints
		(including the requirement that a symmetric matrix variable be positive semidefinite (all eigenvalues are non-negative))
# Background
A goal might be to show that a certain area of our model is stable (ie. all points that start at x = 0 remain pretty close to it). We have to construct a function called a Lypunov function which satisfies: ![[Screenshot 2025-09-28 at 11.50.16 PM.png]]
- Affine: affine functions are of the form "linear function + offset" --> f(x) = ax + b. All linear functions (ie. ax) are affine (offset = 0)
	"orthogonal means perpendicular in higher dimensions, affine means parallel in higher dimensions"
# Sum of Squares
1. If you have a bunch of functions added together... square each function and add them together and you'll always be >= 0! ![[Screenshot 2025-09-28 at 11.55.55 PM.png]]
2. A polynomial is a sum of squares if it can be made by adding a bunch of other squared polynomials together
3. Setting up the Problem
	- We have N constraints we need to satisfy 
	- u = (u1, u2, u3...) We have a vector of decision variables (ie. things that we can change)
	- c = (c1, c2, c3...) We have a vector of costs (corresponding to the decision variables)
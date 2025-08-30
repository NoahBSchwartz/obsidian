How much an area stretches or squishes when a linear transformation is applied (ie. if transformation triples an area then the determinant is 3)
- Conceptual: Same method as previous, look at how much a 1 x 1 unit square stretches and use that to apply to any shape. Negative determinant means that space is flipped (i was to the right of j, but it's now to the left of j)
	- ==The flipping of the matrix is an excellent justification for why we need to use the right hand rule in calc! (but in 3d) ==
- Special Cases
	- If the determinant is 0 then that means linear transformation squishes all of space into a single line or a single point (linearly dependent). *This is a very important use!*
	- 3 dimensions work the same but you use the *unit cube* to solve for any shape's *volume* (determinant of 0 here means shape is squished into either a *plane*, line, or point: linearly dependent)
	- Just memorize equation, it's related to area of a parallelogram but intuition is harder to find on this one:![[Screenshot 2024-07-12 at 10.15.39 PM.png]]
Note: Multivariate Calculus is related to this because we're using vectors to define shapes and then one of the ways to solve the area problem for a hard shape is to execute a linear transformation into a better position where we can better solve for the volume and use the determinant as a scaling factor
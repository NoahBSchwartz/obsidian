Review: Remember, dot prod is just multiplying the rows of 2 matrices together and then adding them together
- Steps: Dot Product tells you how similar two vectors are to each other by projecting one onto the other
	1. Project w onto v
	2. V dot W = Length of (W onto V projection) * Length of V![[Screenshot 2024-07-23 at 11.39.08 AM.png]]
- But how does the multiplying and adding to get to dot prod answer have anything to do with projections?
	1. Think of trying to transform a 2D vector into a 1D vector using a linear transformation (one where all dots stay same distance apart)
	2. Normally, we'd do this using matrix multiplication by the og vector and the transformer matrix. This calculation looks like dot prod![[Screenshot 2024-07-23 at 5.12.36 PM.png]]
	3. It's not quite dot prod because it's between a matrix and a vector. But now think of the Transform matrix as a vector itself
		- Put the 1D number line into the 2D plane, and then look at how the unit vector of the number line (U) decomposes into the 2D plane's unit vectors (I, J)![[Screenshot 2024-07-23 at 5.28.54 PM.png]]
			I and J land on the x and y coordinate of U!![[Screenshot 2024-07-23 at 5.31.04 PM.png]]
	4. If our second vector in dot prod isn't unit vector (ie. 3U, 5U...), just project first and then multiply by constant
	Significance: Anytime you have a (2D, 3D, 4D...) -> 1D transformation, there is some vector (V) that "corresponds" to this transformation. This means you can do `(2D, 3D, 4D) dot V = 1D`
	- Dual Vector: the vector V that corresponds to the 2D->1D transformation
- Conceptual: Duality: ==a dot product between two vectors is allowing you to take one of the vectors and transform it into a Matrix so that it can be used as a transformer==. Super cool way to think about the change from `Multiple Dimension -> 1D`![[Screenshot 2024-07-23 at 5.42.40 PM.png]]
- Orthonormal: if you take the dot product between 2 vectors before a transformation and after a transformation you'll usually get different answers. But if the 2 dot prods are the same, the transformation is called "orthonormal." Think of these like rotation matrices, there's no stretching or squishing or morphing going on, just rotation
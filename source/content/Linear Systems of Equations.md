Linear System of Equations: Linear Algebra is broadly useful in the real world because it helps mathematicians/ scientists solve systems of equations 
- If the equation contains only variables of first power only added together, it can be solved with linear algebra by setting it up as the product of 2 matrices ![[Screenshot 2024-07-14 at 12.20.33 PM.png]]
	- This setup is saying: we're looking for a vector (`[x y z]`) which lands on the solution (`[-3 0 2]`) after applying the transformation (`[2 4 1, 5 0 3, 3 8 0]`)
- Check whether transformation keeps space in same dimension (determinant != 0) or squishes it into lower dimension like line or point (determinant = 0) 
	- ### Case 1
		Determinant != 0: Start from output (`[-3 0 2]`) and then apply an inverse transformation to figure out what input vector `[x y z]` would need to be
		- Inverse Transformation: The exact opposite of a certain linear transformation (ie. A * A^-1 = `[1 0, 0 1]`) called the identity transformation
			- Identity Transformation: `[1 0, 0 1]` the transformation that does nothing. It leaves i and j unmoved (found with computer)
	- ### Case 2 
		Determinant = 0: There is no inverse for this transformation. Solution could still exist, though, if we're lucky enough that output vector lands on the plane/line/point that the matrix is being squished into so we need to check:
		- Rank: the amount of dimensions the output vector of a transformation contains (`[-3 0 2]` = rank 3)
			- When the output of a transformation has determinant = 0, there could be more info (ie. plane) or less info (ie. line) encoded. So rank is used: 1 = squished to a line, rank 2 = squished to a plane... (See [[Encoder Decoder Editing]])
			- Full Rank: when the transformation has the same number of output dimensions as input dimensions (ie. map 3D-> 3D)
		- Column Space: Set of all possible outputs to a linear system of equations
			- AKA: the span of the columns in the transformed matrix (each column is a basis vector so "span of the columns" is all of the vectors that could be made) Note: Image shows a matrix after a transformation which compresses it to a single line. The basis vectors are also compressed (they're span is only on the single line)
			- Column Space lets us understand when a solution even exists ![[Screenshot 2024-07-14 at 3.35.39 PM.png]]
		- Null Space/ Kernel: The set of vectors that get squished down to the origin when transforming a matrix
			- If you were trying to figure out a linear system of equations where the output was `[0 0 0]`, the null space would be the set of all solutions (inputs `[x y z]`)
			- Null Space helps us understand what the set of all possible solutions can look like
- ==Takeaway: You can convert a system of equations into a matrix multiplication. The first matrix specifies the transformation (where the basis vectors will land after the transformation), the second matrix is the og vector we'd need to plug in, the 3rd matrix is the transformed vector we get out==
# Solving Linear Systems of Equations 
Remember: the goal here is to find the right input vector to produce the output vector. To do this, we just need to find some ratio that changes with transformation that we can undo to find the og vector
- Steps: We can use the area of the parallelogram made by the basis vectors and the new vector (which will scale back to give us the og vector)
	1. We want to find x, y of the og vector. Do this by thinking of x and y as a determinant (ie. parallelogram which is 1 by x and 1 by y) and then seeing how this parallelogram changes after translation. 
		`Area Before Translation = Basis Vector i * y`  ---->  `Area After Translation = det(Basis Vector i, Basis Vector j) * y`![[Screenshot 2024-07-30 at 8.07.55 PM.png]]
		Note: the after equation uses `determinant` because we're trying to find a multiplier for how to scale y
		Note: diagrams above show only y but we're doing exact same thing for x
	2. Rearrange the `After Transformation` equation to solve for x and y. We already know the Transform Matrix so just plug that in. For our `Area After Transformation` variable, plug in the equation for the new parallelogram which is `det(new x basis vector, new vector)` and `det(new y basis vector, new vector)` (this is like saying after the transformation is done, what's the new area) ![[Screenshot 2024-07-30 at 8.15.18 PM.png]]
	3. Special Cases: In 3D, we'll just use the determinant but this time get a paralleliped with base 1 x 1 which will give height z (change the dimensions depending on whether we're trying to solve for x, y, or z) ![[Screenshot 2024-07-30 at 5.23.23 PM.png]]![[Screenshot 2024-07-30 at 10.39.21 PM.png]]
	
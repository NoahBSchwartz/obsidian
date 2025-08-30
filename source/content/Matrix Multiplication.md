- Composition (Matrix Multiplication): when you combine 2 linear transformations together you get another linear transformation![[Screenshot 2024-07-23 at 5.20.59 PM 1.png]]
	- Conceptual: ![[Screenshot 2024-07-12 at 4.02.48 PM.png]]
		1. Transform base vector using first matrix `[Rotation 1st column * x coord, Rotation 2nd column * y coord]`
		2. Transform this result using second matrix `[Shear 1st column * x result, Shear 2nd column * y coord]`
			(Base vector is left out of equation below, because (ie. `[1 1, 1 1] * [e g, f h] -> [e g, f h]`)![[Screenshot 2024-07-12 at 4.13.02 PM.png]]
	- Note: read this right to left (ie. apply rotation first then shear). Not commutative so this is important
	- ==Note: Never forget that matrix multiplication is applying 1 transformation and then another. Think about this EVERY time you see a matrix==
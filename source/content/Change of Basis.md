- Normally you can think of `[1, 3]` as `[1j, 3k]` where i = `[0, 1]` and j = `[1, 0]`. But you can change to a new coordinate system if you just set j and k differently (ie. `i = [2, 1], j = [-1, 1]`)
- Translate a Vector 
	- From New System -> Old System: 
		1. New System: The vector in the new system  is just made up of the system's basis vectors
		2. Old System: Multiply the vector by *what we think* the system's basis vectors are (`i = [2, 1], j = [-1, 1]`) to convert back to old system ![[Screenshot 2024-08-04 at 2.47.41 PM.png]]
		- Conceptual: this is literally just a transformation (matrix multiplication) from old coord system to the new one. This might seem backwards. Think of it like correcting a misconception: we think the vector is `[-1, 2]` so we need to transform it using the basis vectors of the New System to get its true coords in the old system, `[-4, 1]`
			- The matrix contains the translation from our basis vectors to the new coord system and we just multiply this with the vector to perform the conversion ![[Screenshot 2024-08-04 at 2.53.47 PM.png]]
	- From Old System -> New System:  ![[Screenshot 2024-08-04 at 3.12.00 PM.png]]
		- Note: the inverse of a transformation is just playing the transformation backwards
- Translate a Matrix 
	Ie. if a transformation on the old coord system is encoded in a matrix, what would that matrix look like in the new coord system?
	- From New System -> Old System: 
		1. Start with a vector in the new coord system
		2. Use the change of basis matrix to convert to old system
		3. Apply the old system's transformation matrix
		4. Apply the inverse change of basis matrix to get the transformed vector in new coord system![[Screenshot 2024-08-04 at 3.31.47 PM.png]]
		5. This can work for any vector so the New System's transformation matrix is just: ![[Screenshot 2024-08-04 at 3.33.41 PM.png]]
- Conceptual: ==Whenever you see an equation of the from (A^-1)(M)(A), think of it like empathy in math. The middle matrix is the transformation from our POV (old coord system) and the outer 2 matrices are the way we "empathize" (convert it) to a new system==
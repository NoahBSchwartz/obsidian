If you ever see someone take an eigenvector/eigevalue, immediately think of transformations and PCA ([[Feature Selection and Transformation]])
- Eigenvectors: When a transformation occurs, most vectors from OG space will change angles (be knocked off their span) but some vectors lay on special lines where they won't change angles
	- Eigenvalues: the factor that these special vectors are stretched or squished by![[Screenshot 2024-08-12 at 12.44.12 PM.png]]
		Note: negative eigenvalue just means vector gets flipped and then stretched
- Significance: the eigenvector shows us exactly what the transformation is doing. We can boil down the whole transformation acting on the eigenvector (left side of the equation) into just the vector and a number to scale it (right side of equation)
	![[Screenshot 2024-08-12 at 12.52.05 PM.png]]
	Steps: Find the values for λ and v to find the eigenvalue and eigenvector 
	1. The equation is tricky to work with because left side is matrix vector multiplication and right side is scalar vector multiplication. So turn scalar multiplication into matrix multiplication (do this using diagonal matrix because it's saying "scale v by λ in x direction, then by λ in y direction, then by λ in z direction")![[Screenshot 2024-08-12 at 1.14.13 PM.png]]
		Note: I is the Identity Matrix (matrix with 1's down the diagonal)
	2. Rearrange equation and try to solve. We don't want v to be zero, so the only other way to get it to become 0 is if the transformation `det(A-λI)` squishes space to lower dimension (ie.  `det(A-λI) = 0`) ![[Screenshot 2024-08-12 at 1.17.34 PM.png]]
		 - Use `det(A-λI) = 0` to find the perfect λ and then use this to find v
	Ex. Answer to below is `[x = -1, y = 1]` ![[Screenshot 2024-08-12 at 1.32.01 PM.png]]
- Special Cases: Sometimes there are no eigenvectors (think of a rotation, no vector stays the same angle). Sometimes one eigenvalue can correspond to multiple eigenvectors
- Eigenbasis: if all basis vectors of og matrix are eigenvectors, the transform matrix will be a diagonal matrix.  Each column is a basis vector and each number is the eigenvalue scaling it (Notice how the x column has value in 1st spot, y column has value in 2nd spot...)![[Screenshot 2024-08-12 at 1.54.45 PM.png]]
	- Takeaway: ==If you ever see a matrix with numbers only on the diagonal, think of it like only scaling the basis vectors==
	- Significance: diagonal matrices are super easy to multiply together (it's trivial to compute `A^100` if it's diagonal). So we can make problems easier by changing our basis vectors to be eigenvectors (as long as there are enough and we remember to convert back)
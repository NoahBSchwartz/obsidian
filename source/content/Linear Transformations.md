A way to move around space so that origin stays centered all lines are straight (linear)
- Conceptual: to execute a linear transformation on a vector:
	1. Think of the vector as a combo of the basis (ie. unit) vectors 
	2. Execute the transformation and see where the basis vectors landed
	3. Think of the vector as a combo of the new basis vectors ![[Screenshot 2024-07-12 at 3.38.50 PM.png]]
- Syntax: `[New Basis Vector, New Basis Vector] * [Vector to Transform] = Transformed Vector` ![[Screenshot 2024-07-12 at 3.42.53 PM.png]]
- Special Cases: 
	- Linearly Dependent Transformation: If the transformations makes the 2 vectors line up (ie. `[1 1, 1 1] -> [2 1, -2 -1]`), this squishes all of space into a single line ("creates a 1-dimensional span")
	- More than 2 dimensions: Same sort of concept![[Screenshot 2024-07-12 at 4.29.44 PM.png]]
		- Non-Square Matrices: You can go from 2D->3D (pictured below) and vice versa with linear transformations. Simply use the same basis vector trick, see where they end up and then go from there ![[Screenshot 2024-07-14 at 4.32.19 PM.png]]
==Note: they're just going to make me memorize this but there's some good intuition behind it==
Note: Related to why interpretability is easier or harder in NN? [[AI Interpretability]]
[[Matrix Multiplication]]
[[Eigenvectors and Eigenvalues]]

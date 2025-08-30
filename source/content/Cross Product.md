The cross product of 2 vectors is a 3rd vector perpendicular to both whose length is the determinant (the area of a parallelogram made by the og 2 vectors) (remember: it will be positive or negative depending on orientation)
- Purpose: The more perpendicular the og vectors are, the larger their resulting vector will be. ==Just think of the cross product as a linear transformation from 3D->1D.==
- Steps: 
	1. just write the 2 vectors to two columns of a matrix and take the determinant![[Screenshot 2024-07-23 at 5.55.29 PM.png]]
		- Conceptual: Remember that taking the [[determinant]] tells us how the area of a single tile changes during a linear transformation. So taking the determinant of our vectors tells us "how the area of a unit square is scaled up when it's sides are projected to become vectors V and W"![[Screenshot 2024-07-23 at 6.08.50 PM.png]]
		- Special Case: if taking the dot product in 2 dimensions, just stop here
	1. This give us the length of our final vector. Now use the right hand rule to find which direction it goes in ![[Screenshot 2024-07-23 at 6.20.06 PM.png]]
		- Orientation Justification: Think of Unit Vectors `I x J = +1`, `J x I = -1` so for all generic vectors `V x W` the cross prod will be positive if V is to the right of W (like how `I` is to the right of J). This is just the same rationale as determinant being negative!
- Memorize: ![[Screenshot 2024-07-23 at 6.25.09 PM.png]]
	- Conceptual Reason: preforming a cross product is just a way to linearly transform from 3D->1D. The reason for the weird i, j, k trick is because to go from 3d->1d we need to find a dual vector and then take the [[Dot Product]] (exactly like 2D->1D).![[Screenshot 2024-07-30 at 1.57.21 PM.png]]![[Screenshot 2024-07-30 at 1.36.33 PM.png]]

# Background 1
1. Compute the first order derivative L(w1, w2, w3...) = w1^2 + w2^2...	![[Screenshot 2025-09-22 at 3.48.16 PM.png]]
		Note: gradient is always a vector (in any dimension) and points towards steepest downhill
2. Compute Hessian of L(w1, w2, w3...) = w1^2 + w2^2...![[Screenshot 2025-09-22 at 3.48.26 PM.png]]
		Note: Hessian is like the second order derivative in calculus (where it tells us how many minima the function has). It is a symmetric matrix (instead of a vector because we need to know "acceleration" in all dimensions)
# Background 2
1. If we are optimizing a convex function then we only have 1 minimum and we can solve analytically! ![[Screenshot 2025-09-22 at 3.57.12 PM.png]]
	- Second Order Derivative Test: if we prove that Hessian is positive semi-definite then our function is convex!![[Screenshot 2025-09-22 at 4.08.26 PM.png]]
		This is because positive semi definite means that: (Hessian) * (vector) = new vector less than or equal to 𝜋/2
			The Hessian can not reflect the vector! (during optimization of the weight vectors, there is only one direction to go!)
# Optimization
#### Linear Regression Example (Closed-Form Solution)
- [[Linear Regression]] (with RSS residual sum of squares): use just the first degree $HR = c0 + c1*Nsamples$
	- Ex. Find the `[w0...wn]` for: RentPrice = w0 + w1 * size + w2 * distance from city + ... 
	1. Input: `[<1 extra term corresponding to bias term> + vector of all features]`, Output: `predicted target`
	2. Setup: goal = find a plane which minimizes different between predicted and actual labels. Loss = sum(difference of all samples)![[Screenshot 2025-09-17 at 3.52.04 PM.png]]
			Note: squaring the distances to act as an absolute value (squared is differentiable and abs isn't!)
	3. Solving: 
		1. Convert the equation to linear algebra. (y-Xw) is the difference between target and predicted (and square bc $X^TX$= $L2||x||$) ![[Screenshot 2025-09-17 at 3.55.46 PM.png]]
			where: ![[Screenshot 2025-09-17 at 3.57.35 PM.png]]
		2. Solve
			1. expand out the equation and take the derivative ![[Screenshot 2025-09-17 at 4.12.12 PM.png]]
			2. use the derivative to find the minimum of RSS(w)![[Screenshot 2025-09-17 at 4.15.16 PM.png]]
			3. Show that this is a global minimum: Prove that this is a convex optimization problem
				- Compute the Hessian (2nd order derivation)![[Screenshot 2025-09-22 at 4.11.39 PM.png]]
				- Show Hessian is semi-definite![[Screenshot 2025-09-22 at 4.17.05 PM.png]]
			We now know the perfect weights! Closed-form solution (ie. we solved the problem exactly!)
#### Linear Regression Example (Approximate Solution)
Computational complexity of closed-form solution is O((D + 1)^3). Use [[Stochastic Gradient Descent]] instead!
- Remember that we want to minimize Residual Square Sum (L2 Norm)![[Screenshot 2025-09-24 at 4.22.52 PM.png]]
- Find gradient vector (using all samples) ![[Screenshot 2025-09-24 at 4.23.58 PM.png]]
- Perform Gradient Descent (Compute the following over and over)![[Screenshot 2025-09-24 at 4.25.02 PM.png]]
# Questions
1. doesnt (x)(matrix)(x^t) mean something important? 
2. is RSS the same as L2
3. [[Sum of Squares Optimization]]
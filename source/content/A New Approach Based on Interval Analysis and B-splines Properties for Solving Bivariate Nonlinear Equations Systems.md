Use B-Spline functions and Interval-Newton’s method to solve nonlinear equations (nonlinear equations are things like curves or polynomials and solving them means finding all of their zeroes)
# Background
1. Model a nonlinear function f as a spline (makes it easy to compute bounds for f and all derivatives of f)
2. Recursive Bisection: start with a given domain and partition the domain into smaller subdomains (here, the domain will be the convex hull of the B-Spline's control points)
3. Interval Newton's Method: 
# Useful Things
1. B-Spline Properties:
	- 
2. B-splines have properties that make them particularly well-suited for interval arithmetic:
	- For any point in the domain, the B-spline value is a convex linear combination of its coefficients
	- The graph of a B-spline function lies entirely within the convex hull of its coefficients
		- This means ranges of B-splines and their derivatives can be calculated with low computational cost
3. For interval analysis on multivariate B-splines specifically:
	- The Jacobian matrix is also a spline function contained in the convex hull of its B-spline coefficients, making interval computations more tractable
	- When the interval Jacobian matrix is not invertible, the algorithm falls back to recursive bisection
	- Uses Gauss-Jordan elimination with total pivoting for inverting interval matrices
# Takeaway 
This paper tells us how to efficiently find the 0s of a spline 
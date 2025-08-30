### B-Spline Curve Background
- B-Spline Curve
	- Piecewise: made up of many different segments
	- Knots (aka Internal Knots): points along curve where the sections meet and connect (usually they fall very close to control points)
		- Knot Vector: stores the locations of where the sections meet and connect![[Screenshot 2024-09-15 at 11.17.13 PM.png]]
			1. Uniform (Make up a Uniform B-spline): the sections are all the same length (knots are evenly spaced)
			2. Open Uniform: 
	- Control Points (aka Grid Points): determines the shape of the B-spline curve b/c curve may not intersect these points (these are the data points the curve is trying it's best to estimate)
		Note: each control point (data point) is associated with a basis function (all polynomial functions for that segment)![[Screenshot 2024-09-15 at 11.18.54 PM.png]]
	- Basis Function: the polynomial functions that get summed up in each section
	- Control Polyline: the "curve" you get when you draw straight lines between all control points
	- Properties: 
		1. Moving control points: changes shape of the curve
			- Changing one control point (k) only effects the shape of the curve from the k-1 control point to k+1 control point![[Screenshot 2024-09-16 at 12.10.10 AM.png]]
			- Transforming: this means you can do any transformation you want to the control points and the resulting curve will still come out correct (much easier to transform points than curve)
		2. Multiple control points on top of each other: Sticking two control points on top of each other causes curve to pass closer to them 
		3. Increase the order of the basis functions: Makes the curve smoother (but also means the curve moves further from matching the control points)
		4. No straight line intersects a B-spline curve more times than it intersects the curve's control polyline
		5. The convex hull of all control points bounds B-Splines
- Building a B-Spline:
	1. Start with our list of knots. Add a "scaffolding" knot on either side of the list
	2. Use this list of knots to define 0th degree B-Splines between each knot (ie. draw straight lines between each knot). Below is one segment![[Screenshot 2024-10-16 at 12.53.18 AM.png]]![[Screenshot 2024-10-16 at 12.57.24 AM.png]]
			Note: $B_{j, k}$ defines the B-Spline centered at knot j of degree k (0 in this case)
	2. Use two 0th degree B-Splines to make one 1st degree B-Spline
	Taking the 1st Derivative: ![[Screenshot 2024-10-29 at 11.30.14 PM.png]]
- Convex Hull: intersection of all sets containing the data points![[Screenshot 2024-09-15 at 11.21.50 PM.png]]
### KAN Background
Any multivariable continuous function can be represented by adding up a bunch of continuous functions of a single variable (Kolmogorov-Arnold Representation Theorem). A network could be designed to learn these single variable functions (B-Splines) and how they add together
- Full Network: ![[Screenshot 2024-09-15 at 11.32.59 PM.png]]
	-  ϕ are single variable functions (B-Splines) learned during training, Φ final step that combines them all
	1. Single Layer: Send all data stored in layer $l$ into layer $l+1$ by sending it through the 3 single variable functions ($ϕ_{l,i,j}$) and adding up the result ![[Screenshot 2024-09-15 at 11.35.45 PM.png]]
	2. Combination of Layers: ![[Screenshot 2024-09-15 at 11.39.17 PM.png]]
- Training
	1. Start with a "coarse grid" (use less grid points for B-Splines) and then increase them over time (called grid refinement)
	2. Add more grid points (and initialize the basis function of these new smaller polynomials to be similar to the larger polynomial) 
		- Note: Least Squares Optimization used to match smaller polynomials to larger
	3. Simplify the Network
		- Sparsification and Pruning: add a penalty to the loss function based on how much a neuron is contributing to the final output (cut ones that don't contribute as much)
		- Symbolification: replace learned single variable functions with known equations. You need to identify functions (sin, exp...) that can approximate the learned B-Splines
- Properties
	1. Grid Extension: add more grid points (control points) to each B-Spline so the network can handle more complex data
### Brainstorming
1. For verification KANs are better because you can look at every neuron and know exactly how it's contributing to the final output (same with MLPs but with MLPs there are just so many more and so many more paths you could take). This would mean ==interval-based verification== is much more feasible because the interval won't grow so quickly. Interval-Based Verification seems the most promising to me
	- Neural Specification Angle: the drawback with Interval-Based Verification is that the we need to specify exactly what the right answer is for the inputs. A way to do Neural Specifications with KANs is exact same as MLP (not really great)
	- Paul Christiano Angle: Interval-Based Verification won't feasibly be able to verify the space of all inputs ever (especially when getting into time series) so check the neural activations instead. Specifically, add enough heuristic arguments about the KAN until you get a good model of its behavior and then you can see when one of the heuristic arguments breaks down. The special thing about using a KAN vs an MLP is that composition of certain functions can be your arguments. (So you can have an equation for one sub-circuit and an equation for another sub-circuit and then a function that talks about how they're connected). But then wouldn't the KAN itself just be the heuristic argument (because the point of the heuristic argument is to cut down the network until we get a general enough explanation to cover the space of all inputs)
[[Introduction to Interval Analysis]]
[[Julia Coding Language]]
[[A New Approach Based on Interval Analysis and B-splines Properties for Solving Bivariate Nonlinear Equations Systems]]
[[THE PROOF OF KOLMOGOROV-ARNOLD MAY ILLUMINATE NN LEARNING]]
[[An Introduction to Affine Arithmetic]]
[[The Fundamental Limits of Interval Arithmetic for Neural Networks (2021)]]
#main


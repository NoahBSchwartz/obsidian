Most important because we can encode a full NN as a system of constraints and then solve the whole system to get much tighter bounds on the input than is possible with interval arithmetic
- (Linear) Integer Programming: the answer to the problem must be an integer (not a float)
- Mixed Integer Programming: some but not all variables in problem are restricted to being integers
# Applications
- Solving the Knapsack Problem (See [[Dynamic Programming]]): each item has a value and we must output an integer 0 or 1 if taking the item will push us over the edge or is suggested (can also solve the scheduling problem)
- Solving the Traveling Salesman Problem: salesman must visit every city exactly once and return home at minimal cost (each path between cities cost something)
	- Problem Setup: ![[Screenshot 2025-01-11 130733.png]]
# Formulating Integer Programs
Find a way to make the variables in the problem into integers
- Booleans: whenever a variable can take on at most 2 values
	- Encode Conditions: turn an if/then condition into a 0 or 1
	- Encode Outcomes: turn a go/no-go decision into a 0 or 1
	Note: booleans and summations pair really nicely (ie. if $x_{ij}$ can only be on for one item and $w$ is a list of all item's weights, then $\sum w \cdot x_{ij}$ is the weight of item $ij$)
- Inequalities: use slack variables to make into equalities![[Screenshot 2025-01-15 at 10.42.45 AM.png]]
- Normal Constraints (ie. one variable can't be more than a certain value, 2 variables can't be on at once)
	- Encode one Constraint: create a new variable y which can be 0 or 1 and subtract (y * some large value) from the variable being constrained.
		Then if y is 1, the constraint is guaranteed to be satisfied
		If y is 0, the constraint will only be satisfied if the actual variable can satisfy it by itself![[Screenshot 2025-01-11 132234.png]]
	- Encode 2 Constraints with an OR: for if we must either satisfy 1 OR the other constraint![[Screenshot 2025-01-11 132434.png]]
	- Encode Multiple Constraints (flexibly): if we have a group of $p$ constraints and $k$ of them must be satisfied![[Screenshot 2025-01-11 133135.png]]
	- Encode Multiple Constraints (inflexibly): below we have GROUP 1 SATISFIED or GROUP 2 SATISFIED or GROUP 3 SATISFIED![[Screenshot 2025-01-11 133803.png]]
- Non-Linear Constraints
	- Piecewise Linear Representation: (ie. what if we need to find the optimal cost of a material but the cost goes from 5 to 1 to 3 million dollars per 1000 items)![[Screenshot 2025-01-11 135651.png]]
		But we need to make sure that 2 values can't be activated at once (ie. the material can't cost 1 and 3 million dollars). We do this by adding in a couple booleans (see Encoding Normal Constraints)
	- Piecewise Linear Approximation: if we need to approximate nonlinear functions, draw linear segments joining selected points on the curve (the more points we choose the better the approximation)
# Solving Integer Programs 
The technique you use to solve an integer problem depends on the structure of the problem
Example: max(z) = $5x_1 + 8x_2$ with constraints ![[Pasted image 20250111213538.png]]
	Note: if we just tried to optimize this and then round to answer to the nearest integer we would violate bounds so we have to use Integer Linear Programming
1. Enumeration Techniques 
	- Branch and Bound (Divide and Conquer): divide the space of possible solutions (feasible region) up into parts and then solve each part
		- For an Integer Maximization Problem:
				a. The solution to a normal Linear Programming Problem (involving floats) will be the upper-bound 
				b. Any integer that works as the solution for the Linear Programming Problem will be the lower-bound
			 We use these 2 facts. First find the max value for the problem (z = 41.25) and round down to the nearest integer (z = 41 which is our upper-bound), look at the values of the variables we had to use to get this value ($x_1 = 2.25, x_2 = 3.75$), these must be integers so we can divide the search space up ($x_2 <= 3$ or $x_2 >= 4$)
			 Now just continue, treating each subproblem as a new Linear Programming Problem into we get to a problem that is infeasible and we end the branch of our tree. ![[Screenshot 2025-01-12 at 7.15.05 PM 1.png]]
		- For a Mixed-Integer Maximization Problem: follow the same procedure but only the integer variables can be used to generate subdivisions
		- Maximizing Efficiency: every time we divide the problem we add a new constraint which means the subproblem is faster to solve (and remember to add an extra slack variable if using an inequality). We can also keep track of our optimal value of z and immediately throw out branches which have a lower value.
	- Implicit Enumeration: for integer programs with only binary variables. Requires no linear programming solution
		We could just solve this by listing out all combinations of the variables, but it's much more efficient to use branch and bound to consider just the best combos
		- Constraints: to create branches choose some variables to be 0 or 1, and then the rest are our new maximization problem
2. Cutting Plane Techniques: start with a linear programming solution and modify it (by adding new constraints) until we find the integer solution (not as efficient as branch and bound on most tasks)
3. Group-Theoretic Techniques
# Application to KANS
We want to make each B-Spline of the KAN into constraints for a Mixed Integer Model. Then we'll have our overall model of tons of constraints and go about solving it
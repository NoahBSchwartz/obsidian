Used for optimization problem where you have a metric to minimize or maximize. Build a solution incrementally, at each state you make myopic choice looking for local optimum(short-sighted choice)
- Background:
	- Minimum/Maximum: gives global solution
	- Minimal/Maximal: could give local solution
- In Order For Greedy Choice to Work a Problem Must Have:
	- Greedy Choice Property: there is a solution that starts with only picking a greedy choice
		Note: there's no backtracking, each choice is final
	- Optimal Subproblem/ Property: an optimal global solution contains the optimal solutions of all its subproblems.
		- Ex. The shortest path from A->B->C->D must contain the shortest path from A->C, A->B, C->D...
		- Exchange Argument: You can combine proof by contradiction with optimization by saying if path for one of the steps isn't shortest we'll just replace it
- Proving Greedy Algorithms
	- Exchange Arguments: given a solution, prove that it's the correct answer (by showing the solution is a global maximum)
		- Do this by slowly building up a solution, showing that the solution will never become less correct, only the same or better
		- If we have a solution but a more optimal one exists, if we're able to swap elements from our greedy solution into the optimal one and it still remains optimal, the greedy solution has been proven to be best (used if multiple numbers could work for solution)
	- Racing Arguments: show that the greedy solution is always "ahead" of other solutions
		- Ex. Given list of numbers choose 3 to maximize sum? (this works because of optimal subproblem)
			1. Base Case: the algorithm will choose the maximum element (which maximizes the sum because using set of size 1)
			2. Inductive Hypothesis: assume that the greedy algorithm solves the problem optimally on subset size k
			3. Inductive Step: adding the max element to this subset will give the optimally large sum
Ex. Interval Scheduling Problem: time blocks can't overlap, schedule to get the max amount of blocks in a day?
1. To turn this into a problem that works with greedy choice, pick the blocks that end the soonest (so you have more time to schedule more)
2. Prove with Exchange Arguments (uses loop invariance/induction): we need to show that algorithm gives max sized set of schedule blocks
	- LI: At the start of each iteration $i$, set $S$ contains the max-sized non-overlapping set of $I[0, ... i-1]$ ($I$ is the set of all combinations)
	- Initialization: Before we start the loop, set $S$ is empty so the Loop Invariant Holds ($S$ = the max-sized set of 0)
	- Maintenance: At the start of $i = k$, assume LI holds (ie. $S =$ solution for $I[0...k-1]$). Then for $i=k+1$, the algorithm will add the element $i$ to $I[0...k-1]$ if it doesn't overlap (or if it does overlap but has lesser end time, exchange it). Thus, |new set S'| >= |S| 
		- This works because we're showing that we can never do worse at step $k+1$, only the same or better
	- Termination: $S$ is the max sized non-overlapping subset of $I[0, ... n-1]$
See [[Huffman Encoding]]

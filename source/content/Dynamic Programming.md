Break up problem into series of overlapping problems and solve each one (planning over time). Things like reinforcement learning, path planning, and control are dynamic programming (smarts at the cost of complexity (usually exponential time complexity))
- Steps: find the overlapping subproblems you need to solve, write a recurrence (optimal substructure property), recursively solve subproblems, store the results of subproblems, reconstruct the optimal solution from the stored info
	1. Optimal Substructure:  to identify you define the value of an optimal solution to a problem in terms of optimal solution to overlapping subproblems
	2. 3 Different Implementations
		1. Recursive: just implement recurrence relation as-is in code (extremely slow because solves same problems again) O(2^n)
		2. Top Down: Memorization (time-memory tradeoff): Cache results of each subproblem (so that you don't have to recompute subproblems each time). (every subproblem only solved once) O(nlogn)
		3. Bottom Up: solve small problems and use them to build up bigger solution. (every subproblem only solved once) O(nlogn)
			- For all answers to our small problems, we take the larger of the 2 solutions 
	3. Backtrack to find the optimal solution with optimal values
	4. Complexity is proportional to number of distinct subproblems
- Ex. Weighted Interval Scheduling (each interval has a number amount, how do we get highest sum of values?)
	1. Label jobs by finishing time, For each job j find the job that is before it and compatible (no overlap) and that has the latest possible finishing time
		 - Case 1: If a job j is in optimal solution then `full solution includes j`
		 - Case 2: If a job j is not in optimal solution then `full solution includes optimal_solution(1,2,...,j-1)`![[Screenshot 2024-10-15 at 10.33.01 AM.png]]
	2. Combine: go through all subproblems (with optimal solutions) and for each pair, take the maximum of 2 optimal solutions
- Ex. Given a Directed Acyllic Graph `G = (V, E)` and a pair of nodes `i`, `j` how many paths are there from `i` to `j`?
	1. Optimal Substructure: Every path to j must pass through j's neighbors $X_{i, j} = \sum_{l \in s(j)} X_{i, l}$ 
	2. Memorizing Path Counts: Look at all paths through j's neighbors and through their neighbors and through their neighbors...
	3. Combining: add up path counts
- Ex. Given n items and a knapsack which has a weight capacity W, each item has it's own weight $w_i$ and value $v_i$, pack the bag to maximize total value
	1. Identify Subproblem: maximum-profit subset of items 1,..., i with weight limit w (there are 2 parameters here)
		- Identify Optimal Value Subproblem: find the optimal when you have the number of items and capacity of the knapsack
			Case 1: Algo does not select item i. Therefore, Algo must select best of {1, 2, ..., i - 1} using weight limit w
			Case 2: Algo selects item i. Collect value $v_i$. The new weight limit is $w-w_i$. The Aglo selects best of {1, 2, ..., i - 1} using the new weight limit
			Note: these 2 cases are the Optimal Substructure Property. Write as recurrence relation:![[Screenshot 2024-10-28 at 4.24.30 PM 1.png]]
	2. Choose Recurrence Implementation: Recursive worse than Top Down worse than Bottom Up. We'll use Bottom Up:![[Screenshot 2024-10-29 at 10.05.28 AM.png]]
	3. Complexity: the complexity is proportional to the number of subproblems (because the time it takes to solve each subproblem is constant). To solve the knapsack problem, $\Theta(n W)$ time and $\Theta(n W)$ space
	4. Runtime: Calculate optimal value to problem, then backtrack to find optimal values of subproblems
More Examples:
![[Screenshot 2024-10-30 at 4.04.41 PM.png]]
# Sequence Alignment
Given a sequence of symbols from a library (reference set) of sequences. Goal is to find set of operations to go from 1 string to another that costs the minimum amount
- Edit Operations
	1. No-Op: Leave symbol unchanged (cost 0)
	2. Substitution (sub): replace symbol with some other symbol at the same position (so -> do) (cost 1)
	3. Insertion and Deletion (indel): (grand -> grande) (cost 1)
	4. Transposition or swoperation: take two consecutive symbols and swap them (cost anything between 1-3)
- Edit Distance: number of operations required to transform x into y
Solve Dynamically: goal is to find minimum cost of aligning 2 strings (1st is length i and 2nd is length j)
1. Optimal Substructure: 
	Cases: last operation is sub on (i-1, j-1), last operation is indel on (i, j-1), last operation is indel on (i-1, j), last operation is swoperation on    (i-2, j-2)![[Screenshot 2024-11-05 at 10.00.06 AM.png]]
2. Complexity is proportional to number of distinct subproblems
3. Proof: correctness comes from optimal substructure, can trace back to extract optimal alignment itself, number of subproblems mn, size of table mn
See [[Hash Table]]
1. P = Solvable in polynomial time (it is believed that P is a subset of NP but no proof). Running time grows polynomially with size of input n
2. NP = If answer is yes then we can verify solution in polynomial time but can't solve problem (ie. solved in polynomial time using non-deterministic Turing machine)
	- NP-Hard: A problem where if you solve it in polynomial time then it means all problems in NP can be solved in polynomial time (P = NP)
	- NP-Complete: both NP-Hard and a member of NP
3. co-NP: If answer is No then we can verify the counterexample in polynomial time (should be harder than NP because we have to show no possible solution)
P ⊆ NP, P ⊆ co-NP (Believed but Not Proven: P = NP, NP = co-NP)
# Solvable Problems
Polynomial-time algorithms (ie. shortest path, linear programming, factoring, matching...) are solvable problems (can't say same thing for NP)
1. To determine solvable problems we need to classify them into P and NP
2. Polynomial Time Reduction: Problem X reduces to problem Y (X $≤_p$ Y) if solving Y fast (in P) lets you solve X fast. AKA X can be solved using:
	(A polynomial number of standard computational steps) + (A Polynomial number of calls to an oracle that solves problem Y)![[Screenshot 2024-12-03 at 9.52.26 AM.png]]
		Note: you can use a polynomial time reduction even for NP-Hard problems (it just relies on the oracle)
- Decision Problem (does solution exist) $≤_p$Search Problem (find solution >= threshold) $≤_p$ Optimization Problem (find best solution)
	Note: If you know how to solve search problem you can solve optimization problem by decreasing threshold
	Note: If you know how to solve decision problem then you can solve search problem. This means:![[Screenshot 2024-12-03 at 10.06.49 AM.png]]
	Ex. Find the complexity class of this problem: "Given strings (A, B), find minimum value of edit operations to convert string A into string?"
		1. Reformulate Optimization problem as Decision problem: given strings (A, B) and integer k, can string A be converted into string B with edit operations costing at most k?
		2. We can compute the minimum number of 
Using dynamic programming, we can compute the minimum number of edit operations to convert A to B in time  
O(mn), where A is of length m and B of length n. We compute Opt(m, n) in polynomial time and return 1 if  
Opt(m, n) ≤ k and 0 otherwise. Hence, Sequence Alignment ∈ P.
Ex. Vertex-Cover: can you find less than 5 vertices in a graph such that all edges connect to a vertex?
	1. Known Problem: Independent Set (can you find >= 5 vertices in a graph such that all edges connect to a vertex ONCE?)
	2. Polynomial Time Reduction: ![[Screenshot 2024-12-03 at 10.26.37 AM.png]]
Note: If you want to prove A is P if B is P then use A $≤_p$ B. If you want to prove A is NP if B is NP then use B $≤_p$ A
# Boolean Satisfiability (Famous NP-Complete Problem)
We reduce as much as we can to boolean satisfiability because it's NP-Complete
- Definitions:
	- Literal: A boolean variable ($x_1$ or !$x_1$), Clause: disjunction of literals (ie. $x_1$ V $x_2$ V $x_3$), Conjunctive Normal Form (CNF): conjunction of clauses
	- SAT: Given a CNF (conjunction of clauses) can we set the boolean variables to make the problem true?
- 3-SAT: SAT where each clause contains exactly 3 literals ![[Screenshot 2024-12-03 at 10.42.43 AM.png]]
	- Hypothesis: there's no polynomial-time algorithm for 3-SAT (equivalent to P != NP)
	- Properties: 
		- 3-SAT $≤_p$ INDEPENDENT-SET $\equiv_p$ VERTEX-COVER $≤_p$ SET-COVER (we can create a graph from 3-SAT problem by creating one node for each literal and connecting them into triangles to form clauses)
		- Proving that there is no solution to 3-SAT is in co-NP
# Solving NP-Hard Problems
You must sacrifice 1 out of the 3: solving arbitrary instances of problem, solving problem optimally, or solving problem in polynomial time
1. $\rho$-approximation algorithm: guaranteed to run in polynomial time, guaranteed to solve arbitrary instances of the problem, guaranteed to find solution within ratio  $\rho$ of true optimum 
	Ex. NP Hard Problem: Load Balancing: we have m identical machines, n jobs, each job j has processing time $t_j$, machine can process one job at a time
		Load: the combined processing time of all machines, Makespan: max load on any machine 
		1. We can come up with a greedy algorithm to assign jobs to minimize makespan
		2. Now Prove that Greedy Algorithm is a $\rho$-approximation (we'll use 2-approximation):
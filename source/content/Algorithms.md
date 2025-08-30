- Algorithm: A step-by-step procedure for solving a problem![[Screenshot 2024-08-27 at 10.21.47 AM.png]]
	- Example of an Algorithm: given two n-digit numbers, multiply them together 
		- Number of States = `n^2`
	1. Algorithmic Paradigms (tools for algorithm design): 
		- [[Divide and Conquer Algorithms]] (divide into smaller and smaller problems until you can solve them) ([[Recursive Algorithms]])
		- [[Greedy Algorithm]] (simple narrow choice at each step)
		- [[Dynamic Programming]] (complex choice at each step)
	1. Fundamental Algorithm (for specific problems): Sorting, Routing, Searching, Scheduling
	2. Analysis of Algorithms (for after algorithm is written): 
		- Correctness (aka induction or x-loop invariance)
		- Complexity (aka resource efficiency, we use recurrence for this). Complexity Classes: P, NP, NP-Complete
		- Worst-Case Complexity (max complexity over all instances of algorithm)
		- Typical-Case Complexity (average)
		- Asymptotic Analysis (when the input size goes to infinity)
	- Example of Analysis:
		- Sorting Algorithm: Input: sequence of n numbers $<a_1, a_2, ..., a_n>$, Output: reordering  $<a'_1, a'_2, ..., a'_n>$ with elements ascending
		1. Possible Algorithms: Bubble Sort (swap high and low `#s`), Merge Sort (divide and conquer), Binary Sort, Quick Sort, Insertion Sort
		2. Insertion Sort Runtime: Go element by element, See if 2nd element < 1st, See if 3rd element < 1st 2nd, 4th < 1st 2nd 3rd...
		3. Evaluate Correctness:
			- Method of [[Loop Invariance]] (Induction [[Discrete Notes]]/ [[Induction of Algorithms]]): First prove base case (holds for n = 1), Then make inductive assumption (holds for n = k), Then prove induction (works for n = k + 1)
		4. Evaluate [[Complexity]] (efficiency of algorithm)
 - Program: implements an algorithm
[[Graphs]]
#main 
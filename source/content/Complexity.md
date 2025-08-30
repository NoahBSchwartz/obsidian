Estimate the efficiency of an algorithm (resource usage)
1. Model of Computation: models resources usage and costs during runtime (ie. Turing Machine, Circuit Model)
	- Random Access Machine (RAM): close to most off-shelf computers; Uses:
		1. Atomic/Primitive Operations: take only 1 unit of time O(1) (ie. `+`, `-`,`/`, `*`, if, call, store, write...)
			Atomic Data Types: take 1 unit of space and 1 unit of time to access (ie. integer, character, numbers...)
		2. Higher-Order Operations: composed of many atomic operations (ie. loops, subroutines (like sorting algos)...)
			Higher-Order Data Types: composed of many atomic data-types (ie. array, string, tree...)
		- Complexity of an Algorithm: running time/ space as a function of problem size (size of input)
			- Running Time: # of atomic operations executed,    Space Complexity: # of atomic data types
2. Asymptotic Analysis: the scaling of complexity as the problem size goes to infinity. Super easy tool to use, get to just remove all constants and look at how many loops there are 
	- ==Asymptotic Bounds via Limit Comparison Test: how to prove properties of complexity classes==
		- ==Examples: $\Theta$(Polynomials) = , Logarithms, Logarithm, Exponentials, Factorials (write down stirling's formual)![[IMG_2640.jpg]]==
3. Running Time:
	1. Constant Time: Running time is $O(c)$ (Ex. Conditional branch, arithmetic operation, initialize variable)
	3. Logarithmic Time: Running time is $O(log(n))$ (Ex. Binary search) Happens when for every step you cut search space in half
	4. Linearithmic time: Running time $O(n \cdot log(n))$ Best possible complexity for sorting algorithm (Ex. Mergesort (rearrange array in asc order by merging 2 subarrays into one over and over))
	5. Polynomial Time: Running time is $O(n^k)$ for $k > 0$ (Ex. given a graph find k nodes such that no 2 are joined by an edge)
		1. Linear Time: Running time is $O(n)$ (Ex. Merge 2 sorted lists)
			- Ex. Largest Empty Interval: Given sorted list, what is the largest difference between elements (think timestamp comparison). You just go through the list and compare elements 
		2. Quadratic Time: Running time is $O(n^2)$ (Ex. Bubble sort, Insertion Sort)
		3. Cubic Time: Running time is $O(n^3)$ (Ex. Given array of n distinct integers, find three that sum to 0. If you brute force this it's $O(n^3)$)
	6. Exponential Time: Running time is $O(2^{n^k}$) for $k > 0$ (Ex. Given a graph find independent set with max number of nodes)
		- Independent Set: all nodes in the graph only connect to each other once
	Combining Complexities: ![[Screenshot 2024-09-12 at 10.18.17 AM.png]]
4. [[Complexity Classes (P vs NP)]]
	- Worse-Case Complexity (maximum running time), Average-Case Complexity, Typical-Case Complexity 
	1. Big O Notation (Upper Bound): as algorithm goes to infinity, find an upper bound where if multiplied by a constant it will always be above the complexity of the algorithm (ex. $f(n)= 32n^2 + 17n + 1$  ---> $O(n^2)$ or $O(n^3)$ or $O(n^4)$...)
		==- Properties: Reflexive ($f=O(f)$), Multiplication ($f = O(n), a = O(n), fa = O(n^2)$), Addition, Transitivity (if $f$ is $O(g)$ and $g$ is $O(h)$ then $f$ is $O(h)$)
	2. Big Omega Notation (Lower Bound): find a function that will always be below algorithm's efficiency as we go to infinity (ex. $f(n)= 32n^2 + 17n + 1$  ---> $O(n^2)$ or $O(n)$)
		- ==Properties: all the same as Big O except addition is
		- Vacuous Statement: Any compare-based sorting algorithm requires at least O(n log n) compares in the worst case.
		- Typical Usage: Any compare-based sorting algorithm requires Ω(n log n) compares in the worst case.
	3. Big Theta Notation (Tight Bound):  find a function that is between Big O and Big Omega as we go to infinity (ex. $f(n)= 32n^2 + 17n + 1$  ---> $O(n^2)$ but not $O(n)$ or $O(n^3)$). 
		- Properties: all the same as Big O except addition is $\theta(g) + \theta(x) = \theta ($max{$g, x$})
	- Properties: $f(n)$ = $\Omega(g(n))$ iff $g(n)$ = $O(f(n))$
	- Different Functions We Can Use (fastest -> slowest): $O(1) << log(n) << O(n) << O(n^2) << O(n^3) << O(2^n)$
		- Note: example of $O(2^n)$ is bogo sort (known as exponential time, the rest are polynomial time)
	Ex. Estimate Complexity of Insertion Sort: Insertion Sort (A)![[Screenshot 2024-09-10 at 9.51.10 AM.png]]
	- Note: $O(n^2)$ means we have to do at most $c \cdot n^2$ comparisons to sort
==Independent vs Dependent Nested Loops
=the slide that followed that one=
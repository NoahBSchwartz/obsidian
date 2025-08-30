Iterative: Using looping statements to repeat the same steps
Recursive: A function calls itself again and again till a base case is arrived at
You can usually interchange one or the other, but sometimes one seems to work better
# Recursive
How can we find the complexity of things like a divide and conquer algorithm or binary search?
- Unrolling Method 
	Ex. 1 ![[Screenshot 2024-10-01 at 9.57.10 AM.png]]
		Note: complexity is in terms of theta ($\theta(n)$) because we're using less than equal to
	Ex. 2![[Screenshot 2024-10-03 at 11.51.24 AM.png]]
- Tail Recursion): ![[IMG_2799 2.jpg]]
- Masters Method: ![[Screenshot 2024-10-15 at 10.05.04 AM.png]]
	Note: f(n) = cost of divide and combine, a = # of subproblems, n/b = size of subproblem
	Note: 1) n
Ex.![[Screenshot 2024-10-01 at 10.08.50 AM.png]]
Ex. ![[Screenshot 2024-10-01 at 10.37.58 AM.png]]
- Applications
	- Mergesort: divide a problem in half and sort both halves, then merge both halves (by putting their elements in the right spots in the final list). Complexity:![[Screenshot 2024-10-01 at 10.19.52 AM.png]]
		Note: base case = 0 so doesn't add any complexity, we have half list + half list + merge complexity 
		Note: we get complexity in terms of O because we're using an equals sign in recurrence relation
- Is Recurrence Tree Balanced? If you break problem into parts of equal size, tree will be balanced. If the parts are unequal the tree will be unbalanced
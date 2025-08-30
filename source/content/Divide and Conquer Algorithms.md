1Recursive Approach: Divide: Break down smaller problems into source problems. Conquer: if the small problem is trivial just solve it, otherwise divide it again. Combine: build solution to large problem from solutions to smaller problems
- Not A Greedy Algorithm: this algorithm is just trying to solve a problem, not minimize how long it takes
- Running Time: the recursive structure gives asymptotic running time T(n) = aT(n/b) + f(n)
	- a = number subproblems, n/b = size of subproblems, f(n) = time to divide and combine
# Mergesort
Ex. Constant Ratio Splits (Balance Split):
	Split array in half until you get to single elements, then merge all the way up
		Complexity = T(n/2) + T(n/2) + $\Theta(n)$ = nlog(n)
	Merge Sort but split into array of 4 and array of 8:
		Complexity = T(n/3) + T(2n/3) + $\Theta(n)$ = nlog(n) + $\Theta(n)$ = nlog(n)  ($\Theta(n)$ drops out as we go to infinity)
	Note: How do we know that T(n/2) + T(n/2) + $\Theta(n)$ = nlog(n)? If you follow the tree we get 
	$nlogn$ (dividing and combining) + $\Theta(n)$ solving trivial problems![[Screenshot 2024-10-03 at 10.13.05 AM.png]]
	[[Recursive Algorithms]]
Ex. Not Constant Split (Unbalanced Split):
	Merge Sort: split array into one array of 10 elements and one array of n-10 elements![[Screenshot 2024-10-03 at 10.32.21 AM.png]]![[Screenshot 2024-10-03 at 10.31.32 AM.png]]
	Note: for reference: this is complexity of splitting array into 1 elem and one array of n-1 elements![[Screenshot 2024-10-03 at 10.34.58 AM.png]]
	Ex. 3 Way Partition Complexity: ![[Screenshot 2024-10-03 at 10.33.31 AM.png]]
# Quicksort
Partition list into 3 arrays, find the right position for the pivot element, smaller or equal elements are on left of the pivot and larger are on right. Then do same thing with the left and right array (and leave pivot element in place). Combine by just putting the arrays together (retain order)
- Complexity: if you're super lucky and your pivot gives perfect split each time you get $n\log n$. If you're very unlucky and your pivot is always on far left you get $O(n^2)$
Ex. What if you pick 2 pivot elements at each step for a 5-way partition? 
	T(n) = T(n/3) + T(n/3) + T(n/3) + O(n) = nlog n in best case, O(n^2) worst case
	 3 subarray complexity + worst-case combining complexity
```
partition(A, P, r):
	x = A[r]
	i = p -r
	for (j = p; j <= r-1; j++):
		if A[j] <= x:
			i++
			exchange(A[i], A[j])
		exchange(A[i+1], A[r])
		return i + 1
```
Note: At the end, `i` holds the position of the pivot. It's incremented every time we add an element to the left of the pivot and we use it for our final task of each step to get pivot to the center 
- Correctness Analysis: At each iteration the array has 4 regions with x as the pivot
	- For region 1: elements <= x between location P and i
	- For region 2: elements > x between location i+1 and j-1
	- For region 3: unprocessed elements between locations j and r-1
	- For region 4: `x = A[r]`
	Loop Invariant:
	1. If P <= k <= 1/2 (smaller elements) then `A[k]` <= x
	2. If i+1 <= k <= j-1 (larger elements) then `A[k]` > x
	3. If k = r, then `A[k]` = x  (pivot elements)
	Initialization: To start regions 1 and 2 (smaller and larger elements) are empty
	Maintenance: Follow the algorithm
	Termination: Region 3 is empty, all elements are either in region 1 or region 2
- Complexity Analysis:
	- Space: In-Place sorting with O(1) "scratch" space
	- Running Time: divide + combine + conquer
		- Worst Case (Pivot is the end of the array) = $\Theta(n)$ + T(0) + T(n-1) = T(n-2) + $\Theta$(n-1) + $\Theta$(n) = $\Theta$(n^2)
		- Divide = $\Theta(n)$, Combine = automatically done, Conquer = T(n-1) worst case because you have to compare all elements
		- Best Case (Pivot is the center of the array) = T((n-1)/2) + T((n-1)/2) +  $\Theta$(n) = 2T(n/2) + $\Theta(n)$ = $\Theta(n\log n)$
		- Average Case Complexity:
			- Conceptual: Imagine going through the steps of a random case:
				1. T(n) = 2T(n/2)+$\Theta(n)$ at step 1 (best case position)
				2. T(n) = 2T(n/2 - 1)+$\Theta(n)$ at step 2 (worst case position)
				If you add all of these up (even if you just get best case 1 out of every 100 cases), it will add up to best case: $\Theta(n\log n)$
			- Mathematically (Method 1): Decouple behavior of algorithm from particular input: randomize the partitioning of the array (ie. randomly the pick the pivot by taking a random value in the array and moving it to the end for it to be used as the pivot later on)
				- Running Time determined by number of comparisons: $I_{ij} = 1$ if `a[j]` and `a[i]` are compared
					n = $E[I_{ij}]$ = $E([i, ...j])$ = $\sum_{}^{} P_{ij} \cdot cost$  ($P_{ij}$ is the probability `a[i]` and `a[j]` will be compared and $E[I_{ij}]$ is expected value which will give us complexity) See [[Random Variables]]
						Calculate $P_{ij}$: without loss of generality assume the input is already sorted (doesn't matter because we're randomly picking pivots). Use $z_{i}$ to denote element at position $i$. Then notice $z_{ij} = [z_i, ... z_j]$. 
							Note: In this case $P_{ij}$ is the probability that $z_i$ or $z_j$ will be picked as pivot
						Then $P_{ij} = z \cdot \frac{1}{j-i+1}$. The expected value $E[I_{ij}]$ =$\sum_{}^{} P_{ij} \cdot cost$ =$\sum_{}^{} \frac{z}{j-i+1} \cdot 1/2$. When solved this will give $O(n \log n)$
			- Mathematically (Method 2): $T(n) = T(m) + T(n-m-1) + \Theta(n)$   -----> $E(T(n)) = \sum_{m=0}^{n-1} 1/n \cdot (T(m) + T(n-m) + \Theta(n))$ 
				Solve to get $T(n) = \Theta(n \log n)$
				
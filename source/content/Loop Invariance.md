- Based on Induction:
	Example:  Consider a Sequence Defined by Recurrence where $T(1) = 1, T(2) = 2, T(n) = 3T(n-1)-2T(n-2)$ for $n > 3$. Show $T(n) = 2^n$?
	1. Base Case $(n = 1)$ -> $T(1) = 1 = 2^1$ So this is true
	2. Inductive Assumption:
		- (Weak): Assume $T(n) = 2^{n-1}$ holds for *any* $n \leq k$ for a given $k$
		- (Strong): Assume $T(n) = 2^{n-1}$ holds for *all* $n \leq k$ for a given $k$
	3. Then prove $T(k + 1)$ holds. i.e.,  $T(k + 1) = 3T(k)-2T(k-1) = 3 \cdot 2^{k-1}$
- Invariance: function is independent of it's input (ie. $f(n) = 4$)
	Example: ![[Screenshot 2024-09-03 at 9.54.18 AM.png]]
	Note:  we showed that $n - L(T_n)$ is independent of n at all n (invariant) and used this to prove
- Loop Invariance (LI): an instantiation of induction (used to prove correctness)
	- Goal: Prove property or set of properties hold at beginning of each iteration of for-loop
	Example: Prove Correctness of Insertion Sort (Insertion Sort = Go element by element, See if 2nd element < 1st, See if 3rd element < 1st 2nd, 4th < 1st 2nd 3rd...)
	0. Loop Invariant (LI) (desired conditions).
	   - At the beginning of each iteration $j$, the subarray $a[0, \dots, j-1]$ is sorted and contains the first $j$ elements of the original array.
	1. Initiation (Base Case): Show that the LI holds at the beginning of the first iteration.
	   - When $j = 1$, $a[0]$ is sorted and contains the first element of the original array.
	2. Maintenance (Inductive Step): Assume that if the LI holds at the beginning of an iteration, then it holds at the beginning of the next iteration.
	   - Suppose $a[0, k-1]$ is already sorted and contains the first $k$ elements for $j = k$. Then, after iteration $k$, the subarray $a[0, k]$ is sorted and contains the first $k+1$ elements.
	3. Termination: When the loop ends, the LI provides a useful property that we can use to show the correctness of the algorithm.
	   - The loop ends when $j = a.\text{length}$, and the subarray is $a[0, a.\text{length} - 1]$, which is sorted and contains the first $a.\text{length}$ elements.
	Note: See [[Induction of Algorithms]]
This may seem like an easy thing, but an operation in interval arithmetic can give a totally different value than normal arithmetic `(X * X != X^2)`
### Basic Definitions
Big takeaway:![[Screenshot 2024-09-25 at 12.59.51 AM.png]]
- Enclosure of x: an interval that x falls into
- Degenerate Intervals: if the endpoints equal each other (you can just think of this as a number)
- Interval Hull: A stand in for the union of 2 intervals (unions aren't expressed as intervals because if the 2 intervals don't overlap we're screwed) ![[Screenshot 2024-09-20 at 6.11.32 PM.png]]
- Partial Ordering: ex. `[0,4]` and `[3,20]` is a partial ordering
- Absolute Value of an Interval: maximum of the absolute values of the interval's endpoints
- Width (w(X)), Midpoint (m(X))![[Screenshot 2024-09-25 at 1.26.11 AM.png]]
- X < Y: the start of X < the end of Y (ie. X is positive means all values of X are above 0)
- Addition: add up each number in the interval with all of the numbers in another interval (all combos)
	- This has the cool side effect of letting functions work on intervals (where F(X) is just applying f(x) for all x in X)
	Ex. X + Y = `[Start of X + Start of Y, End of X + End of Y]`
- Subtraction: Ex. X - Y = `[Start of X - End of Y, End of X - Start of Y]`
	Note: observer the reversal of endpoints, this is because we're doing X + (-Y)
- Multiplication: ![[Screenshot 2024-09-25 at 1.05.24 AM.png]]
- Division:![[Screenshot 2024-09-25 at 1.06.58 AM.png]]![[Screenshot 2024-09-29 at 6.16.11 PM.png]]
Ex. `Y = [2, 3]` -> `-Y = [-3, -2]` (this is because intervals actually come from inequalities)
Ex. `X = [1, 5]` -> `X - X = [-4, 4]` (an interval centered at the origin, occurs because `x` could be anywhere in interval ie. we can't cancel X-X)

Takeaways: 
- Obvious: 
	- Interval arithmetic is commutative and associative
	- Follows 0 + X = X, 1 * X = X, 0 * X = 0
	- Cancellation works (X + Y = X + Z then Y = Z)
- Not Obvious: 
	- `X+(−X) = [start of X − end of X,end of X − start of X] =! 0` (gives interval centered at 0)
	- `X/X` isn't usually 1
	- Not distributive (at least for intervals, constants do work: x(X + Y) = xX + xY), but subdistributive![[Screenshot 2024-09-29 at 6.18.39 PM 1.png]]
		- Only distributive if intervals have the same sign![[Screenshot 2024-09-29 at 6.22.04 PM.png]]
	- Any If A⊆C and B⊆D then A ⊙ B ⊆ C ⊙ D (⊙ can be addition, subtraction, multiplication, or division)
### Complex Definitions
- N-dimensional interval vector: $(X_1,...,X_n)$
	- Properties: 
		1. If we have an interval vector of real numbers R and a vector of intervals I. I contains R if all elements of R are in I![[Screenshot 2024-09-25 at 1.12.56 AM 1.png]]
		2. The intersection of 2 interval vectors will be the empty set if the intersection of any of their elements is the empty set![[Screenshot 2024-09-25 at 1.21.13 AM.png]]
		3. The width of an interval vector is the largest of the widths of any of its component intervals. The midpoint of an interval vector X = (X1, . . . , Xn) is m(X) = (m(X1), . . . , m(Xn)). Norm is the max of the absolute values of all the vectors
		![[Screenshot 2024-09-25 at 1.28.40 AM.png]]
		4. Inner Product: $P = U_1V_1 +···+U_nV_n$  between two interval vectors $(U_1, . . . , U_n)$ and $(V_1, . . . , V_n)$
	
### Implementation
- Rounding Errors: normally people don't account for rounding errors, but we can with intervals
- Precision: how do you know how much precision is needed to get an answer? use intervals
- Working with inexact measurements: use intervals to still make sure everything's good
	- Outward Rounding: make sure to round outward so you don't cutoff result
- Code:
	- `intval(value)` makes sure no machine errors will be added into interval
### Useful to NNs
- Interval Valued Function: We want to know the precise range of values that f(x) spits out as x changes though the interval X ![[Screenshot 2024-09-30 at 1.14.35 AM.png]]
	- Set Mapping: you can think of a function as mapping from one set to another
	- United Extension: mapping a `family of subsets` of one set to a `family of subsets` of another set![[Screenshot 2024-09-30 at 1.23.58 AM.png]]
		Note g' is the united extension in the image above
	- Interval Dependency: if you're computing with the same interval in multiple spots you need to recognize that they are the same interval otherwise you will get a blowup of intervals
	- Monotonic Function: Either strictly increasing or decreasing so `f([start, end]) = [f[start], f[end]]` (ie. exponential, log). Make interval analysis especially easy. Ex. `exp(X) = [exp(X) , exp(X)]`, $X^y = [X^y ,X^y]$ (may slightly decrease problem of interval dependency)
	Ex. `X = [Start X, End X]`, apply `f(X) = {x^2 : x ∈ X}`![[Screenshot 2024-09-30 at 6.11.31 PM.png]]
		Note: the answer is `[-1, 1]` which contains the smaller correct interval `[0, 1]` (interval dependency)
- Interval Valued Extensions of Real Functions: in previous math, functions only operated on degenerate intervals `[x,x]`. But now we're having them operate on full intervals. We can think of this as an extension
	- Interval Extension: if the new function that works on intervals agrees with the old one `(F ([x, x]) = f (x))` (==AKA we dealt with the interval dependency!==, AKA United Extension)
		- Ex. $f(X)= [1−start X,1− end X]  = f (x) = 1 − x$ is an interval extension
		- Ex. for $f(x)=x(1−x), x ∈[0,1]$, we get either $F(X)=X·(1−X) = [0, 1], G(X) = X − X^2 = [−1, 1],$ or $H (X) = 1/4 − (X − 1/2)^2 = [0, 1/4]$
			Note: you can use the one that's narrowest and everything's all good (in fact H(X) is actually an interval extension)
- Multivariate Interval Functions: in all the addition, multiplication, etc... we were doing this but didn't know it (all of those operations were united extensions aka they didn't lose any specificity)
	- Interval Extension: $F(x_1,...,x_n) = f(x_1,...,x_n)$ 
	- United Extension: we dealt with the interval dependency
		- Inclusion Isotonic: if F works on a bunch of intervals than it should work on a bunch of subsets of those intervals. ie. If $F = F (X_1, . . . , X_n)$ then:![[Screenshot 2024-10-01 at 9.23.31 PM.png]]
			- ==Note: all functions that are United Extension (AKA no interval dependency) are Inclusion Isotonic and vice versa ==![[Screenshot 2024-10-01 at 9.35.43 PM.png]]
		- ==Rational Interval Functions: if our multivariable function can be decomposed into individual interval arithmetic operations than we are dealing with a United Extension==
			- ==Another Check: a rational interval function must arise as an extension of some real-valued function ie. 
				`F(X1,X2)=([1,2]X1 +[0,1])X2` extends `f(x1, x2) = (c1x1 + c2)x2`==
			- Example: `F(X1,X2)=([1,2]X1 +[0,1])X2` can be broken down into![[Screenshot 2024-10-01 at 9.32.38 PM.png]]
				where as: F (X) = m(X) + 1/2 (X − m(X)) is broken into ![[Screenshot 2024-10-01 at 9.33.50 PM.png]]
			 which is not an individual arithmetic operation
- Symmetric Intervals: if start point = end point (example `[−5, 5]`) 
	- Have slightly simpler rules: ![[Screenshot 2024-09-29 at 6.25.35 PM.png]]
		XY = |X|Y, X(Y + Z) = XY + XZ
### Interesting Notes
1. You can also apply interval analysis to problems where you want to see how varying one variable changes the other (just plug in an interval for the first one)
2. You can also apply interval analysis during runtime of a neural network to account for variable error that might occur (ie. you'll be predicting a range instead of just a single value)!
[[NN Verification Skimmed Papers]]
[[The Fundamental Limits of Interval Arithmetic for Neural Networks (2021)]]


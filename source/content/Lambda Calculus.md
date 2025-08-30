Simpler way of writing functions: f(x) = x^2  ->  λx.x2,    f(7, 2) = 7^2  ->  (λx.λy.x^y)(7, 2)
Note: Useful for theoretical CS because any turing complete program can be translated to lambda calculus and vice versa
![[Screenshot 2024-05-31 at 10.23.10 AM.png]]
- Bound Variables: λx.x, the variable 𝑥 is something that has no original meaning but is a placeholder
- Free Variables: λx.y, i.e. a function which always returns y whatever it takes, y is a free variable since it has an independent meaning by itself
- Reductions
	1. 𝛼 Equivalence: any bound variable is a placeholder so it can be replaced with a different variable (ie. λx.x and λy.y are 𝛼 equivalent.)
			Rule: For any expression 𝑀 and any y, if 𝑥 = y then all instances of x will be replaced by y
			Rule: For any expression 𝑀 and any y, if x and 𝑦 are not bound in M and y is not free in M then all instances of x will be replaced by y (this is logical if you just think about it for a minute)
	2. β Reduction: how to simplify abstractions (function acting on variables)      ie. (λx.x^2)7 = β​49,      (λx.x)(λy.y) = β(λy.y)
		- Just plug in the second expression into the first one (subbing it in for x), then remove the first λx (plugging a val into function makes the f(x) disappear)
				Ex. ![[Screenshot 2024-05-31 at 10.36.16 AM.png]]Ex. ![[Screenshot 2024-05-31 at 10.41.27 AM.png]]
		- Symbol for Making a Substitution: `M[N/x]` means sub out N for all free occurrences of x in M (ie. `x[N/x] = N`)
			- AKA: `(λx.M)N = βM[N/x]`
				Ex. ![[Screenshot 2024-05-31 at 11.11.41 AM.png]]
				Note: only free variables can. be substituted, not bound variables
	3. η Reduction: 
		- Based off: Principle of Extensionality: Two functions are identical if they do the same thing
- Operators:
	- Boolean: True = λx.λy.x, False = λx.λy.y
	- Not: (λb.b)(False True) -> Works because: 
Represent the probability distribution of variables over time. Then provide guaranteed bounds on the expectations, moments and probabilities of tail events. Specifically hard because both initial conditions and disturbance inputs are uncertain
# Background
Normally Rely on:
1. Monte Carlo (no gauruntees)
2. overly conservative linear approximations
# Implementation
1. Problem Setup: think of an airplane after a certain timespan t, need to quantify the range of positions the airplane could be at to make sure it has no possibility of crashing
2. "Interval Arithmetic For Probabilities": represent the state variables at time t as a function of the initial state variables and noise symbols
	1. Noise Symbols: We start w a bunch of random variables with distributions wᵢ
	2. We construct a polynomial from them p(w₁, ..., wₖ) 
	3. Polynomial Form:  (p(w₁, ..., wₖ)  + $I$)  ($I$ keeps track of the correlations between uncertainties)
3. Uncertainty Propagation: 
	1. Turn each initial state variable into a polynomial form
	2. Add terms to the polynomial at each step
4. Concentration of Measure Inequalities: prove rigorous bounds on the tail probabilities of these state variables
	1. Bounds on `E[h(x(t))]` using moment calculations over noise symbols
	2. Bounds on `P(h(x(t)) ≥ c)` using concentration inequalities: bound tail probabilities without computing intractable high-dimensional integrals. The KEY = decompose large polynomials into mutually independent components:
		1. Construct a graph where noise symbols are connected 
		2. Find connected components to partition noise symbols
		3. Split the polynomial into independent parts for efficient moment calculations
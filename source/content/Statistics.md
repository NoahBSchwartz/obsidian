### Introduction
- Experiment: procedure that repeats, Outcome: result of experiment, Sample Space (S): set of all outcomes, Event (E): subset of S
- Interpretations of Probabilities:
	1. Objective Interpretation: think of running experiment over and over, that's the probability that something happens
	2. Bayesian Interpretation: list out your beliefs and how much you believe them, that's the probability that something happens
- Axioms of Probability: 
	1. All Probabilities are between 0 and 1
	2. All outcomes must be from sample space
	3. `P(E or F) = P(E) + P(F) - P(E and F)` (as long as E and F don't depend on each other) (Note: `P(E and F)` so no double counts)
- Derivations: Complement $P(E') = 1 - P(E)$
- Joint Probability: If you want `P(E and F)` you make a table with the 4 possible overlaps. Fill in the 2 overlaps that you know and use the sums across columns to fill the rest in ![[Screenshot 2024-09-11 at 4.20.11 PM 2.png]]
		Note: `P(E, F)` means `P(E and F)`
	- Multiplication Rule: just rearrange the probability equation: `P(C|F) = P(C and F) / P(F)`
	- Law of Total Probability: `P(E) = P(E and F) + P(E and F')`
- Conditional Probability: P(the stuff after | given a condition)  = use the table
	- General Method For Solving Conditionals: Look at the first trial (the given condition)
		- If there's a clear answer (eg. die must be 6) use multiplication rule. If there's not a clear answer (eg. could be king or queen) list all the ways the first trial can go (Tree Diagram: depict each branch that could happen and the probability of these branches).
		- Ex. 
			- Method 1:![[Screenshot 2024-09-16 at 4.19.49 PM.png]]
			- Method 2: Bayes' Theorem![[Screenshot 2024-09-18 at 4.08.08 PM.png]]Ex.![[Screenshot 2024-09-16 at 4.22.02 PM.png]]
- Total Probability: just want to know the probability of something happening.
	- Law of Total Probability: ![[Screenshot 2024-09-16 at 4.24.34 PM.png]]
- ==Subjective Probabilities: what if we want to incorporate some piece of knowledge into probability calculation==
- Independent/Dependent:
	- Independent if: P(E | F) = P(E) and P(F | E) = P(F). You only need to find one counterexample to show dependence! (but most hold everywhere for independence)
		- Another eq you can use: Independent if P(E, F) = P(E)P(F)
	- Independence for a bunch of different variables
[[Random Variables]]
### Math
- Distribution: describes the frequency at which values occur (all values must be accounted for exactly once, and add up to 100). When graphing, try to graph by density of data points (so that everything sums to 1)
	- Significance: the area under a section of the distribution curve tells you the proportion of data points in that interval![[Screenshot 2024-09-09 at 3.56.03 PM.png]]
		1. Modes: local or global maximum (>1 = bimodal, >2 = multimodal)
		2. Skew: the majority of the data points may be towards 1 end or the other end (your mean gets pulled towards left = skew left)
		3. Mean: average, ==it's useful to us because it minimizes the distance to every data point (calculus problem)== 
		4. Interquartile Range: quantile 3 (75th percentile) - quantile 1 (25th percentile)
Ex. I have a coin that lands heads with an unknown probability p. Suppose I toss it 10 times and get the sequence TTTHTHHTTH. If you toss this coin 10 times, the chance you get the sequence is a function of p (called L(p))
1. L(p) = $((1-p)^6) \cdot (p^4)$
2. To find which p gives us the best chance of the sequence (called p-hat), graph all possible values. Here p-hat = 0.4![[Screenshot 2024-09-05 at 8.26.15 PM.png]]
	Note: To find p-hat mathematically, understand that the place where the function L(p) attains its maximum is the same as the value at which the function ln⁡(L(p)) attains its maximum. ==Really important because many probabilities are products and the natural log function `ln` function turns products into sums. It's much simpler to take derivatives of a sum==
	#main 
	[[Statistics Test Notes]]
	[[Python (Things to Remember)]]
	[[Numpy]]
	[[Pandas]]
	[[Sampling]]
	[[Model Building]]
	
	
	
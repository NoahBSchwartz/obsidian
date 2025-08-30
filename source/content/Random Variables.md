 fA random variable X is a real-valued function defined on a sample space. Used to summarize a bunch of different probability problems at once. Allows you to compute statistics that you can't normally
- If we draw a random sample of size n from a population, the random variable is the numerical function of the sample (value depends on how the sample came out)
	- Domain (Input): all random samples of size n
	- Range (output) aka Support: some subset of the domain
	Ex. Flip a coin 3 times, what is the probability of all outcomes?
#  Discrete Random Variables: 
A random variable is discrete if it can take on countably many values (it's like the integers or like number of people)
- Probability Mass Function: distribution of a discrete random variable (how the total prob is split over all possible values of X)
	- Note: in this case P(X <= 6) = 0.7, P(X = 7) = 0
- Probability Distribution: the probability at each value, sometimes you won't have this so you need to simulate the Empirical Distribution
- Showing independence:![[Screenshot 2024-09-25 at 3.51.08 PM.png]]
	Note: the roman numeral thing means multiply all terms together
- Descriptive Properties: Distribution Function, Distribution Table, Expectation (the average value of X), Variance (the spread of X)
	1. Expectation (aka Expected Value, Mean, Weighted Average): Add up all times you lose and all times you win to get expected value  (or if given probabilities, EV = (outcome 1 * probability) + (outcome 2 * probability) +...)![[Screenshot 2024-09-23 at 4.08.58 PM.png]]
		Ex. This is just adding up all values and the probability they occur![[Screenshot 2024-09-23 at 4.11.38 PM.png]]
		- Properties: ![[Screenshot 2024-09-25 at 3.45.09 PM.png]]
	2. Variance (aka Spread, 2nd Central Moment, Square of Random Deviation): measure of how spread out data is![[Screenshot 2024-09-23 at 4.21.20 PM.png]]![[Screenshot 2024-09-23 at 4.23.23 PM.png]]
		- Helpful Properties: Use below for manual, but don't forget that variance is just (value of datapoint 1 - Expected)^2(prob of dp1) + (dp2-expected)^2(prob) + ...![[Screenshot 2024-09-23 at 4.25.59 PM.png]]
	3. Standard Deviation: on average, how far are the data points from the mean (SD = 6 means we could range from -6 to 6)![[Screenshot 2024-09-25 at 3.55.02 PM.png]]
		- Chebyshev's Bounds: Says that 75% of data is contained in 2 standard deviations, 88% contained in 3, 94% in 4, 96% in 5
- Discrete Distributions:
	1. Bernoulli Distribution: a Bernoulli variable is a special random variable that just represents a binary outcome (ie. a coin flip done over and over)![[Screenshot 2024-09-25 at 4.18.48 PM.png]]
		- Note: because it's binary you can represent the probability mass function as a bar chart, equation, or table
	2. Binomial Distribution: ![[Screenshot 2024-09-25 at 4.23.31 PM 1.png]]![[Screenshot 2024-09-25 at 4.24.55 PM.png]]
		- (ie. a coin flip done 4 times, probability of number of tails given)![[Screenshot 2024-09-25 at 4.22.20 PM.png]]
			- get this by doing `stats.binom.pmf(k, 4, .25)`
	3. Multinomial Distribution (just like Binomial but with more): when your sampling with replacement from a categorical distribution ![[Screenshot 2024-10-16 at 4.15.49 PM.png]]![[Screenshot 2024-10-17 at 3.37.50 PM.png]]
			Ex. randomly sample 7 marbles out of bag of 100 with 60% blue, 30% green, 10% red). Probability that you get 4 blue, 2 green, and 1 red? Do number of possible orderings * probability of getting a specific ordering 
				Possible ordering = (total possible)! / (any repeats you might have)! ![[Screenshot 2024-10-17 at 3.28.55 PM.png]]
					Note:  ![[Screenshot 2024-10-17 at 3.33.44 PM.png]]
			Ex. ![[Screenshot 2024-10-17 at 3.35.45 PM.png]]
	-  Cumulative Distribution Function (F(a) = P(X <= a)): Let S be the random variable that denotes the number of successes in our sample. the probability that the number of successes in our sample is **at most** s (ie. if you could have 1-100 successes, what is prob that you get at most 50 successes)
		- To Solve: just sum up the probs of getting successes from 0-50
		Ex. In an election, supporters of Candidate C are in a minority. Only 45% of the voters in the population favor the candidate. Suppose a survey organization takes a sample of 200 voters at random with replacement from this population. What is the chance that a majority (more than half) of the sampled voters favor Candidate C.
			To Solve: just use the CDF like normal but answer is 1 - CDF (because we want to know prob of majority)
	- Probability Point Function: inverse of the CDF, returns the exact point where the probability of everything to the left is equal to x (ie. the percentile) `stats.norm.ppf(.05)` gives us the lower percentile cutoff for the 90th percentile (.05 on either side of the mean), `-stats.norm.ppf(.05)` gives us the upper percentile cutoff
# Continuous Random Variables
ex. what is the probability that your friend is 54.00292349 inches tall? Clearly there's an issue. We need to look at intervals instead
1. To make this work we need a new Distribution: a probability density distribution (ie. the height of the curve is no longer a probability it's a probability density)
	- To get the probability of a range, we now need to take the integral of the curve (find the area)
	- Note: Now the probability at a point P(X=c) = 0 because an integral at 1 point is 0
	- Still have to sum to 1 to be valid
2. Probability Density Function: instead of a probability mass function, we now have a density function
3. Continuous Variable: a variable is continuous if there is a probability density function for it
	1. Continuous Uniform Random Variable: ![[Screenshot 2024-09-30 at 4.07.57 PM.png]]
		Note: expectation and variance are calculated same as other things
	2. Continuous Exponential Random Variable: if you're looking at a time window that lasts until something occurs use exponential variable ![[Screenshot 2024-09-30 at 4.14.40 PM.png]]![[Screenshot 2024-09-30 at 4.15.11 PM.png]]
			Note: Lambda is # of avg successes / time
		- Ex.![[Screenshot 2024-09-30 at 4.26.42 PM.png]]
	3. Normal Random Variable:![[Screenshot 2024-10-02 at 3.53.28 PM.png]]
		Note: you don't have to do any work for normal random variables. Expectation and Variance are the arguments given 
		- Used so often because it's a curve that generalizes well (normal distribution fits the data as loosely as possible but has the same mean and variance as the data)![[Screenshot 2024-10-02 at 3.57.31 PM.png]]
		- PDF: ![[Screenshot 2024-10-02 at 4.00.27 PM.png]]
		- CDF: use `stats.norm.cdf(6,4,sqrt(2))` to find cdf up to 6 with expectation 4 and SD 2 note: this takes in SD not variance (sqrt(variance))
		- Properties:
			- Chebyshev's Distribution: can be even more accurate for Normal Distribution![[Screenshot 2024-10-02 at 4.13.39 PM.png]]
			- Standard Deviation is the distance between the average and the points of inflection (points where curve goes from concave to convex) (ON TEST)
4. Joint Probability Mass Function: a description of how the total probability of 100% is split over all the possible values of X and Y
	Ex. Let X take on values {-1, 0, 1} with equal prob 1/3. Let Y be 1 if X = 0, and 0 otherwise. What is the joint PMF of X and Y
		Table: ![[Screenshot 2024-10-04 at 4.13.57 PM.png]]
		So Joint PMF = P(a,b) = P(X = a, Y = b) and Marginal Distributions are:![[Screenshot 2024-10-04 at 4.15.48 PM.png]]
	- When trying to see joint probabilities of a ton of different variables you need some tricks to cut down how many entries are in table
		- Correlation: 2 variables are linearly related
		- Causation: change in one variable causes change in another
		- Covariance: the expected product of the deviations from expectation `Cov(X, Y) = E[(X - E[X])(Y-E[Y])]` (measures the linear relationship between X and Y)
			- Shortcut: `Cov(X, Y) = E[XY] - E[X]E[Y]`
			Ex. Consult joint PMF table above  ![[Screenshot 2024-10-04 at 4.25.34 PM.png]]
5. Variance and Expected Value are calculated the same but sub out the summation for the integral ![[Screenshot 2024-09-30 at 3.45.07 PM.png]]
	- You don't have to do an integral if you have the Cumulative Distribution Function! If you want integral from A->B on a curve, just do CDF(B) - CDF(A). Example: ![[Screenshot 2024-09-30 at 4.11.06 PM.png]]![[Screenshot 2024-09-30 at 4.05.55 PM 1.png]]
# Random Variable Properties
- Independent and Identically Distributed (IID): X and Y are identically distributed, and knowing the outcome of X does not influence your belief of the outcome of Y
	- Identically Distributed: Suppose we have 2 random variables X and Y. X and Y are equal if X(s) = Y(s) for all samples s and we call them identically distributed
		Ex. ![[Screenshot 2024-10-02 at 4.23.51 PM.png]]
		is not IID because it takes in different Ni's for each distribution Xi
- Standard Units = (original value - mean) / SD (gives a sense of how far away you are from the mean instead of just giving a single number)
- Covariance: the expected product of deviations between 2 variables![[Screenshot 2024-10-11 at 3.47.42 PM.png]]
	- Correlation: covariance is super dependent on units so we can standardize covariance (knowing something about X tells something about Y, “X and Y are uncorrelated” is the same as “Correlation and covariance equal to 0”![[Screenshot 2024-10-11 at 3.49.14 PM.png]]
		Note: think of correlation has telling you how much the data points are in a line![[Screenshot 2024-10-11 at 3.53.04 PM.png]]
		Plot X and Y on a graph to see if there's a positive negative or zero correlation 
	- Correlation with Multiple Variables: ![[Screenshot 2024-11-04 at 3.58.15 PM.png]]
	- Important: positive correlation and dependent doesn't mean anything about correlation! (aka Spurious Correlations)
		- Confounding Variable: a variable that causes X and Y both to rise (even though they're not correlated)

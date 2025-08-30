Design a system that would satisfy probabilistic safety guarantees (what is the probability of violating a certain safety specification)

They search through all the different (plausible) worlds and select the worst-case scenario
1. Maximization that involves Bayesian posteriors over hypotheses
	For each hypothesis:
	1. Plausibility of theory = its posterior over all theories given the observed data
		- Posterior is the updated probability function after learning some fact
			It's proportional to: (likelihood of the data observed given the theory) * (prior probability of the theory)
2. Posterior Consistency Results provide probabilistic risk bounds
3. Cases
	1. I.I.D Case:
	2. Non-I.I.D Case:
# Issues
1. The probability of violating a certain safety specification only holds with some probability
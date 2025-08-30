- Conjunction Fallacy: thinking a conjunction is more likely than either of its counterparts
- Base-Rate Fallacy: tendency to ignore relevant statistical information in favor of case-specific information
-  Subjective Interpretations of Probability: if you have the same amount of evidence for 2 outcomes, then the probability is 50/50
- Objective Interpretations of Probability: the laws of the world make the outcome of a coin flip 50/50
### Unconditional Probability
- Probabilistic Truth-Table:
	- Probabilities must add up to 1 (and be between 0 and 1, called the real-valued unit interval)![[Screenshot 2024-02-28 at 12.33.06 PM.png]]
	- To calculate the probability of any formula add up probabilities from rows where proposition is true
	- Properties: Pr(P V Q) = Pr(P) + Pr(Q) - Pr(P ^ Q)
	- Relies on "old" probability function Pr(0) called the prior probability function
  *Note: this version of probability you just drag the rows over*
### Conditional Probability 
- Posterior Probability Function: the updated probability function Pr(1) is called the posterior probability function
	- Conditionalization: the posterior probability function changes as a result from learning a certain fact 
	- Syntax: Pr(R | E) where R is certain thing happening and E is a fact that can be learned
	1. Pr(R | E) is a probability function
	2. Once E is learned, Pr(E | E) must assign probability 1 to the learned proposition
	3. Pr(R | E) must preserve as much information from the prior as possible while still satisfying constraint 1 and 2![[Screenshot 2024-03-06 at 12.39.51 PM.png]]
	- Evidential Support: conditionalization helps show what events lead to each other (does P give evidence for, against, or independent of Q)
		Ex. If you eliminate one world where P is false, you know P has a higher chance of being true ![[Screenshot 2024-03-11 at 1.02.55 PM.png]]
  *Note: this version of probability you drag the ratios of the rows over
- 
# Single-Patient Questions
![[Screenshot 2025-10-14 at 3.16.17 PM.png]]
# Branching Processes (Overall Pandemic)
1. Poisson Branching Process![[Screenshot 2025-10-14 at 3.15.45 PM.png]]
2. SIR Branching Process![[Screenshot 2025-10-14 at 3.33.52 PM.png]]
3. Superspreading: when a disease distribution (or person (super spreader) or location (superspreading event)) displays overdispersion
	- Overdispersion: greater variability in the secondary infection distribution than the Poisson (ie. variance of our distribution is above Poisson variance)
	- Why is superspreading a thing?
		- Very high contact rates
		- Pareto Principle: "80% of mosquitoes infect 20% of people"
		- Long Duration of Infection, High Infectiousness
	Example Study: suppose that each person gets their own $R_0$ (# of secondary infections) from a distribution (which has total expected value of $R_0$). Actual # of secondary infections = Poisson($R_{0i}$)![[Screenshot 2025-10-21 at 3.21.15 PM.png]]
# Takeaways
Stochastic models are random and give different outcomes (which is why we like them) but the law of large numbers can make them nearly deterministic. For instance, if we have 100 infectious ppl with a poisson distribution, we can very nearly predict what the next generation will look like (bc new generation infections = SUM(old generation infections))
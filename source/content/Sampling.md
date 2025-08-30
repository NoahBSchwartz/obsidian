 It's usually very hard to get a distribution over the whole world, we need to infer this from just a small sample. If you have the whole world of data sampling isn't worth it
- Target Population: The group that you want to learn about
- Sampling Frame: List from which the sample is drawn (ie. set of all people that could possibly end up being surveyed)
- Sample: Who you actually end up surveying
	- Chance Error: random samples can vary from what is expected in population, in any direction
	- Bias: systematic error in one direction (maybe survey methods are off)
	- IID Sample: think of each thing you could sample as a random variable. If each data point is independent and uses the same distribution, chance error can be avoided (just assume that this is sample with replacement because probs look the same for large sample sizes)
	- Statistic: a numerical function of the random samples (they're just random variables!). Ie. to find the average of people in boulder, take a statistic (mean) of the sample and use this to estimate
		- Estimator Performance (get Error Bars): do we get the right answer on average (bias), how variable is the answer (standard error)
			- Get Sampling Distribution: to figure these out, we need to get a distribution of the estimator. Ie. we need to get a couple of different samples and then find the statistic we're looking for (ie. mean) for all of them. Use this distribution to get error bars
				Ex. Sample mean is an unbiased estimator because `Expected Value[estimator avg] = Expected Value[actual distribution avg]`
			- Central Limit Theorem: if you do this enough times, eventually the sampling distribution turns into a bell curve 
				1. Start with a random variable (ie. can be -1 or +1)
				2. Take many different samples of that variable and add it all together
				3. As you let this sum get bigger and bigger, the distribution of the sum will look more and more like a bell curve 
# Statistical Hypothesis Testing: 
Only works if we can simulate data or calculate probabilities under hypothesis (null hypothesis aka default)
- Null Hypothesis: the default way that the model should be (ie. the process we're testing is unbiased)
- Alternative Hypothesis: a hypothesis different from null hypothesis (ie. the process we're testing is biased)
	- Example (Test Whether a *Single Sample* is Likely to Show up at Random from a Specified Chance Model):  Process: define null hypothesis, choose significance level, choose test statistic, simulate distribution, compare observed data to null hypothesis, if p-value is less than significance level then throw out null hypothesis 
		1. Test Statistic = Number of Black people chosen out of 100 assuming null hypothesis (26% chance)
		2. Distribution of Test Statistic: X ~ Bin(100, 0.26)
		3. Observed Test Statistic = 8 jurors. Look at distribution to see how likely this would be (super tiny)![[Screenshot 2024-10-16 at 3.51.44 PM.png]]
			Specifically, P(observed test stat | null hypothesis) = ![[Screenshot 2024-10-16 at 3.53.23 PM.png]]
		4. This means our observed data is most likely inconsistent with the null hypothesis (<1%) (if it were <5% it probably is inconsistent)
	- Example (Test whether a *Distribution* is Likely to Show up at Random from a Specified Chance Model):
		1. Eligible is the chance of race getting selected and panels is percent that actually got selected![[Screenshot 2024-10-16 at 4.11.12 PM.png]]
		2. This is a multinomial distribution (just binomial but more than 2 outcomes)
		3. Significance Level = 1%, Test Statistic = sum(|panel - eligible|)
			- Total Variation Distance: Commonly Used test statistic. Take absolute value, sum and divide by 2
				Ex. `Sum(abs([0.75, .25] - [.9, .10])) / 2` 
		1. Simulate this a bunch and plot the distribution (find probability of outcome by counting every occurrence where this could happen)
		2. Now see where the observed test statistic falls into the distribution 
	- Example (Test Whether a *Single Sample* is Likely to Show up at Random from a Specified Chance Model): We think that there is a 75% chance that some plant will have a purple flower 
		1. Null Hypothesis: 75% chance that some plant will have a purple flower, Alternate Hypothesis: chance of purple flower is not 75%
		2. Significance Level = within 5%
		3. Sample 900 real flowers, how many are purple under the null hypothesis?
		4. Now simulate this 10000 times to get a distribution
		5. Then figure out the probability that the real sample falls into the distribution (3%)
		6. We fail to reject the null hypothesis because 3% < 5%
	Note: Choosing Test Statistics. Make sure you choose something that gives just "high" or just "low" (ie. probably use absolute value)
- When to Use This: before starting you need some kind of default action, only useful if there's some sort of uncertainty
- Showing Causation: all of the above only showed correlation. But if you want to show causation (ie. for medical trials, you need to determine if treatment group did better by chance or did better because of medicine) you need to have a control group and a trial group
# A/B Testing
Test whether or not 2 samples came from the same distribution and difference is just by chance or whether they're actually different
- Ex. (Continuous Distribution): given distributions of baby weights for smoking vs non smoking mothers, show that non smoking mothers actually birth heavier babies and it's not just chance
	1. Null Hypothesis: In the population the distribution of birth weights of babies is the same for mothers who don't smoke as for mothers who do. Alternative Hypothesis: In the population the distribution of birth weights of babies is higher for mothers who don't smoke as for mothers who do 
		Note: you're allowed to pick a direction for your null hypothesis to have 
	2. Test Statistic: Group A average - Group B average
	3. We don't know what the distributions underlying our two data groups are, we just have access to samples
		- Get Creative: if we rearrange the labels of samples and then test again we should get same result if null is true 
		- `shuffled_labels = staff["Groups"].sample(frac=1, replace=False).values`
	4. We'll get a distribution and then check if our null hypothesis fits into this distribution. If not, reject the null 
	5. There is an association between birth weight and decision to smoke
# Choosing the Right Significance Level and Test Stats
- If your significance level (ie. p-value cutoff) is 5%, then if your coin is fair you'll think that it's unfair 5% of the time. You need to choose if you're ok with this error rate. 
- Test Statistic: 
	1. Total variation distance (TVD): used comparing two distributions of categorical data (ie. when we observe that a set of observed proportions/probabilities is different than what we expect under the null model). To do this, find the difference between the two proportions in each category.
```
stats = np.abs(obs_dist - null_dist)
return stats.sum() / 2
```
- Family Wise Errors: if you do a bunch of tests, eventually you'll get a P-Value below 0.05 just by chance. This means you can't just perform a ton of tests on the data until you get something significant. Just adjust P-Values accordingly  (take threshold and divide by number of tests you're performing)
- 
# Statistical Power
Suppose all coins are unfair with Prob(H) = 45%. How many students will correctly conclude the test is unfair using the hypothesis test? Simulate the distribution of all of these flips and run hypothesis tests. Only about 20% guess correctly. The power is .2
- To increase the power:
	1. Increase the sample size
	2. Increase the effect size (minimal size of the effect you hope to detect ie. a 5% difference in probability of heads or a 20% improvement in your grades)
	3. Significance level (p-value cutoff you choose)
Takeaway: try to design hypothesis test so Power is at least 80% 
# Confidence Intervals (Margin of Error)
Confidence Interval = ![[Screenshot 2024-10-30 at 4.25.48 PM.png]]
Trying to estimate real distribution with a single sample distribution
Look at distributions of statistics to find the margin of error. Margin of Error of 5% means 95% of time our test gives an interval where we encompass the answer (the challenge is we only have 1 sample and don't have access to ground truth)
Margin of Error: half of the Confidence Interval 
1. Bootstrap Percentile Method: Treat the sample like it's a good estimate of the population and sample a bunch of means from this sample (with replacement), use this to make a distribution of means, the middle 95 percentile (contains 95% of the means) is the confidence interval
	- This works because were trying to capture the variability in the sampling process (sampling WITH replacement is what makes this work, trying to see how much variability we could get every time)
	Ex. Use bootstrapping to calculate a 95% CI for the average age of the mothers in the population (we wish we could see the population but we actually just have a single sample distribution)
	1. Define Distribution stat (average)
	2. Plot Distribution of averages (we get 27.2 as the most likely average)
	3. Bootstrap 10000 average ages from data
	4. Calculate Confidence interval based on this distribution
	5. The P-Value for this problem relates to the confidence interval (.05 P-Value means 95% CI). So if we're using a P-Value of .05, we need to make sure the average we're verifying lands within the 95% confidence interval (we would fail to reject the null hypothesis if it does)
	Takeaway: for most stats bootstrap distributions approximate the shape, spread, and bias of the actual sampling distribution. BUT the original sample has to be really good for this to work
	Doesn't work well for extreme stats (max, min, very high/low percentile). Stat should be roughly bell shaped
2. Central Limit Theorem: this is the theoretical version of bootstrapping (you can figure out the size of the sample you need before getting it!). 
	- For Means: This only works for test statistics based on sums (ie. mean) 
			Recap: ![[Screenshot 2024-10-28 at 4.09.37 PM.png]]![[Screenshot 2024-10-28 at 4.09.54 PM.png]]
			- Because of how bell curve is shaped, for about 95% of all samples the sample average and population average are within 2 SEs of each other
				- So if you look within 2 SEs of the sample average you'll capture the population average
				- To find sample variance: ![[Screenshot 2024-10-28 at 4.13.10 PM.png]]
				Ex. To get a margin of error of 95% look at the distribution![[Screenshot 2024-10-28 at 4.17.26 PM.png]]![[Screenshot 2024-10-28 at 4.18.38 PM.png]]
				To get margin of error of 68%![[Screenshot 2024-10-28 at 4.18.14 PM 1.png]]
				To get margin of error of L% ![[Screenshot 2024-10-28 at 4.20.17 PM.png]]
		Using Confidence Intervals for Hypothesis Tests![[Screenshot 2024-10-28 at 4.24.30 PM.png]]
	- For Population Proportions: Proportions are just averages so you can use the central limit theorem
		Ex. If just under half of students are opposed to change, what is the confidence interval that campus is ACTUALLY opposed to change
		1. Just start with sample proportion and add/subtract 2 Standards of Deviation (because we're trying to find 95%) to get confidence interval![[Screenshot 2024-10-30 at 3.49.18 PM.png]]
		2. To get values: use Indicator Random Variable: Let X be a Bernoulli(p) random variable that represents each person in population (either a yes or no on polls)![[Screenshot 2024-10-30 at 3.50.36 PM.png]]![[Screenshot 2024-10-30 at 3.52.17 PM.png]]
		3. We get confidence interval of `[.43, .53]` so with a 95% confidence interval you can't say majority of students is against issue
		Ex. Suppose you want the total width of a 95% CI interval for a population proportion to be no more than 3%. What is the minimum sample size you should use?
		1. ![[Screenshot 2024-10-30 at 3.59.02 PM.png]]
		2. ![[Screenshot 2024-10-30 at 4.03.29 PM.png]]
	- For Conducting Hypothesis Tests: If you're trying to conduct a test that says "the population average/proportion = p" with cutoff (p-value) at a%
		1. Create confidence interval with 100 - a%
		2. If the confidence interval doesn't contain the null hypothesis, we can reject the null hypothesis 
		3.  If the confidence interval contains the null hypothesis, we fail to reject the null hypothesis 
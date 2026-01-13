Goal = Build model catastrophe detector
Method = We don't really care about understanding our neural net. Just write down its structure in some formal language. And then use that to compete with sampling 
# Background
Base Alignment Scheme: build catastrophe detector that classifies each output into bad or good, do adversarial training using the catastrophe detector
	1. Optimize our input probability distribution to give the most catastrophic possible inputs to the model
	2. Optimize the model to minimize the catastrophic outputs given these possible inputs![[Screenshot 2025-11-23 at 3.08.11 PM.png]]
		- This wouldn't work because super inefficient: How do we compute catastrophe(Model) quick enough to use it in optimization? You'd need to estimate it by taking a bunch of random samples but this is extremely slow if catastrophes are rare
# Best Case Scenario
Goal: Estimate catastrophe score of model better than just randomly sampling by understanding the structure of the Model, Catastrophe Detector, and Input Distribution![[Screenshot 2025-11-23 at 3.11.28 PM 1.png]]
- Best Case Scenario
	1. We know C structure: We understand that C is just a combination of a few details of the model output that must be true (P1 & P2 & P3)
	2. We know M structure and D structure: We can show that P1, P2, and P3 are all independent 
	3. Just use math![[Screenshot 2025-11-23 at 3.18.22 PM.png]]This would have previously required $10^{18}$ samples!! (we can do it in $3⋅10​^6​​$ samples
- Using Formal Language: find algorithm to figure out structure of NN (to do this kind of estimation for us)
# Matching Sampling Principle (Theoretical Progress)
M​θ​​ = Catastrophe(Model(D1, D2, D3...))
Estimate M​θ when D is sampled uniformly using argument π
Our estimate has tolerance ε (the smaller the tolerance parameter, the more accurate M's estimate, but the longer M​​ allowed to run)

For all architectures, there exists an estimator such that:
1. The squared error of the estimator is less than or equal to taking the empirical average of $1/ε^2$​​ samples
	 - (Normally if we want an error of ε = 0.1 then we need to run 100 samples through a probabilistic estimator)
2. The time it takes to estimate the expectation of M​θ​​ over D1, D2, D3... is O(1/$ε^2$ * Time(M​θ​​))
	- (Normally for probabilistic with ε is 0.1: O = (100 samples through estimator) * (model time))
3. The estimator is mechanistic (in order to outperform sampling): we actually have a reason behind the expectation (ie. from the samples we have seen we need to construct an explanation to account for all the one's we haven't seen)
	- If we sample 100 inputs and get 1 for all of them: 
		Probabilistic estimator: $E[M] = 1$
		Heuristic estimator: $E[M] = 1/$(# of possibilities), until we see structural evidence that $M$ always outputs 1
	Note: estimators that model each layer of Mθ by fitting some model are mechanistic! So covariance propagation (fitting normal distribution to each layer of the model [[Concrete Methods for Heuristic Estimation on Neural Networks]]) is mechanistic because it uses structure 

Ex. We have a network taking in 100 inputs w/ 1 output. Average output = .49. Starting heuristic argument gives us $E[M]$ = .5
	Sampling: needs 10000 samples to correct the discrepancy
	Heuristic Argument: 
		a. Maybe there's some places in the circuit that are correlated and we can just correct the discrepancy immediately
		b. Maybe only the first 10 inputs that affect anything and M just outputs a 1 randomly on 49% of them. We still need to account for this randomness with more sampling but we've dramatically cut the search space (1024 samples to search)
			If ε is large enough that we don't have the necessary runtime to check
			
Almost there but a heuristic argument could just be the answer to our question which is bad. Instead, we need to test for understanding by forcing our estimator to predict the value given a specific value
	(Estimator tries to find expected value of whole input distribution, we also need it to find expected value on 1 single input)

Almost there but the explanations need to actually be findable. Add in constraint:
	Runtime(Explanation of model behavior) <=  Runtime(Training the model)
- Intuitively:  work "in parallel" observing the training process and "building up" the explanation π in a way that mirrors the way that SGD iteratively modifies θ to get lower and lower loss
# Mechanistic Algorithms (Applied Progress)
### Estimate the size of intersection of halfspaces
(Can also estimate the satisfaction probability of a random CNF or the permanent of a random matrix)
Note: Must be competitive = beats sampling $1/ε^2$ random vectors and outputting the empirical fraction with < $O(kn/ε​^2​​)$ runtime
- Fit polynomial approximations each time you add in a new half-space intersection until eventually you're left with the full intersection!
### Estimate expected output of random MLPs on Gaussian inputs
-  Cumulant Propagation: basically find the size and shape of the first layer distribution, use that to find the size and shape of the 2nd layer distribution, use that to find size and shape of 3rd...
### Estimating the expected output of a two-layer trained MLP on Gaussian inputs
Cumulant propagation breaks down for trained network because when extra structure is added the simplest cumulants may not be the most important ones (ie. maybe 4th order cumulant is more important than 1st order so we can't just cut off after 2nd order)
1. Setup a function f mapping the MLP's inputs to outputs
2. We want to find the cumulants of f(x) (ie. the mean, variance... of the MLP's output distribution) so that we can estimate the expected value of the MLP
3. We can setup a polynomial which takes in the inputs and produces an output (ie. $y = 2x_1^2 + 3x_1^2 + 4x_2^2...$)
4. We can express the cumulants of the polynomial as a really big tensor and then just need to get the tensor from the network and use the tensor to approximate the cumulants 
# Question
1. I thought covariance propagation used sampling but the simple definition of mechanistic is "it avoids any random or pseudorandom sampling"
2. Don't understand this section because I thought that a larger error allowed the estimator more runtime
	(What if ε is large enough that GMG​M​​ doesn't have the necessary runtime to check MθM​θ​​ on all 1024 inputs? In that case, it should check however many it can and estimate the rest as being 50/50. This will still outperform sampling!)
3. Don't understand c at all? (for the updated MSP)
# Takeaways
1. Given a heuristic argument we should never do worse than random sampling (only equal or better)
	- Think about the case where, after receiving a heuristic argument π, we have many inputs to check and not enough runtime to do it in. Then the heuristic estimator's performance will be pretty close to random sampling
2. 
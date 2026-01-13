# (Part 1) How They Came Up With Logistic Regression
- Goal: predict is the image a dog or cat ==and give an estimate of how uncertain we think it is==. We need to stuff probability into this!
														 ![[Screenshot 2025-09-29 at 4.21.40 PM.png]]
	- Process:
		1. Trial and Error. For each gaussian try to see how good fit is
																		![[Screenshot 2025-09-29 at 4.22.25 PM.png]]
		2. Encapsulate all possible gaussians (with a joint distribution). Ie. find likelihood
																		![[Screenshot 2025-09-29 at 4.23.58 PM.png]]
		3. Find μ and σ that maximize this joint distribution
																![[Screenshot 2025-09-29 at 4.25.01 PM.png]]
- Previous Methods
	- Normal linear regression just tries to find best weights of a line. Normal Linear Perceptron tries to find a hyperplane to divide 2 classes. Logistic Regression cares about the uncertainty (probability) that a point falls into one class or the other
																![[Screenshot 2025-09-29 at 4.42.34 PM.png]]
	- Now: We care about distance to plane (and convert it to probabilities )
# (Part 2) Binary Logistic Regression Steps
We are trying to find the hyperplane to separate the 2 classes but now probability is involved. We put maximum likelihood estimation into our loss function to incorporate the probability part!
1. Sigmoid Function: gives us way to go from real numbers to probabilities! ![[Screenshot 2025-09-29 at 4.45.17 PM.png]]
2. Pass in the point's distance ($x^T w$) from our hyperplane into sigmoid and bernoulli to give us probabilities ![[Screenshot 2025-09-29 at 4.43.11 PM.png]]![[Screenshot 2025-09-29 at 4.50.32 PM.png]]
3. Setup![[Screenshot 2024-12-02 at 4.11.58 PM.png]]
4. Loss Function: we want to make a loss function that finds the best parameters in the context of the data
	- Motivation:
		- Past Loss Functions: Squared Loss or Ordinary Least Squares (try to minimize Mean Squared Error).
			Issue: there are some local minima that make the model get stuck (ie. the Mean Squared Error is a Non-Convex loss function!)![[Screenshot 2024-12-04 at 2.25.30 PM.png]]
			Issue: MSE also only penalizes a max of 1 (where if we're way off we want to penalize more)
			Issue: MSE tries to match class labels to probabilities (where we should really match labels to labels or probs to probs)
		- Maximum Likelihood Estimation: suppose you observe some outcomes that are 0 or 1, what would the next flip be? 
			It's reasonable to just have 1 parameter and set it equal to the likelihood of next flip being 1 (and round up or down). ie. For 10 flips where 4 = H and 6 = T:![[Screenshot 2024-12-04 at 2.38.59 PM.png]]
			Now generalize this to any random binary sample: assume all are IID with same probability p. Then theta = ![[Screenshot 2024-12-04 at 2.43.58 PM.png]]
			If they are IID with different probability p, Then theta = ![[Screenshot 2024-12-04 at 2.45.59 PM.png]]
			Maximum Likelihood Estimation: how could we choose different probabilities p for every term to maximize our theta value (our likelihood estimation)![[Screenshot 2024-12-04 at 2.48.40 PM.png]]
				Note: to solve this more easily we take the log of the equation, convert it to a summation, and invert it (minimization problem)![[Screenshot 2024-12-04 at 2.54.36 PM.png]]
			Example: ![[Screenshot 2025-10-13 at 3.52.29 PM.png]]
	- Loss Function: Cross Entropy Loss (Minimizing Cross-Entropy Loss is equivalent to maximizing the likelihood of the training data)
		- To estimate the min each of our p's we can use logistic function (because the logistic funct                                                                                                                                                                                           ion gives probability of response being 1)![[Screenshot 2024-12-04 at 3.00.43 PM.png]]
		- Cross-Entropy Loss: The curve is finally convex (we can see this by plotting)![[Screenshot 2024-12-04 at 8.33.02 PM.png]]
5. Fitting The Model:![[Screenshot 2025-10-13 at 3.59.49 PM.png]]
	- Data Likelihood for 1 Sample -> Data Likelihood for all training data![[Screenshot 2025-10-13 at 4.03.01 PM.png]]
	- This is a complex equation. Minimize the negative log-likelihood instead of trying to find the maximum of this eq!![[Screenshot 2025-10-13 at 4.06.36 PM.png]]
	- No closed-form solution so use gradient descent![[Screenshot 2025-10-13 at 4.07.50 PM.png]]

# (Part 3) Multinomial Logistic Regression Steps 
All of that above math was just for 2 classes (bernoulli). For multiple classes we need a multinomial!
1. Multinomial: The probability distribution function of K possible outcomes over N independent trials
							![[Screenshot 2025-10-13 at 4.15.41 PM.png]]
2. Putting Multinomial into our Loss Function: Naively, you might think we could just put more cases into our sigmoid but the probabilities wouldn't all add up to 1! Use softmax instead![[Screenshot 2025-10-13 at 4.22.10 PM.png]]
3. Fitting The Model:![[Screenshot 2025-10-13 at 4.21.38 PM.png]]
	This means that we have one $\theta$ per class
	- Now we need a way to turn each $\theta$ on and off (ie. if outcome 3 is shown, only $\theta_3$ should be activated). Use one-hot encoding![[Screenshot 2025-10-13 at 4.28.29 PM.png]]
													![[Screenshot 2025-10-13 at 4.26.27 PM.png]]
	- Minimize Cross Entropy Error: ![[Screenshot 2025-10-13 at 4.29.42 PM.png]]
	- Optimize With Gradient Descent
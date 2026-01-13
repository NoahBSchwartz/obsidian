### Background
- Regular Statistical Model = sum of independent functions (ie. linear regression, logistic regression, etc)![[Screenshot 2025-12-17 at 5.26.11 PM.png]]
- Neural Network = composition of nonlinear functions ![[Screenshot 2025-12-17 at 5.27.39 PM.png]]

### Regular Models vs Deep Models
1. Regular models are 1-to-1: each set of parameters creates a new unique function but NNs aren't 1-to-1![[Screenshot 2025-12-17 at 5.10.10 PM.png]]
	- This is because a regular model is just the sum of independent functions (each part must matter). Deep learning is a composition of functions (so not all parts have to matter. ie. an NN's bias at a certain neuron can take any value if all outputs from the neuron are 0) 
2. Deep learning has singularities in the parameter space, so as more data is acquired, the posterior distribution (probability map telling how likely every set of weights is) continues to jump from vicinity of 1 singularity to vicinity of next singularity![[Screenshot 2026-01-01 at 10.16.07 PM.png]]
	- If we're using squared error to train a model and we look at the loss landscape: 
		Regular models will have 1 single minimum and deep learning models will have multiple (because many sets of parameters can create the same function)![[Screenshot 2025-12-17 at 5.32.14 PM.png]]
	- Potential Solution: during back-propagation we have to find a single parameter set w to minimize the error. But this is a noisy process. We can find the possible distribution that w could take on if we add some noise into the equation.  "Minimizing the sum of squared errors" is mathematically identical to "Maximizing the likelihood of a Gaussian distribution"
		H(w) is squared error, learning rate is L(w), and gaussian white noise is N![[Screenshot 2025-12-17 at 5.39.15 PM 1.png]]
		- Probability distribution of good parameters w = 
			- The weights are likely to be where the error is low (ie. find the best weights to fit the data)
			- The weights are likely to be where the penalty is low (eg. maybe we set penalty for large weights at beginning)
			Note: $Z$ = normalization (If I pick a random set of weights from this architecture's prior, how likely is it to be good) (aka. marginal likelihood)
			Note: "Free Energy" is $-\log Z$![[Screenshot 2026-01-01 at 10.04.30 PM.png]]
3. Fisher Information Matrix: measures how sharp "loss landscape" is at specific point by averaging parameter sensitivities at that point (larger values in the matrix means model is very sensitive to parameter changes --> we found a sharp valley!)![[Screenshot 2026-01-05 at 8.56.02 PM 1.png]]
		For a specific input data point $x$, you calculate the gradient of the model's output function $f(x, w)$ with respect to the parameters $w$ (ie. we get a vector where each entry $i$ tells the sensitivity of the model if parameter $w_i$ is varied). Multiply this sensitivity by its transpose (gives a matrix telling you the correlation of parameter sensitivities). Repeat for many different inputs $x$ sampled from your data and average the resulting matrices together.
	- The rank of $I(w)$ tells you how many "useful" directions exist for the learning algorithm to move in. If the rank is lower than the number of parameters, the optimization is moving in a lower-dimensional subspace. IDK WHAT THIS MEANS
# Singular Learning Theory
1. Free Energy = Entropy of the unknown distribution + E\[KL divergence between unknown and model\]
2. 
# Questions
1. If you multiply a vector by its transpose do you always get a correlation matrix?
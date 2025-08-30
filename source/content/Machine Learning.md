# Background
- Linear Regression: use just the first degree $HR = c0 + c1*Nsamples$
- Non-Linear Regression: we use cross-validation to determine the optimal degree! (ie. $HR = c0 + c1*Nsamples + c2*Nsamples ...$ and stop when degrees fit too much)
- 3 Components of Learning
	1. Representation: the kind of model we use for our data (ie. K-nearest neighbor, decision tree...)
	2. Evaluation: assess fit of model to data (ie. squared error, K-L divergence)
	3. Optimization: find the highest-scoring learner (ie. greedy, beam search, gradient descent)
- 3 Types of Learning
	1. Supervised/Predictive: labelled data (eg. input-output pairs and look at accuracy)
		1. Goal: learn mapping from inputs $x_i$ to outputs $y_i$
			- Function Approximation: $f$ is unknown and we approximate it to get $y = f(x)$
		2. Definitions: $x_i$ is a vector where each values is a feature, $y_i$ is usually a single value
		3. Dataset: $D = {(x_i, y_i)}^N _{i=1}$ (we have multiple data point pairs)
		4. Data Matrix: ==fill in== $X = [x_1^T... x_N^T] \in R^{D \x N}$
		Types: Classification (output is categorical), Regression (output is continuous)
		- K-Nearest Neighbor (K-NN) Classifier: each test sample is assigned to the most common class among its neighbors 
			$y = f(x) = argmax(c=1, ..., C)$ 
	2. Unsupervised/Descriptive: unlabelled data and just discover things (eg. cluster data and then look at cluster coherence)
	3. Reinforcement: interact with world (ie. supervised learning but you obtain the rewards overtime)


If features are perfect indicators of datapoints then K-Nearest Neighbor should work perfectly? 
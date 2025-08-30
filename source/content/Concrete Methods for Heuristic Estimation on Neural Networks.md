This blog post maps activation modeling and causal scrubbing to heuristic estimation
# Background
- Heuristic Estimation: ![[Screenshot 2024-11-18 at 10.13.13 PM.png]]
- Surprise Accounting: we need a way to search for the best heuristic arguments which give us the most information using the shortest explanation because this will give us more insight into NN properties
	- (the way to search for heuristic arguments) = the surprise of the argument + the surprise of the estimate (given the argument)
	- Surprise is the amount of info that the argument gives us (aka the amount of information gained about the network from π relative to ∅)![[Screenshot 2024-11-19 at 9.41.20 PM.png]]
- Mechanistic Anomaly Detection: (1) find a bunch of arguments that we can give the heuristic estimator (2) we take all of our training inputs $[x]$ (3) give the arguments and inputs to the heuristic estimator, we need to find arguments where this will estimate a super low loss (4) then feed in new input $x*$ to heuristic estimator and only let this through if the loss is predicted to be beneath a threshold![[Screenshot 2024-11-18 at 11.41.54 PM.png]]
# Background 2 (Estimating Tail Risks w/ Activation Modelling)
How do you estimate the probability that a neural network displays some catastrophic behavior?
- If the estimate is very low, than even billions of samples might not have something bad but we should still be able to use the structure of the network to estimate the probability of catastrophic behavior
	Ex. If we estimate that an action is catastrophic if it is "too large" in 20 specific directions simultaneously. If these features were active with probability 1/100 then chance of doom = $(1/100) ^{20} =10^{−40}$
#### General Layout
Start with a neural network M that we're trying to model
1. C is a neural network which is supposed to predict when M gives a catastrophic output. Compose C with M gives C∘M→{0,1}
2. C∘M is just a larger neural network so we can break it into a composition of functions $f_0∘f_1∘f_2∘...f_{n−1}$ where each function is a transition between layers in the model
3. The input distribution is $X_0$ and for each function (layer) it causes a different distribution $X_1, X_2... X_n$. In order to estimate the probability of catastrophic behavior, we try to estimate these distributions
4. For each layer look through the set of all possible probability distributions and cut it down to be only the distributions that could actually describe the activations of the layer![[Screenshot 2024-11-28 at 10.05.25 PM.png]]
5. For each layer, we'll come up with a transformation function to transition any distribution from that layer to the next layer $g_0∘g_1∘g_2∘...g_{n−1}$
6. Putting it All Together: run your distribution through $g_0∘g_1∘g_2∘...g_{n−1}$. Look at the very last distribution this outputs. The probability of catastrophic output is the probability that this distribution assigns to the outcome of 1
#### 1. Propagating Distributions
- Finite Number of Data Points: this method is trivial. 
	1. To get Distribution for Layer 1, run all input data points through layer 0. Repeat over and over and you'll get the last distribution which gives probability of catastrophe
- Gaussian Distribution (infinite data points): approximate the distributions for each layer using multivariate Gaussians
	Note: Gaussian Distributions are just Normal Distributions (See [[Random Variables]])
	1. Multivariate Distribution Initialization: for every layer we have a mean vector (with means of all the Random Variables), we have a covariance matrix (showing how all Random Variables relate to each other)
	2. Learn Distributions for Each Layer: 
	3. Transition Function $g_0∘g_1∘g_2∘...g_{n−1}$ (transform a distribution from one layer to the next layer): choose the gaussian that best approximates running tons of data points through the layer's original transformation function (ie. $f_i(x_1, ... x_j)$)
		- KL divergence (used for non-linear networks (ie. RELU)): to figure out which gaussian is the best approximation run it through the original transformation function and see how closely it fits the next layer's distribution (we find the next distribution by just running a bunch of data points through the layer's original transformation function (ie. $f_i(x_1, ... x_j)$))
		- Toy Example (Trivial Method): if the network used linear transformations![[Screenshot 2024-11-29 at 12.18.32 PM.png]]
			Note: $u$ is mean vector, $\Sigma$ is covariance matrix 
	4. Uses (once our Gaussian network is constructed and transition functions learned): 
		- Estimate Risk: Simply use the Gaussian network to estimate risks like we previously did
		- Adversarial Training: Use our Gaussian network to create an input distribution for the original model with an input mean vector and an input covariance matrix that maximizes the probability of catastrophe. Then train the model to minimize the probability of catastrophe
#### 2. QLD
1. QLD: run a bunch of inputs through model and collect all the activations from the final layer, split each activation into 2 uncorrelated parts, assume that parts a and b are independent, since a and b are independent you can combine any `a` from one sample with any `b` from another sample (n^2 combos using just n samples from model), count what fraction of these would result in catastrophe
2. Bilinear Decomposition (my idea): replace the normal MLP (that uses nonlinear activation functions like RELU, meaning there are interactions between more than 2 features at once) with Bilinear layers (no activation function means that only pairs of features interact)
	- In Theory :)
		1. Start with output you want to explain (ie. 2 + 2 = "4"). Why did model output 4?
		2. Extract Interaction Matrix: Q = u * B     (Q = interaction matrix, u = output direction corresponding to '4', B = bilinear tensor)
		3. Decompose into Eigenvectors: Q = Σᵢ λᵢvᵢvᵢᵀ (**Eigenvectors** (vᵢ): Directions in input space that matter most, **Eigenvalues** (λᵢ): How much each direction matters (weights))
	- In Practice :(
		1. Train SAEs on the layer of the LLM you're looking at (get a whole bunch of features of the layer)
		2. Convert the bilinear tensor from the **raw neuron basis** into a **meaningful feature basis** discovered by SAEs
		3. Use one of the SAE directions you care about to get the interaction matrix (need to use SAE bc there are thousands of possible outputs)
		4. Decompose into Eigenvectors: Q = Σᵢ λᵢvᵢvᵢᵀ (**Eigenvectors** (vᵢ): Directions in input space that matter most, **Eigenvalues** (λᵢ): How much each direction matters (weights))
		5. Now you know all of the features that interact with this feature and how much they interact with this feature
	
#### 3. Independent Linear Features (SAEs)
- SAEs ([[Sparse Autoencoder (SAE)]]) are great for scaling to larger networks but abstract away really low probability inputs which is exactly what we're looking for
	1. Normally, SAE's compress and then reconstruct their input data (they try to get the lowest reconstruction loss across all data points during training). We need one where we can mathematically calculate the loss on a distribution of ALL inputs (instead of just estimating the loss with training data points)
	2. Defining Distributions: Consider a single possible Distribution at a single Layer in the network: For each activation in that layer we can use a distribution to represent how strongly the activation lights up 
		- Generating a Single Sample from a Single Distribution: for every activation in the layer we can take a bunch of samples from its distribution, add up all of these 
	3. WORK IN PROGRESS
# Background 3 (Causal Scrubbing)
Test interpretability hypotheses by exchanging certain parts of the model with noise
1.  Informal Hypothesis: says which parts of a model implement the intermediate calculations required for a behavior
2. Convert hypothesis to a mapping between the computational graph of the model and a human-interpretable computational graph
3. causal scrubbing starts from the output and recursively finds all of the invariances of parts of the neural network that are implied by the hypothesis, and then replaces the activations of the neural network with the _maximum entropy_[[3]](https://www.lesswrong.com/posts/JvZhhzycHu2Yd57RN/causal-scrubbing-a-method-for-rigorously-testing#fng10ehlzhmhl) distribution subject to certain natural constraints implied by the hypothesis and the data distribution
# Concrete Methods
Sparse-covariance propagation: heuristic estimation algorithm for estimating output of arithmetic circuits
1. Setup for circuit C: Inputs =  $z_1,...z_n$.      Nodes = $x_1...x_m$  (either addition or multiplication nodes).       Connections =  $x_k(z_1...z_k)$.
	Goal is to estimate output of C
2. Naive Estimator: Assume all wires are independent. Just pick some inputs and run them through the network 
	Addition: $(E[xi+xj]=E[xi]+E[xj])$, Multiplication: $E[xixj]=E[xi]E[xj]$ ![[Screenshot 2024-11-19 at 1.59.33 AM.png]]
3. For Surprise Accounting We Need Distributions (run variances through the network): 
	Addition: $σ^2_k=σ^2i+σ^2j$,    Multiplication: $σ^2k=σ^2 \cdot iσ^2j+σ^2i \cdot μ^2j+σ^2j \cdot μ^2i$![[Screenshot 2024-11-19 at 2.06.39 AM.png]]
4. Selectively Violate Presumption of Independence: track particular covariances between nodes and incorporate these covariances into our propagated mean (look at all relationships between nodes and if covariance between any 2 nodes is 1 then add it to the set)
5. The Metric: search for arguments that "minimize surprise." In my opinion this means search for arguments that give us the most amount of info about the network while being shorter rather than longer
# Activation Modelling
 Produce a probability distribution of model activations which explains the expected output (see Background 2). We are starting with a learned model and the below steps are building a heuristic estimator on top of it
1. Build the Naive Estimator: We need to define the Normal Distribution at every layer (we need a mean and a covariance matrix)
	1. Feed a ton of data points from the previous layer to the new layer (ie. $f_i(x_1, ... x_j)$) and estimate the distribution's mean and variance from there
	2. Find Covariance: remember that to setup an estimator we first presume independence. So we define the covariance matrix as all 0s except on the diagonals where we'll put the variance of each node (Remember that the diagonal will contain (0,0) (1,1) (2,2)...  and remember that $Cov(Node_0, Node_0)  = Var(Node_0)$,    $Cov(Node_1, Node_1)  = Var(Node_1) ...$)![[Screenshot 2024-11-29 at 5.47.48 PM.png]]
2. How to use the Heuristic Estimator: 
	1. Heuristic Arguments: each argument we give to our heuristic estimator is a set of boolean masks over each covariance matrix of the network (ie. we're shutting on and off different relationships between nodes)
		- Example Argument: for a network of 10 layers where each layer has 35 nodes, an argument is 10 matrices of 0s and 1s that are each     35 x 35 ![[Screenshot 2024-11-29 at 6.14.59 PM.png]]
		- Naive Argument (the starting argument given to the estimator): using the example above it would be 10 matrices of 0s and 1s with 1s just along the diagonal (this lets variances of individual nodes go through the network like normal but doesn't let any relationships between nodes happen)
3. Training of Heuristic Estimator: arguments to the heuristic estimator create new distributions at each layer
	- Surprise Accounting: 
		- Toy Example: remember that if we want to find the surprise of the estimate given an argument we just use I(event)=−logp(event)
		- Goal is to minimize (surprise of the argument + the surprise of the estimate given the argument)
			1. Computing the surprise of the estimate          
			2. Computing the surprise of the argument
			3. Consider Computational costs of computing estimate
	- Optimize the covariance matrices using gradient descent to minimize "total surprise":
4. Run Heuristic Estimator on One Sample:
	- Wick Propagation:
#### Issues
- With this setup, we're not capturing relationships between layers. We're only looking at layers as separate objects 
	- See [[Sparse Crosscoders for Cross-Layer Features and Model Diffing]] as a potential solution
	- Maybe try 
# Causal Scrubbing
1. Goal: estimate the model's loss on a dataset by understanding which parts of the neural network are responsible for its behavior
2. Turn the model into a graph (nodes are computation steps (ie. attention or non-linearity), edges are flow of data) and make sure the graph produces the exact same output 
3. The current graph is a DAG (This means a single node (ie. attention operation) might feed into multiple nodes) so duplicate the parent attention operation to make a tree-like structure (so that intervening on one path makes sure we don't affect another path)
4. Runtime:
	1. Ablation =  replace the original data flowing along a specific path with data sampled from a reference distribution 
		- Structural Ablation (truly random): if ablating an input just replace with different random input from dataset, if ablating activation then replace with the activation from a different randomly sampled input
		- Semantic Ablation (chosen based on context): ie. if a network component relies on identifying "names" a semantic ablation might replace a name with another name from the dataset rather than a random word
	2. Heuristic Estimation: try to make guesses about the model's loss
		1. Presume independence:
			1. Assume that every single distinct path that an input z takes (after treeification) is statistically independent of all other path inputs (ie. if you preformed an ablation you could just use structural ablations)
			2. Make a naive estimate: assume all internal computation are randomized across the paths and just compute loss like this
		2. Make Arguments: 
			1. Make Argument π: a partition over all the tree's paths (ie. group of all the possible paths into different batches)
			2. Deal With Batches (some paths are super important, some paths are related, some paths are unrelated)
				- Important Batch: there's one important batch which doesn't get ablated (these are the paths which we think are crucial for model behavior)
				- Other Batches: paths within the same batch get resample ablated using the same random input (all remaining paths get their own unique random input)
			3. Surprise Accounting: goal is to minimize the "surprise" with each argument      S(Y, π) = S(Y | π) + S(π)
				- S(Y | π)
				- S(π)
			4. Find arguments that minimize surprise: find set of interventions that allows the model to still perform well (low S(Y | π)) while using the simplest possible explanation (low S(π))
5. Deployment: once you've found your best argument π you can use it to analyze a single novel input. The loss that it estimates will tell you whether it's an anomaly (high loss) or is familiar (low loss)

Note: to scale activation modeling, we could get distributions of SAE's ([[Sparse Autoencoder (SAE)]]) that are on top of the underlying network. This could be used to evaluate the performance of different SAE's (ie. how much does performance on a MAD benchmark improve if we apply anomaly detection methods in the sparse basis)
# Fundamental Question
- Does this post solve the problem of finding a heuristic estimator that rejects incorrect arguments? Does it give a concrete approach for learning arguments? Ig we use the covaraince matrices but then what?
- Look at the comments on this post: https://www.lesswrong.com/posts/SyeQjjBoEC48MvnQC/formal-verification-heuristic-explanations-and-surprise to see if surprise accounting has been used correctly here
- I think it's possible that the covariance matrix isn't giving us enough information. What if instead of a covariance matrix we used affine arithmetic ([[An Introduction to Affine Arithmetic]]) instead? Then we could show precisely how each variable is correlated instead of just saying that they're correlated
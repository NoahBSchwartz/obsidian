- Knowledge of implementation lets authors simplify model, and more efficiently reason about model performance over possible inputs
### Background
- Causal Scrubbing: A way to test interpretability methods automatically by subbing out part of the model for the interpretation and seeing effect on performance
### Setup
1. Goal: estimate the lower bound of model performance (this is an arbitrary metric they picked)
2. Proof Setup
	- Computational Component (C): Takes in model weights and outputs a lower bound on performance
	- Non-Computational Component (Q): Formulate C's goal as a logic statement to "prove" that C is true
3. Model Setup: Using a one-layer transformer trained to output max of 4 numbers that it's provided 
	-  K = context length, T = input sequence, P = matrix to encode positional embeddings of tokens, E = embedding matrix to convert tokens into vectors, Q K V O = query key value output matrices for attention, U = unembedding to convert final hidden layer back to tokens 
4. Splitting Model into Circuits:
	- QK Circuit: Computes attention scores based on the query and key vectors
		1. Input is one-hot-encoded, the tokens are embedded, and the token positions are added in -> Results in New Matrix. 
		2. Multiply New Matrix * Flipped New Matrix * Query Matrix * Key Matrix (to test for matches on all combos of queries and keys of the input), and then normalize so head size (d) doesn't effect output
	- OV Circuit: Transforms the (information stored in the) tokens with the highest attention scores into the final output
		3. Apply the softmax function to the Attention Matrix, multiply by (Value Matrix * Initial Input) (only the best matches get to combine and get access to secret value info), multiply by Output Matrix (to transform the attention output into something usable)
	- Direct Path: Path to skip the attention mechanism, lets model pass some of the info directly to the output 
		4. Add the final attention matrix back to the initial input (to modify the model's original residual stream) and then multiply by unembedding matrix to get back to tokens![[Screenshot 2024-07-02 at 11.08.52 PM.png]]
5. Splitting Each Circuit: 
	- QK Circuit is the Addition of: 
		- Position Independent Component: only cares about the value of each token
			1. Mutliply (Input Token + All Combinations of Positional Information) * (Average of Positional Information)
				- Note, this is still position dependent because the same operation happens to all tokens
			2. Multiply like normal by Query, Key, and Input Matrix
		AND
		- Position Dependent Component: uses info about where tokens are in input sequence
			1. Multiply (Input Token + All Combinations of Positional Info) * (Deviation of Each Position from the Avg Position Info)
			2. Multiply like normal by Query and Key Matrix
		![[Screenshot 2024-07-03 at 10.57.37 AM.png]]
	- OV Circuit is the Addition of:
		- Position Independent Component
			1. Multiply (Input Token + All Combinations of Positional Information) * (Initial Input)
			2. Multiply like normal by Value, Output, and Unembedding Matrix
		AND
		- Position Dependent Component
			1. Compute Deviation of Each Position from the Avg Position Info
			2. Multiply like normal by Value, Output, and Unembedding Matrix
		![[Screenshot 2024-07-03 at 11.02.26 AM.png]]
	- Direct Path:
		- Position Independent Component:
			1. Multiply (Query) * (Input Token + All Combinations of Positional Information) * (Unembedding)


### Runtime
1. Brute Force Search: just test the model on all possible inputs
2. Cubic Proof: to reduce the number of inputs we need to test on, use info about the model
	- 
3. Proof Evaluation:
	1. Method #1 for evaluating proof: Unexplained Dimensionality (proof length) assesses how well a proof "understands" the mechanisms involved (ie. the more edge cases (more dimensions) a proof has, the less it actually understands what's going on)
		- Proof Length: Can't just measure the length of the logical proof, measure the computational steps that C goes to in order to get to lower bound instead using:
			1. Asymptotic Time Complexity: How the size that C requires to compute lower bound scales with model size and input size
			2. Average FLOPS: average computation needed to find lower bound across a bunch of different models 
	2. Method #2 for evaluating proof: test the model in the worst case scenario by replacing all the parts we don't know with there performance in the worst case scenario ==do the authors actually use this==
4. 

### Problems
- Structureless Noise: when model has components that can't be entirely understood by mechanistic interpretability. Heuristic estimator needs to widen error bounds to account for this
- Single layer transformers with no biases studied, can this method be extended? 
### Proposals
1. Combine this method with general NN verification methods to get rid of structureless noise issue
2. Use other metrics instead of just accuracy
	- Works because the method generalizes to be able to estimate any aspect of model performance that can be formalized (ie. all hard metrics of the model)
	- Maybe formulate this as an automated search where every new metric we find gives more heurisitics

The work doesn't seem to deal with heuristics all that well even though less wrong article says that's ARC's main hope
- "The basic problem with provable guarantees is that they must account for every possible way in which different parts of the network interact with one another, even when those interactions are incidental to the network's behavior"
- Does that mesh ok with sriram's approach or will he not like heurisitic garuntees? 
### Questions
1. Does Siriram's article deal with a large neural net?
2. Can this method work for performance of more complex tasks or only tasks with 1 very defined metric?

10 pages 




# Thoughts
A has a 10% chance of firing for every sample

B has a 10% chance of firing for every sample

For some reason when A fires, B fires 90% of time so we need an explanation

- Core Problem: I need to come up with a structure that lets me be unsure about all these numbers but keeps it so the checker never lets a bad case through (ie. the more unsure I am, the less examples the NN can handle but it will never break)
    
- To do this, start by copying down all activations across all inputs
    
    - We have a system that will never break because it won’t allow any inputs not in training set
    - Simplest case (testing perspective): I should be able to edit a single activation of an already known input and have the system tell me things are still safe
        1. Problem:
    - Simplest case (information reduction perspective): I should be able to pick some activation that is consistent across all inputs and reduce it to a general rule
        1. Problem: how do I know the system is paying attention to this activation (ie. how to know whether or not to allow this activation to change when other inputs come)
            1. Proposal: I can do an ablation study and try all possible values for that activation to make sure nothing happens in the model (but this feels really weak and bad)
            2. Proposal: I can use the same idea as pruning. If a weight is part of a completely redundant pathway or is perpetually inactive it can be totally pruned
    - Simplest case (information addition perspective): start from nothing
- Core Problem: I might need to use the information addition perspective in order to understand what heuristic is worth adding and which one isn’t. It might be harder to remove everything unimportant than to start from nothing and add what’s important
    
    1. Start with a verifier that is terrible (ie. it looks at the model and thinks that all activations have a super low probability of occurring)
        1. This verifier won’t let any (real word) examples pass to the model because it sees the probability of the activations occurring as super low
    2. Have the verifier estimate the likelihood that some activation pattern in the network will occur (using data in the lab)
    3. If the likelihood is < .00001, the verifier must be given an explanation to update the likelihood
    4. Once the explanation is found, check if the verifier now predicts the likelihood of the behavior to match the true likelihood
    5. Now, the verifier thinks this occurrence is likely and will let (real world) examples with this occurrence through
    
    - Alternate idea for 2,3,4 (the fuzzy method)
        1. We have 100
# Newest Work
Jason’s new proposal: use cross coders (take the residual stream vectors at every layer and stack them into one long vector, then train a sparse autoencoder on this stacked up vector) goal is to reproduce stacked vector as close as possible. Cross coders break everything a model does into features!  
Run every single data pt through model and record activations (for every data point, here is the sequence of features)
We get our encoded dataset 
See what the cross coder claims the accuracy of the model is: just pretend the cross coder represents the model’s activations perfectly and then run the unembed on the cross coder to see what the prediction is 
Bound how imperfect the cross coder is: 
Previous technique: 
Figure out that the original data point is within some epsilon ball of the dataset encoded in cross coder: decode to the first layer (run the unembed of the first layer on the full cross coder, embed the original dataset w the first layer, measure how far away are these vectors) 
Prove if the data point is within a certain ball of cross coders feature then the model will get it right: Propagate epsilon ball error interval through network and see how much error is introduced (this is normal you would just do this for every data point of the network). 
Instead of doing that though we can use knowledge of the network 
We assume cross coder learned network correctly so we can assume features interact only linearly (for a datapoint we just have a sum of features to explain it, no interaction) 
Run the features through the network using epsilon ball propagation and then combine all their errors in a linear way 
There are fewer features then there are data points so we can just save the errors for all features and then combine them to get the error of every data point 
To get a proof, establish that features are actually independent (ie we can just sum them up) 
Default: Do this by looking at the strongest feature in a layer. Check that no neurons interact w it. This will give us shorter proof but worse error 
If some features do interact then we know we need to put in more mech interp work to get better network compression 

The gold standard would be a way to perform interval analysis (very poorly) on a NN with 2B parameters

When I have WIFI: 
Look into past research using SAEs to turn a Neural Network into circuits
Download the UROP forms I need to fill out
Look into verification of quantized networks to get back to original 
# Large NN
Essentially just do probabilistic verification on a much much larger Neural Network than anyone has used previously
1. Setup empty covariance matrices for all layers of gemma 2B (ie. if a layer has 128 neurons create a 128 x 128 matrix)
2. Setup a (heuristic) mask matrix over each covariance matrix. Populate it with 1s down the diagonal and 0s everywhere else (presumption of independence)
3. Run a diverse dataset of questions through the model to estimate the mean and standard deviation at each layer
	- ==The mean at the layer and standard deviation of the layer are estimated from the distribution of the previous layer (after we've applied the mask matrix to the previous layer)==
	- ==For every layer we have a mean vector (with means of all the Random Variables). Do we also have a standard deviation vector too then?==
4. Populate the covariance matrices with this standard deviation (we'll just have the SD's on the diagonal)
5. For each layer, create a distribution using the covariance matrix and the mean
6. ==Find the set of all inputs which fit into the 99th percentile of all distributions, we'll call these the "verified" set==

7. Use google gemma scope to populate the heuristic mask matrices (ie. for layer 20 look at the concept of "cat", there are 10 neurons that make up this concept so put a 1 in 100 spots of the heuristic mask) use the dataset to identify all of the features in each layer (hoping for around 100 features per layer)
8. ==Train the covariance matrices at only the unblocked spots by passing the dataset through again==
	- ==Do we have to have transition functions for this?==
9. For each layer, create a distribution using the covariance matrix and the mean
10. ==Find the set of all inputs which fit into the 99th percentile of all distributions, we'll call these the "verified" set==


Look into the curse of dimensionality. Does it make sense to try this on a KAN first because of the curse? 
- In MLPs the activation function depends on all inputs whereas in KANs it only depends on one input (this allows us to escape the curse of dimensionality)
- Curse of Dimensionality: if our data has more dimensions to it (ie. if we look at 10 factors when calculating house prices) then the number of data points we need to train our network grows exponentially (if we go from 2D to 3D we need many more points to fill the space)
	- KANs solve this by:
		1. Using univariate functions instead of multivariate functions
		2. Finding structure in how the data is arranged
By being able to avoid the curse of dimensionality, KANs allow the training of large and feature-rich models without needing vast input data to achieve high accuracy. This is possible because of the decoupling of error from the input size

We should be able to increase the number of input features (of varying quality) indefinitely and never lose any performance with KANs whereas we can't do this with an MLP (maybe this would lead to sparser covariance matrices in verification which is a good thing)
# Medium-Sized NN
Use SAE's to figure out correlated neurons and then combine those neurons into an abstraction. Preform interval analysis or something like that on this abstraction
# Large KAN
1. Estimate worst-case noise over the entire network 
2. Run an input through and see if there's any chance of the output coming out as wrong
3. Find the range of inputs where the output comes out right (this is the verified set)
4. Start to replace the worst-case noise with the most important paths from the network
5. This will expand our verified set without using too much computing power

Once we have this working on a KAN we can extend it to a NN

The special thing about using a KAN vs an MLP is that composition of certain functions can be your arguments. (So you can have an equation for one sub-circuit and] an equation for another sub-circuit and then a function that talks about how they're connected). But then wouldn't the KAN itself just be the heuristic argument (because the point of the heuristic argument is to cut down the network until we get a general enough explanation to cover the space of all inputs)
Neural network verification is NP-hard because of the non-convexity introduced by activation functions. KANs could fix this
# Medium-Sized KAN
Use MILP on KAN and use Branch and Bound to solve. We should be able to do this much quicker than state of the art because not dealing with RELUs (and we can make use of dependencies between functions)
# Questions
#### Large NN
1. What if the paper were about using SAEs to narrow down on the neurons we focus on and then employing a bunch of different verification strategies? (ie. neuron abstraction, probabilistic verification, interval analysis). But maybe this is just a copy of abstracting neurons away paper
2. This current plan treats all layers independently. Normally, (when we're not using neuron relationships to populate covariance matrices) we just propagate our input covariance matrix through every layer of the network (training intermediate functions by passing a dataset of points through and trying to get our intermediate functions to spit out distributions which look close to what we expect) see [[Concrete Methods for Heuristic Estimation on Neural Networks]] We need to either combine this approach with what we're doing in the current plan (just using gemma scope) or show our approach is better
	-  In order to not forget some information, we must model the entire distribution of activations simultaneously instead of modeling each individual layer
3. Will this proposal actually do anything for when the distribution shifts to the real world or will it just lock the neural network into staying super close to the training data?
4. Can I track more complex relationships between neurons by looking at full sentences instead of just concepts?
5. Can I use one Neural Network to verify another?
6. For Proposal 1, we can verify facts about the output distribution of the network with 100% accuracy
7. Can I use this fact? "NN verification is known to be an NP-complete problem, and the complexity of the verification algorithms increases exponentially with the number of neurons in the network"
# To Do
1. Fully read a paper on probabilistic verification methods
2. Look at "A Survey on Uncertainty Quantification Methods for Deep Learning"
3. Look at papers on detecting hallucinations in Neural Networks
4. Read through Causal Scrubbing section of concrete proposal paper
5. Read Cross Coders paper
6. Read John Wentworth's alignment strategy (to give some insight on whether or not this will work)
7. Read Sparse Autoencoders Paper
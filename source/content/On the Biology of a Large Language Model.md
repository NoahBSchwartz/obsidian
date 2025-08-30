The first paper to trace the steps a model uses to go from input to output (with attribution graphs of features)

# Method
Take the og model and expand it, rewriting each neuron in terms of features. Then run an input through and only look at the most active pathways through features in the network to get a much smaller graph of what's going on 
1. Cross-Layer Transcoder (CLT): Neurons are polysemantic (see [[AI Interpretability]]) which makes LLM interp hard. Create a replacement model which approximates the activations
	Think Like This: input goes through a series of transformations to become output (1 neuron = 1 transformation)
	- Setup: Features read from one layer and write to all following ones
		1. Start with your og model. For each layer in the model feed the input of the layer into the CLT (encode the residual stream and send it through a RELU activation function). This gives us the activations for the CLT features. At layer $l$:![[Screenshot 2025-03-30 at 2.55.06 PM.png]]
			$a^l$ = CLT activations, $W^l$ = encoder, $x^l$ = residual stream
		2. The CLT layer $l$ must try to reconstruct the MLP layer's output (send the activations of the CLT layer through a decoder)
		3. The layer also helps all of the layers in front of it to best predict their MLP layers' output (send the output of layer $l$ through one decoder matrix per layer that is in front of it) ![[Screenshot 2025-03-30 at 3.17.01 PM 1.png]]
	- Training: balance between reconstruction and sparsity
		1. Make sure that all layers of the CLT reconstruct their corresponding MLP layer correctly (ie. sum up the MSE of all layers)![[Screenshot 2025-03-30 at 3.25.54 PM 1.png]]
		2. Make sure everything is sparse (add up all the decoder vectors for every single feature in every single layer of the model, try to get this value small)![[Screenshot 2025-03-30 at 3.48.37 PM.png]]
![[Screenshot 2025-03-30 at 3.22.28 PM.png]]
2. Construct the Replacement Model: Pass an input through the og model and then through the CLT. Just replace each MLP layer with the corresponding CLT layer and patch back in the info from the og model (ie. attention and error nodes)
	1. Take the residual stream and pass it to the CLT layer, take the output of the CLT layer and pass it back to the residual stream after summing it with all previous CLT layers
	2. Keep all attention layers and normalization denominators in the model the exact same (run the input through the og model 1st to figure out attention values)
											 MLP                                              CLT
		![[Screenshot 2025-03-30 at 3.59.32 PM.png]]
			There are more features than neurons in the MLP so the replacement model is just like a more complex way to replicate the og model's performance
	3. Keep track of the difference between the CLT and og MLP at each layer (run input through og model and then CLT model)
	Note (Mechanistic Faithfulness): this is great! it rewrites the models computations in a more interpretable way, but we can't know if the CLT is learning different mechanisms from the underlying model
3. Attribution Graphs: describe the steps a model used to produce an output (one token at a time). Nodes = (active features, embeddings from the prompt, reconstruction error, output logits). Edges = (how one neuron feeds into another ie. to figure out the activity of a neuron just add up all of its edges)
	1. Nodes of the Graph
		1. Output Nodes: first create nodes corresponding to the possible output tokens the model could choose (which will have probabilities the model assigns to each). Create enough so that the probs add to 95% 
		2. Intermediate Nodes: then the intermediate nodes are the features which are active in the CLT
		3. Input Nodes: the embeddings of the prompt tokens 
		4. Error Nodes (additional error nodes): portion of each MLP output in the underlying model left unexplained by the CLT
	2. The Edges Connecting Everything: 
		- The edge between feature 1 and feature 2 is just (the weight between them in the replacement model) * (the activation value of feature 1)
		- This makes it so that to figure out the activity of a feature just add up all of its edges
	3. Pruning: identify the nodes and edges which most contribute to the model’s output (usually reduces model size by factor of 10 while reducing the behavior explained by 20%)
	4. 

original model
# Limitations
Study the model indirectly using a more interpretable replacement model (which simplifies a ton, losing intermediate steps)
- The paper proves that specific mechanisms are at play but not if they're the only ones
# Ideas
1. They show they can substitute the features learned by the transcoder for the model and match the model 50% of the time
2. You can apply attribution graphs and pruning to a simple MLP too
3. CLT's perfectly match the underlying MLP if you take error nodes into account. So one approach for a heuristic estimator is just to keep searching until the error nodes are super small and we have a 99.9% reconstruction accuracy
# Questions
1. "We design our setup so that, for a specific input, the direct interactions between features are linear." Still not positive what linear means
2. What is a linear encoder/decoder vs a nonlinear? What is a nonlinearity?
	"Each feature in the ℓth layer “reads in” from the residual stream at that layer using a linear encoder followed by a nonlinearity.
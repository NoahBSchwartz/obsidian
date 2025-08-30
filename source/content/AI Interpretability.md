### Categories
1. Mechanistic Interpretability: 
### 3 Broad Methods for Learning about a model
1. Simple Model on Top of Large Model: train a smaller model to look at the hidden states of a much larger model. Its objective is to use the states to predict what the large model is currently outputting
	- By analyzing which features are most useful for the classifier, researchers can infer what kind of information the LLM is capturing at different layers.
2. 
3. Directly Changing Internals: researchers can turn off (or modify) certain neurons and layers to see what happens to the overall output 
### Implementations
1. Retrain a black box model using an interpretable method 
	- This trains on each individual input one after the other (like round robin)
	- This allows the final model to show what inputs its output is based on
2. Feature Visualization: See how the model's output changes as the inputs change in different combinations
	- Once enough samples are collected, researchers are able to see what weight each input has on the final output
3. Make a prediction with a model, then sample points around the site of the prediction
	- Assuming classification with 2 inputs: With these samples, you can fit a line to estimate the boundary between outputting an A or a B
	- This gives a good approximation for what features the model is looking at locally
4. Saliency Maps: For each model output, backpropogate to the inputs to see how much an input effects the end result
	- This is usually pretty messy and only gives a good result for images
### Tools
1. Activation Patching: take a 
3. Direct Logit Attribution: models work by having a residual stream that each layer adds to. DLA looks at the next token predicted and points to all of the parts of the model that contributed to the current stream (this is a way to explain how an input gets directly modified into an output)
4. Linear Probes
### Definitions
- Features: the interpretable properties of the input we observe neurons responding to
	- Can be thought of in 3 ways (depending on preference): as any function of the input, as human-understandable properties, or...
	- My favorite definition: properties of the input which a sufficiently large neural network will reliably dedicate a neuron to representing (this accounts for superposition)
	- They are represented by directions (but not always, only when the network is linear)
- Linear Representation: if features correspond to directions in activation space (intuition is that non-linear representations are generally inefficient for neural networks)
- Directions: the actual vectors in activation space that hold concepts. These can be already present concrete concepts (ie. man or woman) or researchers infer them for more abstract concepts (gender direction = man direction - woman direction)
- Privileged Basis: when features align well with neurons (ie. there is no superposition)
- Superposition: neural networks simulating larger networks ()
### Ideas
1. Instead of using Direct Logit Attribution from start to finish on the model, you can use it with probes. ie if you place a probe at layer 3, you can see all of the components that lead up to that point 
2. Linear Probes give a view into the direction space of the model at a certain point in time (aka. at a certain point on the residual stream). If you take another part of the model and project it into this space, you can see how that part reads or writes to the space (ie. in what ways is it different from the point that you're probing)
	- Ex. The probe intervention works best between layer 4 and layer 5, so we might hypothesise that some neurons in layer 5 are reading from the probe's subspace - we can check by taking the cosine sim of the neuron's input vector and the probe's directions to see how it responds to each
### Questions
1. How do you relate features to neurons exactly? 
2. What happens if model is not linear (any examples of this happening yet?) (This would mean each feature does not correspond to a direction in activation space)
	- "Note that whether something is a linear representation depends on what you consider to be the features"
	- Note, the othello gpt paper doesn't provide good evidence for this
[[Encoder Decoder Editing]]
1. Activation Patching: take a 
2. d
3. Direct Logit Attribution: models work by having a residual stream that each layer adds to. DLA looks at the next token predicted and points to all of the parts of the model that contributed to the current stream (this is a way to explain how an input gets directly modified into an output)
4. Linear Probes
# Ideas for Extending the Tools
1. Instead of using Direct Logit Attribution from start to finish on the model, you can use it with probes. ie if you place a probe at layer 3, you can see all of the components that lead up to that point 
2. Linear Probes give a view into the direction space of the model at a certain point in time (aka. at a certain point on the residual stream). If you take another part of the model and project it into this space, you can see how that part reads or writes to the space (ie. in what ways is it different from the point that you're probing)
	- Ex. The probe intervention works best between layer 4 and layer 5, so we might hypothesise that some neurons in layer 5 are reading from the probe's subspace - we can check by taking the cosine sim of the neuron's input vector and the probe's directions to see how it responds to each
Gradient Routing = configure which parameters in a neural network update on which tasks. We can control which parts of an NN learn which digits on MNIST! 
1. We can induce interpretable features in NN! 
	- Ie. route the token `_California` to the 0th dimension of the residual stream in a Transformer
2. We can scale oversight = train RL policy even with limited ability to score its behavior!
	- **During training with oversight**: Route gradients through the expert corresponding to the square type reached (diamond expert for diamond, ghost expert for ghost). Then we have 2 experts that have to be experts on their topic (even though we couldn't give oversight for every single square!)
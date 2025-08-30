### Setup
- First paper to try editing for encoder decoder models 
- So powerful because it can work off of one example
- Fixes:
	1. Hallucinations: specific oscillatory hallucinations can be corrected 
	2. Data Poisoning: input data pattern generates a particular error pattern
	3. A translation where just a single word is off can be fixed
### Process
1. Rank One Editing:
	- Think of a transformer in 2 parts. 
		1. MLP layer: contains all knowledge about the world. Think of it as storing many pairs of keys and values ex. key = (Eiffel Tower Location?) value = Paris 
		2. This feeds into the attention layer which is responsible for integrating the knowledge into the current sentence
	- Causal Tracing: corrupt parts of the input embeddings to get a corrupted output. Then try restoring some states of neurons from before the corruption. The combination that leads to a correct output (even while some embeddings are corrupted) is where the knowledge is stored 
		- Initial Knowledge Retrieval: Finds the neurons responsible for retrieving certain facts in the MLP (these will be edited) 
	- A mathematical approach finds the best way to add the new key-value pair (without disrupting the rest of the layer). Outputs an update to the weights in layer
		- The way the MLP works is it goes from an original vector generated in the first step of an MLP, through a matrix, transformed to a key vector 
		- The authors update this matrix to make the pairing between the original vector (key) and output vector (value) different ![[Screenshot 2024-01-23 at 4.10.03 PM.png]]
1. Make it Work For Encoder Decoder Settings
	- For sequence to sequence tasks, use both a positive and negative example to correct the error in the model. 
		ex. Nosotras corrimos 3 metros: we ran 3 meters, we ran 3 miles
		- Simply modify layer so that miles is transformed to the meters
	- There may be multiple layers so apply the edit on each of the encoder FF layers to find where it works best
### Results
- Editing worked quite well and generalized to nearly 30% of examples but it dropped overall model performance on the main benchmark significantly
- Seems like this approach is better for decoder-only models unfortunately
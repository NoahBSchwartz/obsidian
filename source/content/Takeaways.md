# Interp Video
Many features are rare and only a few are common enough for us to see them (like the brightest stars among a universe of dark matter)
1. The first 15 layers don't seem to do much for the final token's embeddings but then the 16th layer activation is the thing that really makes the difference


a single weighting vector groups neurons together for a single concept. a sparse autoencoder is a collection of a ton of these weighting vectors (len = # of concepts). 

All i need to do is learn weighting vectors for correct vs incorrect groups right? So just train an SAE to group neurons which lead to correct vs incorrect

Just like an SAE, we only want a very small number of concepts to be active at once 

We're not trying to reconstruct output, only reconstruct output loss.

1. Activation Matrix * Weight Matrix1
2. Force most terms to 0 = Sparse Matrix
3. Sparse Matrix * Weight Matrix2 
4. How well does this predict model loss
	1. Is "layer loss" a thing? like through backprop? could we train this per layer using a layer loss objective


Idea: look at how close a data point is in space to other data points that came before it? ig i just figured this wasn't specific enough. I thought that things can be close for many different reasons. but if we have the basis of activation space can't we just objectively find the distance between 2 points in activation space?

And then MAD would look just like using a feature basis consisting of the few most important possible features and figuring out the distance between points in that special teeny tiny space.

Surely I'm thinking of this wrong, i need to check

# Backprop Video
Each neuron learns a simple linear model!!! And back propagation is just an efficient process to update these linear models
1. A single weight going into neuron with a bias is just the equation of a line! I can't believe i didn't realize this
	- So then multiple weights going into a neuron is just like a single instance of [[Linear Regression]]? (with more weights being just higher dimensional linear regression)
	- ==Check this==
2. That would mean that an NN is a bunch of linear regression units all connected together? (with added non-linearities
Each neuron is just a line which tries to find the right tilt 




The example of maps and stuff he showed in the video could have been accomplished by saving all data points and then in deployment just finding which data point was closest to which group. This makes me think that I've been kinda dumb and so I should just train an NN on top of neuron activations

UMAP algorithm reduces high dimensions to low dimensions while preserving the distances between points. this doesn't give us separate groups for separate concepts as we might've expected though![[Screenshot 2025-08-06 at 7.23.28 PM.png]]

"The disconnected parts in the space of language all have to map to the same next token of paris and it's up to our model to figure out how to partition and reshape our space to achieve this"
# Deepseek Video
1. Tokens go in and each token gets an embedding vector, larger models give larger embedding vectors to tokens which can go and store language
2. Attention Head: use the data coming into a layer to initialize weights in a new neural network and then process the data using that neural network
	1. Create a key matrix, Create a query matrix, Matrix multiply to find which queries are interested in which keys. Then cutoff the upper triangle so no cheating! (and normalize and softmax). This is the attention pattern 
	2. Use the input data to create one more value matrix
	3. Use the attention pattern to initialize a neural network. Send the value matrix through the neural network and out the other end
	4. Do this for a ton of different heads (each one will hopefully have a different job like one searches for adjectives, another searches for verbs, etc.)
3. Improvement: project attention head input into a compressed latent space, then we can share this across all attention heads and project it back up 




- Similar vectors (ie. vectors w similar values in each slot) generate high dot products
	- Should I use dot product to figure out which datapoints are similar in my estimator?
	- We can do this for every combination of datapoints at once by simply doing a matrix multiply 


Multi-query attention heads use the same key and value matrix for all blocks in the head which might help us out for interpretability purposes? 
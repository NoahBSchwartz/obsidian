Regular Autoencoder: a neural network designed to compress and then reconstruct its input data (100 dimensional -> 50 dim -> 100 dim)
Sparse Autoencoder: same as regular autoencoder but the middle layer can be any number of dimensions (100 -> 200/30/50 -> 100). The only constraint is that the middle layer be sparse  (100 -> 200 -> 100, but there are only 20 non-zero elements in middle 200 dim matrix)
# Uses
We apply SAEs to the intermediate activations within neural networks (ie. take the 100 dimensional vector passed between layer 27 and 28 and train an SAE to go 100 -> 200 -> 100 with sparse matrix)
- Note: each layer also has intermediate steps (ie. relu to bias to output) and we can put SAEs anywhere between these intermediate steps too
[[Sparse Crosscoders for Cross-Layer Features and Model Diffing]]

[[CNN Explainability]]
Just like a regular NN with neurons but add in convolution transformation and pooling (so that we can conserve parameters bc images are such large inputs). ![[Screenshot 2025-10-27 at 3.51.08 PM 1.png]]
# Building Blocks![[Screenshot 2025-10-27 at 4.18.40 PM 1.png]]
1. Convolution (aka filters): Take in high dimensional input and filter![[Screenshot 2025-10-27 at 4.08.09 PM.png]]
	- Locality: Just connect pixels that are close together (don't connect all together)![[Screenshot 2025-10-27 at 3.54.54 PM.png]]
	- Weight Sharing: an image might have the same properties in multiple spots. Use the same filter over multiple spots
	- Bias Term: add in one bias term per filter
	Note: for RGB using 1 filter we use a different filter for each channel and then take their average (ie. 1 filter = 11 x 11 x 3)
	Note: if step size is 1 we have same dimensionality before and after filter. With step size 2 we can cut dimensionality in half 
2. Pooling (reduce dimensionality!!) : summarize output of convolution into aggregated output (low level representation -> high level)
	- Max-Pooling: we don't care about the exact location of an eye, use pooling (by taking max) over many neurons to just make the eye representation matter 
3. Feedforward Network: go from flattened embedding to actual output
# Gotchas
1. `Zero Padding = same` means that input is same dim as output (if not the same, then we do `Output dimension = (Input dimension - Kernel size)/Stride + 1`)
# Questions
1. For interp work could we use weight sharing (do NN weights have stationarity property?). They might if we think in terms of feature space
2. How tf did people come up with this? this seems so convoluted
3. In pooling, how does just taking the max of embeddings help us cut out just the info we don't care about (like eye position)? shouldn't it be pretty bad
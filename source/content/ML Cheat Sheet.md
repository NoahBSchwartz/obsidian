# Module 7
Forward Propagation: ![[Screenshot 2025-11-19 at 10.44.06 AM.png]]
Back Propagation: 
# Module 8
### CNNs
- Bias Term: add in one bias term per filter
- Note: for RGB using 1 filter we use a different filter for each channel and then take their average (ie. 1 filter = 11 x 11 x 3)
- Note: if step size is 1 we have same dimensionality before and after filter. With step size 2 we can cut dimensionality in half 
2. Pooling (reduce dimensionality!!) : summarize output of convolution into aggregated output (low level representation -> high level)
- Max-Pooling: we don't care about the exact location of an eye, use pooling (by taking max) over many neurons to just make the eye representation matter 
2. Feedforward Network: go from flattened embedding to actual output
3. `Zero Padding = same` means that input is same dim as output (if not the same, then we do `Output dimension = (Input dimension - Kernel size)/Stride + 1`)
### LSTMS
Fix vanishing gradients 
# Module 9
# Module 10

Nets that operate on sequences. One-to-One mapping, One-to-Many, Many-to-One, Many-to-Many
# RNNs
The same weights are used at every single step. We update hidden representations over and over ![[Screenshot 2025-10-29 at 4.35.24 PM.png]]
![[Screenshot 2025-10-29 at 4.36.41 PM.png]]
- Sample character and feed back to model one at a time (just like transformer)
	- Backprop: forward through entire sequence to compute loss then backward through entire sequence to compute loss. Leads to vanishing gradients (ie. loss from last token can't effect first token), gradient clipping ---> LSTM is solution!

- Cool Things: Train CNN to output a single word, then use it as an RNN to generate a whole sentence about image!![[Screenshot 2025-10-29 at 4.42.26 PM.png]]

# LSTMs
Fix the gradient issues of RNNs. Remove information no longer needed. Add information likely to be needed for later![[Screenshot 2025-10-29 at 4.48.26 PM.png]]
1. Cell-State = memory
	- Forget Gate Layer: decides what information to throw away from previous cell (using sigmoid)
	- Input Gate Layer: decides what information to store in cell state (pass info into Context layer w tangent)
2. Update Cell State: ![[Screenshot 2025-10-29 at 4.47.28 PM.png]]
	- This lets use maintain more information through time! (ie. first token can influence last)
3. Backpropagation: fixes vanishing gradients! (ie. last token can affect first token during backprop)
	- Cell state in the LSTM results from element-wise multiplications with previous cell states (so we can backprop directly through)


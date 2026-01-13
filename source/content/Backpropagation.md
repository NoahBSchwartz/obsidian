Figure out how to update a given neuron in a neural net given just the output loss ($\delta_n$)
1. Neuron Errors: Propagate all deltas backward through the network
	- Neuron k error = how much does small change to neuron k impact final result (slope of activation k * SUM(all future weights and errors)): ![[Screenshot 2025-10-20 at 4.29.01 PM.png]]
2. Find Partial Derivative for certain weight: for weight connecting neuron in layer l-1 to neuron in layer l: ![[Screenshot 2025-10-20 at 4.28.38 PM.png]]
3. Weight Update: To update the weight connecting neuron in layer l-1 to neuron in layer l:  ![[Screenshot 2025-10-20 at 4.29.34 PM.png]]
![[Screenshot 2025-11-19 at 2.22.36 PM 1.png]]
# Improvements
1. Adam/AdaGrad/RMSProp: (small learning rate for large weights) when adding computed gradient to a weight, divide by l2 norm of weight 
	- If weight has changed a ton during training it may need to stop being updated sooner than other weights
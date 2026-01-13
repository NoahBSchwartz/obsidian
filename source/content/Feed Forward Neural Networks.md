# Perceptron
Perceptron = [[Linear Perceptron]] with a special activation function = [[Logistic Regression]]
1. Single Perceptron = Binary Logistic Regression ![[Screenshot 2025-10-15 at 3.46.50 PM.png]]
2. Multiple Perceptrons = Multi-Class Logistic Regression ![[Screenshot 2025-10-15 at 3.45.42 PM 1.png]]Each neuron adds an extra decision boundary: ![[Screenshot 2025-10-15 at 4.41.16 PM.png]]
Takeaway: Can be equivalent to binary logistic regression, Linear Perceptron (if we have no activation function), or even [[Linear Regression]]/Non-Linear Regression (if the activation function is a diagonal line (identity f(x)=x))
# Multilayer Perceptron
Put a bunch of perceptrons together and add a bias at each connection 
![[Screenshot 2025-10-15 at 4.00.08 PM.png]]
[[Backpropagation]]
# Improvements
1. Change hidden layer activation function (output layer activations depend on task)
	- Hyperbolic Tangent: sigmoid centered around 0 (helps give us negative and positive updates but still between -1 and 1)
	- ReLU: not bounded between -1 and 1 so helps networks train faster (ie. backprop can dramatically update weight to -3.5 and won't affect overall net as drastically)![[Screenshot 2025-10-22 at 4.14.19 PM.png]]
# Questions
1. Difference between linear perceptron and perceptron? 

Trying to draw a line between classes (parametric model). Weight each input, see if we're above or below threshold
# Background
 1. If we get line with equation  then the vector perpendicular to it is $w = [w0, w1, w2]^T$
 2.   We can apply this to higher dimensions too! The vector perpendicular to a hyperplane w1x1 + w2x2 + . . . + wD xD + w0 = 0 can be written as $w = [w0, w1, w2, . . . , wD ]^T$
# Linear Perceptron 
1. Training:
	- Conceptual:
		- Start with some line between classes and try to improve it
	- Mathematical:
		- Randomly Initialize line
		- Think of the vector $w$ perpendicular to the line. We want it to point in the right direction (so that for each sample, $sign(w^Tx)$ is correct)
		- Randomly pick a misclassified example, either:
			- It belongs to the positive class: update the weight: $w(t + 1) = w(t) + x_i$ (because this will shift the line so that $x_1$ lies on the right side of the line)
			- It belongs to the negative class: update the weight: $w(t + 1) = w(t) − x_i$ ![[Screenshot 2025-09-15 at 3.59.41 PM.png]]
2. Run inference:
	- Conceptual: 
		- Simply add up everything and see if we're above or below threshold ![[Screenshot 2025-09-15 at 3.42.38 PM.png]]
	- Mathematical: 
		- Use matrix multiplication with the perpendicular vector! $w = [w0, w1, w2, . . . , wD ]^T$![[Screenshot 2025-09-15 at 3.48.54 PM.png]]
# Implementation Details
1. Learning Rate $α$ for the update of weights at each step: $w(t + 1) = w(t) ± αx_s$. Decrease over time 
2. Data must be linearly separable!
3. Runtime: PLA is a local greedy algorithm which can lead to an exponential number of updates of the weight
4. Apply to more than 2 classes: use multiple linear perceptrons: ![[Screenshot 2025-09-15 at 4.25.49 PM.png]]
# Questions
1. where is the transpose coming from here $sign(w^T x_s) = y$
2. 
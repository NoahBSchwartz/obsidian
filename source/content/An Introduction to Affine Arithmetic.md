Like normal interval arithmetic (takes intervals as input and produces intervals as output), but the intervals are APPROXIMATIONS which leads to increased accuracy
# Background
- Ideal Quantity: the (unknown) real value of the variable in the error-free computation being approximated
1. Self-Validated Algorithm: keeps track of the error for every number it computes (and you can see the error after the program completes)
2. Interval Arithmetic ([[Introduction to Interval Analysis]]): we want to be able to estimate error BEFORE we run program so interval analysis goes through the program beforehand with an interval of numbers
	- The ideal quantity of every variable will fall somewhere in the interval
3. Interval Arithmetic Overestimation: the problem is that if 2 intervals are slightly correlated interval analysis way overestimates 
	- Overestimation is proportional to amount and sign of correlation: this can lead to overestimation of several orders of magnitude
# Affine Arithmetic
Affine Arithmetic keeps track of correlations between the intervals that its working with
1. Affine Form: represent each variable with a polynomial (instead of an interval) ![[Screenshot 2024-12-15 at 3.58.33 PM.png]]
		$\hat{x}$ = prediction, $x_0$ = central value of the affine form, $x_i$ = partial deviations, $\epsilon$ =noise symbol
	1. Start prediction at $x_0$
	2. Each term is a different component of the uncertainty of x 
		- $\epsilon$ is the single component and can vary from -1 to 1 (ie. $\epsilon  = [-1, 1]$)
		- $x_i$ is magnitude of uncertainty (aka. how much varying $\epsilon$ affects our prediction)
	You can assign the terms in the equation correctly to get back to the true value (Ideal Quantity)
2. Converting between Affine and Interval
	- Affine Arithmetic to Interval Arithmetic: $\epsilon$ can vary from -1 to 1 so we'll just treat each one as an interval and then observe how much $\hat{x}$ varies
	- Interval Arithmetic to Affine Arithmetic: if we're predicting a variable with an interval ie. $\overline{x} = [-2, 2]$ then we can turn this into a polynomial really easily (make $x_0$ the midpoint and make $x_1$ the width (remember we'll still let $\epsilon  = [-1, 1]$))![[Screenshot 2024-12-15 at 4.15.53 PM.png]]
3. Modeling Correlation: the same noise symbol $\epsilon_i$ can be used in 2 different polynomials!
	ie. If 2 different variables have some part of themselves that is correlated we can model this 
		(and we can also model one variable really depending on this correlation while the other only slightly cares because we use $x_i$ as magnitude of uncertainty)
	- Joint Range ($\hat{x}, \hat{y}$): we have a prediction for variable y and a prediction for variable x. Their joint range is just placing the x prediction interval on x axis and y prediction interval on y axis. If they're correlated, the possible box it falls into is smaller ![[Screenshot 2024-12-15 at 4.44.13 PM.png]]
		If the variables are perfectly correlated then this is just a point
4. Replace Normal Equations with Affine Arithmetic: ie. how do you pass Affine Variables through a function
	For $z = f(x, y)$ the replacement looks like this:![[Screenshot 2024-12-15 at 4.51.39 PM.png]]![[Screenshot 2024-12-15 at 4.52.30 PM.png]]
	Now we just need to actually apply the function to all of the terms (figure out what the affine form of $z$ is):
	- Case 1: the function $f$ is an Affine Function (ie. $f(x, y) = x + y + 5$)
		Just rearrange the formula to make z into the affine form (ie. $z = q_0 + q_1\alpha_1...$)
			$z = (x_0 + y_0 + 5) + (x_1\epsilon_{x1} + y_1\epsilon_{y1})\alpha_{1} + (x_2\epsilon_{x2} + y_2\epsilon_{y2})\alpha_{2}...$ 
	- Case 2: Non-affine operations (ie. $f(x, y) = xy$)
			Setup an approximate function for z which is affine $z = f^a(\epsilon_1...\epsilon_n) = z_0 + z_1\epsilon_1 + ...$
			Add another term to represent error of transforming normal function to affine: $z = f^a(\epsilon_1...\epsilon_n) = z_0 + z_1\epsilon_1 + ... + z_k\epsilon_k$
		Ex. When multiplying 2 affine variables together (non-affine transform), multiply their equations and then factor into z = (part) * (part). Then add an error term![[Screenshot 2024-12-16 at 12.02.14 PM.png]]

# Application
- AA's advantage is more pronounced with smaller input intervals (estimates can be made very tight)
- AA is generally too memory and time intensive to be used on large NNs
# Efficient Neural Network Validation with Affine Forms (Paper #2)
This paper ignores the activation functions of the NN and just verifies the rest (just input * weight + bias)
1. Represent a certain input j to the NN as $\hat{j} = c_j + ν_jc_jε_j$ where $c_j$ is the value of input j, $ν_j$ is the intensity of noise, and $ε_j$ is the error symbol (in this case the intensity of noise for all neurons is just $ν = 0.2$)
2. 
# Questions
1. This is just [[Linear Regression]]
	- This is also literally the same equation used for Neural Networks and KANS (it's just weights and biases). That's beautiful

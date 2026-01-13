# Background
- Non-Linear Regression Example
		Ex. $HR = w0 + w1*Feature1 + w2*(Feature1)^2 + w3*log(Feature1) + w4*e^{(Feature1)}...$ 
		Ex. $HR = w0 + e^{(w4 * Feature1)}...$ 
# Regularization
 - Biggest Issue is avoiding overfitting! (ie. we have to get the right number of features or else we overfit)
	However, there is a balance between # of features (ie. order of polynomial) and data points so we use one to make up for the other
- Solution: change the loss function to prevent weights of higher polynomials from getting too large (ie. having super high orders influence curve too much). 
	- Regularization: we have Evaluation Criterion we are trying to minimize but also penalize the size of the weights during the process![[Screenshot 2025-09-29 at 3.55.34 PM.png]]![[Screenshot 2025-09-29 at 4.05.51 PM.png]]
		- Which means we can still find closed-form solutions for models when using regularization!
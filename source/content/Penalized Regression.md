w**ORDER BY count(*) DESC LIMIT 3**Linear regression says take all the data available to fit the model, leads to overfitting (ie. for 9 features we have 2^9 different possible models). What if we use all of the features but only a little bit? When we try to find optimal values for our thetas, for a specific dataset there is a specific min (specific best model) but for new data there's a new min (new best model)![[Screenshot 2024-11-20 at 4.13.37 PM.png]]
	If you make the box bigger, you get closer to the optimal value in training but generalizes less well (allows more features in the model/ more complexity). Small box means we don't need to look at many features (in the image, the model only cares about the x-axis)
# Penalized Regression
1. Increasing Regularization: make the box that the model is allowed in smaller (increase regularization penalty hyperparamater)
	- Choose regularization penalty by:
		1. Cross Validation (just test a bunch and see whats best)
		2. Domain Knowledge (know that you want the best 4 features and change penalty to accomodate)
2. Standardize: all data must be standardized to make the model view all features fairly
3. Penalties: 
	1. L1 Regularization: Diamond shape which means it will throw out features (sparsity inducing)
		- You can throw all the features at the model and use regularization to decide which features to use (if 2 features are correlated the model will throw one out)
	2. L2 Regularization: Ball shape which means it doesn't throw out features and just weights them (weight sharing)
	3. Combo of both (Elastic Net): throws only a few features out 
4.  Inference (Interpreting Theta): We have a bunch of different slopes (thetas) for our different features. We can use confidence intervals (hypo tests) to figure out which thetas are statistically significant and which ones could have been 0 by chance (see [[Linear Regression]]). Then throw out all that aren't statistically significant (where CI includes 0)
		Warning: If all parameters could have had a theta = 0 that means were looking at too many correlated features of the model (Can I use this to trim down a NN? [[Interpretability]])
# Examples 
```python
import sklearn.linear_model as lm
lasso_model = lm.Lasso(alpha = 1) 
lasso_model.fit(X_train_centered, Y_train)
lasso_model.coef_
```

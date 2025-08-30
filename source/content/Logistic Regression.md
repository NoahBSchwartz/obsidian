We're interested in predicting some category (ie. is the image a dog or cat)
# Background
- This is normal linear regression![[Screenshot 2024-12-02 at 3.45.39 PM.png]]
- Extend to be categorical: a line is clearly not best (so bin the data and plot their average to find S-curve)![[Screenshot 2024-12-02 at 4.05.12 PM.png]]
	When we bin and take the average, we're finding the probability that a tumor is malignant in a certain bin. Logistic Regression models this probability. 
# Logistic Regression
1. Setup![[Screenshot 2024-12-02 at 4.11.58 PM.png]]
2. Loss Function: we want to make a loss function that finds the best parameters in the context of the data
	- Motivation:
		- Past Loss Functions: Squared Loss or Ordinary Least Squares (try to minimize Mean Squared Error).
			Issue: there are some local minima that make the model get stuck (ie. the Mean Squared Error is a Non-Convex loss function!)![[Screenshot 2024-12-04 at 2.25.30 PM.png]]
			Issue: MSE also only penalizes a max of 1 (where if we're way off we want to penalize more)
			Issue: MSE tries to match class labels to probabilities (where we should really match labels to labels or probs to probs)
		- Maximum Likelihood Estimation: suppose you observe some outcomes that are 0 or 1, what would the next flip be? 
			It's reasonable to just have 1 parameter and set it equal to the likelihood of next flip being 1 (and round up or down). ie. For 10 flips where 4 = H and 6 = T:![[Screenshot 2024-12-04 at 2.38.59 PM.png]]
			Now generalize this to any random binary sample: assume all are IID with same probability p. Then theta = ![[Screenshot 2024-12-04 at 2.43.58 PM.png]]
			If they are IID with different probability p, Then theta = ![[Screenshot 2024-12-04 at 2.45.59 PM.png]]
			Maximum Likelihood Estimation: how could we choose different probabilities p for every term to maximize our theta value (our likelihood estimation)![[Screenshot 2024-12-04 at 2.48.40 PM.png]]
				Note: to solve this more easily we take the log of the equation, convert it to a summation, and invert it (minimization problem)![[Screenshot 2024-12-04 at 2.54.36 PM.png]]
	- Loss Function: Cross Entropy Loss (Minimizing Cross-Entropy Loss is equivalent to maximizing the likelihood of the training data)
		- To estimate the min each of our p's we can use logistic function (because the logistic function gives probability of response being 1)![[Screenshot 2024-12-04 at 3.00.43 PM.png]]
		- Cross-Entropy Loss: The curve is finally convex (we can see this by plotting)![[Screenshot 2024-12-04 at 8.33.02 PM.png]]
3. Fitting The Model:
```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression(penalty = None)# no regularization, model with intercept (default)
model.fit(X, Y)
model.intercept_, model.coef_ #you can get info like other models
model.predict_proba([[15]]) #gives array of 2 numbers, first is prob of y=0 and second is prob of y=1
model.predict([[15]]) #gives actual value of 0 or 1 (default cutoff for prediction is prob=0.5)
```
4. Evaluating the Model:
	- Accuracy = `number of points classified correctly / total number of points` (not great when trying to classify very rare events)
	- Confusion Matrix: better than accuracy because it tracks every kind of error/success![[Screenshot 2024-12-04 at 9.09.25 PM.png]]
		- Precision (AKA False Positive Rate): of all observations that were predicted to be 1 what proportion were actually 1
		- Recall (AKA True Positive Rate or Sensitivity): of all observations that were actually 1 what proportion did we predict to be 1![[Screenshot 2024-12-04 at 9.15.01 PM.png]]
		To prioritize precision or prioritize recall: use validation dataset to tune params
		1. Add more terms to your model/ Feature Engineering
		2. Change Classification Threshold (ie. if our model predict 55% probability do we go to a 1 or 0): as we increase the threshold we increase Precision and decrease Recall and try to get to best accuracy
			Note: we should use cross-validation when tuning classification threshold
			Note: you can use an ROC curve to find best tradeoff (plot true positive rate vs false positive rate) ![[Screenshot 2024-12-09 at 4.12.30 PM.png]]
```python
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(Y_true, Y_pred)
```
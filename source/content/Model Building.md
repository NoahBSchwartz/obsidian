(1) We want to try to explain complex phenomena (interpretability is key)
(2) We want to try to make accurate predictions about unseen data (could be black box)
(3) We want to try to make causal inferences about if one thing affects another
- Statistical Models: start with IVs (inputs/features) and DVs (outputs/responses). Predictions will have a hat over them
	Parametric Models: described by a few parameters, goal is try to get best prediction of output given input
	Example With Constant Model:
	1. Choose a model
		- Constant Model: don't sort your data, just predict one constant (equivalent to summary statistic)
			Ie. what is the mean of my data?
	2. Choose a loss function: characterize the cost, error, or fit resulting from a particular choice of model (how bad a prediction is)
		- Squared Loss: Called L2 loss (if y is a bad prediction it will look really bad)
		- Absolute Loss: Called L1 loss (have to use abs or squared because it doesn't matter if you're higher or lower than target) 
	3. Fit the model: 
		- Average loss on the sample tells how well the model fits the data (Mean Absolute Error is L1 Loss Averaged, Mean Squared Error is L2 Loss averaged)![[Screenshot 2024-11-20 at 3.10.10 PM.png]]
			- Mean Squared Error is smooth so you can use calculus to minimize (but super sensitive to outliers)
			- Mean Absolute Loss is piecewise so can't use calculus (but not sensitive to outliers because it looks at median)
		- ArgMin = argument that minimizes loss (ie. the mean for MSE). (10 for the image below)![[Screenshot 2024-11-20 at 3.11.58 PM.png]]
	4. Evaluate the model 
		- Look at Root Mean Squared Error![[Screenshot 2024-11-20 at 3.16.40 PM.png]]
[[Linear Regression]]
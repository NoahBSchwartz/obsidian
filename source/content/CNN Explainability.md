32 * (3 * 3 + 1)
Interpretable = model can be understood on its own (linear regression, decision tree)
Explainable = needs an additional method for a human to understand how it works
- Model Agnostic: Feature relevance, (LIME: locally approximate models with simpler models), Textual Justification, Visualization
	- LIME: Approximates the decision boundary locally
		1. Take single sample
		2. Consider perturbations of the sample
		3. For each perturbation collect the original model's decision
		4. Estimate local model that is interpretable (regression model)
			- Impose sparsity constraint (so that most weights are 0). Only learns the weights corresponding to the most important features![[Screenshot 2025-11-03 at 4.07.04 PM.png]]
		5. Choose a representative set to show the user (features that explain many different instances have higher importance scores)
			- 
- Model Specific: Prediction Difference Analysis (assign relevance to how important a feature is to final decision) Support Vector Machines 
- 
# Questions
1. LIME on transformers?
2. Should I impose sparsity constraint for my research
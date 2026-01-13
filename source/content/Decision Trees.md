Partition the feature space using thresholds! Super interpretable!![[Screenshot 2025-11-05 at 3.43.40 PM.png]]
1. Conceptual: Determine features at each node: at each step choose the option to maximize information gain!
	- Minimize the average number of questions we need to ask by always asking the most informative question
		- If we have {x1...xn} outcomes with {p(x1)...p(xn)} probabilities then the information content xn is![[Screenshot 2025-11-05 at 3.59.25 PM.png]]
			If an event is unlikely to occur we get a ton of info!!
		- Entropy (measure of uncertainty) = weighted sum of information we get from outcome * frequency of that outcome ![[Screenshot 2025-11-05 at 4.00.50 PM.png]]
			Entropy is the average information content of the choices!
			Entropy = 0 means 0 uncertainty. 
				Note: We can take entropy of a distribution (here we've arranged from 0 entropy to 1 entropy)![[Screenshot 2025-11-05 at 4.06.04 PM 1.png]]
		- Gini Index: faster to compute (doesn't compute log) but about equivalent to info entropy
2. In Practice:
	- Compute the information entropy of the outcome for each feature. Use feature that had lowest entropy
	- At level number 2 just use the number of samples that got to that level of the tree
	- At level number 3...![[Screenshot 2025-11-05 at 4.20.18 PM.png]]
3. Tuning
	- Mitigate Overfitting 
		- Pre-Pruning: less depth of tree leads to less overfitting 
			(reduced depth leads to decisions we need to make by majority voting)
		- Post-Pruning: randomly remove a leaf node from tree to see if it reduces overfitting![[Screenshot 2025-11-05 at 4.28.53 PM.png]]
# Regression Tree
Same as Decision Tree but for our criteria we don't use Entropy. Just minimize the mean square error between predicted and actual value of samples that have reached current node. (Lead node value = mean of samples, Stop when leaf node has acceptable error)
# Random Forests
- Bagging (bootstrap aggregating) = bootstrap (ie. randomly select subset to get) many datasets from original and train a decision tree on each
	- Randomize over attributes = randomly select nodes to split on sometimes
Majority vote over trees for final decision
- Gradient boosting: train trees sequentially and find the samples which have worst error, prioritize those when building the next tree
# Questions
1. Feature can repeat!!? *If thresholding
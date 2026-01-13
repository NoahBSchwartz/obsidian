[[Optimization]]
[[Feed Forward Neural Networks]]
[[Convolutional Neural Networks]]
[[RNNs and LSTMs]]
[[Decision Trees]]
# Background
- Linear Algebra Notation:
	- $L_2$ norm = $||x||_2$ (square every element of x, add up, take sqrt)
	- $||x||_0$ = total number of non-zero elements in vector
	- Euclidean Distance between 2 vectors = $\sqrt{(a1-b1)^2 + (a2-b2)^2 + ...}$
	- Inner Product is super useful:![[Screenshot 2025-09-03 at 4.22.00 PM.png]]
	- Cosine Similarity: ![[Screenshot 2025-09-03 at 4.22.58 PM.png]]
	- Differential Operator $\Delta$: just take derivative of function and make into vector![[Screenshot 2025-09-03 at 4.26.18 PM.png]]
	- Sets:![[Screenshot 2025-09-03 at 4.24.56 PM.png]]
- Vocab![[Screenshot 2025-09-02 at 10.03.13 AM.png]]
- L1 and L2 Geometrically: assume origin is the first point and we find the set of all points equidistant from it (under both L1 and L2) and then pick the best point for our optimizer:![[Screenshot 2025-09-15 at 3.18.43 PM.png]]
# Machine Learning
- 3 Components of Learning
	1. Representation: the kind of model we use for our data (ie. K-nearest neighbor, decision tree...)
	2. Evaluation: assess fit of model to data (ie. squared error, K-L divergence)
	3. Optimization: find the highest-scoring learner (ie. greedy, beam search, gradient descent)
- 3 Types of Learning
	1. Supervised/Predictive: labelled data (eg. input-output pairs and look at accuracy)
		1. Goal: learn mapping from inputs $x_i$ to outputs $y_i$
			- Function Approximation: $f$ is unknown and we approximate it to get $y = f(x)$
		2. Definitions: $x_i$ is a vector where each values is a feature, $y_i$ is usually a single value
		3. Dataset: $D = {(x_i, y_i)}^N _{i=1}$ (we have multiple data point pairs)
		4. Data Matrix: ==fill in== $X = [x_1^T... x_N^T] \in R^{D \cdot N}$
		Types: Classification (output is categorical), Regression (output is continuous)
		- K-Nearest Neighbor (K-NN) Classifier: each test sample is assigned to the most common class among its neighbors 
			$y = f(x) = argmax(c=1, ..., C)$ 
			- Ambiguity: sometimes a point may be equidistant from 2 classes. Return probabilities
				- Find the posterior probability of the most probable class (probability of test sample belonging to class c given input vector x and the whole training set D)![[Screenshot 2025-09-03 at 3.51.49 PM.png]]
		- Regression: given a bunch of features $[x_1, ..., x_D]^T$ try to find the most important features for predicting output number
			- Linear Model: same number of weights as number of features. Multiply $w_1$ with $x_1$, $w_2$ with $x_2$...
				- [[Simple ML Examples (Supervised)]]
				- [[Linear Perceptron]]
				- [[Logistic Regression]]
			- Non-Linear Model: 
	2. Unsupervised/Descriptive: unlabelled data and just discover things (eg. cluster data and then look at cluster coherence)
		- Clustering (K-Means): given set of samples with features, group them into similar clusters
		- Matrix Completion: we have a matrix and want to complete its elements (ie. recommender system where you fill in values)
		- [[Dimensionality Reduction]] (Principle Component Analysis, Singular Value Decomposition): lower-dimensional representations can make better predictions
	3. Reinforcement: interact with world (ie. supervised learning but you obtain the rewards overtime)
- Key Challenges
	1. Curse of Dimensionality: To fix, use feature engineering (make sure we have only high quality low number of features)
		1. As dimensions increase the amount of space covered by our training dataset decreases![[Screenshot 2025-09-08 at 4.42.22 PM.png]]
		2. If 2 features matter then the other 98 will make it impossible to focus on those 2 (if classifier is purely based on point distance)
		3. For a point in 9-dimensional space, the 18 closest neighbors are all equidistant from it which is bad! (100-d space -> 200 pts are close)
		Blessing of non-uniformity: in most cases, all examples are clustered on a lower-dimensional manifold (ie. handwritten digits take up a very small section of input space) so we can take advantage of this
	2. Generalization/Overfitting: must make sure we generalize well! To fix, use cross-validation, regularization (ie. make model simpler in training), validation set
		- [[Regularization]]
		- [[Feature Selection and Transformation]]
	3. No-free-lunch Theorem: no ML system will work optimally for all kinds of problems
# Classification Metrics
- Euclidean Distance (l2-norm):![[Screenshot 2025-09-08 at 4.08.35 PM.png]]
- Cosine Similarity: ![[Screenshot 2025-09-08 at 4.08.02 PM.png]]
- Measuring Neighbor nearness: Distances depend on the units of the features! (ie. if 1 unit is in cm and 1 in mm, then K-NN will focus on the mm a lot more!)
	- Make sure to normalize data! ![[Screenshot 2025-09-10 at 4.11.09 PM.png]]
 - Simple Classification Accuracy: number of correct / total (bad for unbalanced classes (ie. you could get 90% just by classifying all data as true))
- Balanced (macro) Classification Accuracy: number of correctly classified samples for class K / number of total samples for class K 
- F1-score: 2 · (Precision·Recall) / (Precision+Recall)
- Manhattan Distance: absolute value of distance
- Hamming Distance (for discrete data, number non-matching attributes): ie. if class K is predicted then HD = 0, if class K not predicted then HD = 1
- Confusion Matrices can show how good model is (if all samples fall along diagonal then we're good to go)
# Questions
If features are perfect indicators of datapoints then K-Nearest Neighbor should work perfectly? 
We can have guarantees on the results of induction, particularly if we’re willing to settle for probabilistic guarantees
Is it always the thing where if we make assumptions we can get computational tractability?!
# Gotchas
1. For sample $[10, 1]^T$ express in vector notation -> $[1, 10, 1]^T$
2. Make sure you know argmin 
3. Euclidean distance = l2-norm
4. If multiplying 3 matrices together, what order do you need to do it in?
5. $X^TX$ = L2 norm of X aka sqaure all elements and sum
6. Make sure you know all this simpification![[Screenshot 2025-09-17 at 4.08.57 PM.png]]
7. Know these rules (where theta means derivative)![[Screenshot 2025-09-17 at 4.10.02 PM.png]]
8. ![[Screenshot 2025-10-01 at 3.43.11 PM.png]]
- See [[pandas]]
	- `g = sns.pairplot(iris_df, hue="class", markers="+")` shows correlation between all features in data
	
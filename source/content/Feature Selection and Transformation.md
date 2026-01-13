How can we detect low dimensional structure in high dimensional data?
# Dimensionality Reduction
Remove redundant/irrelevant features
- Wrappers: train model a ton of times using all the different feature sets to find the one that it's most accurate on 
		Sequential Selection (add features that give better and better performance greedily), Recursive Backward Elimination (start w full feature set and start removing features that hurt performance), Genetic Algorithms (randomly select features upweight those that do better repeat)
- Filters: manually decide which features are most informative before training (look at correlation between feature and target we're predicting)
	- Minimize Fisher's Criterion: within-class scatter / between-class scatter 
- Embedded Methods: classifier performs feature selection as part of learning (just use L1 norm to select features for you!)
# Feature Transformation
- Linear Feature Transformation: transform original feature space to another space using 1 matrix multiply (change dimensionality, DxM matrix)
	Shrinking (scale all features), Rotations, Stretch into different shape (weight one feature more heavily)![[Screenshot 2025-11-10 at 4.37.30 PM.png]]
- PCA (Principal Component Analysis): learn the matrix used for the feature transformation above (find new dimensions that best capture variance)
	1. Try a bunch of different directions in feature space
	2. Find one direction so that when you project all datapoints to direction the variance is the largest (can also use: select the one that minimizes the projection error)
												![Principal Component Analysis (PCA): Explained Step-by-Step | Built In](https://builtin.com/sites/www.builtin.com/files/inline-images/national/Principal%2520Component%2520Analysis%2520second%2520principal.gif)
		Note: this works because correlations in data make some axes redundant! (for data with no covariance across classes we can't use PCA)
	3. Math
		1. Setup covariance matrix between all classes![[Screenshot 2025-11-12 at 3.55.34 PM.png]]
		2. Find eigenvectors and eigenvalues of matrix ![[Screenshot 2025-11-12 at 3.57.58 PM.png]]
		3. Project all data to a set (set size = desired dimensionality) of eigenvectors which have the largest eigenvalues![[Screenshot 2025-11-12 at 3.58.35 PM.png]]
		Note: remember that this is because eigenvectors form the basis for the space. Taking the largest eigenvalued vector [[Eigenvectors and Eigenvalues]]
	- Drawbacks:
		- PCA is not interpretable because it's compressing feature space only according to variance (doesn't care about classes). Sometimes this ends well and sometimes it doesn't![[Screenshot 2025-11-12 at 4.22.29 PM.png]]
		- Linear Transformation!!
- Autoencoders: PCA is a linear transformation, try doing a nonlinear transformation to the data! Encoder-Decoder architectures trained to reconstruct their own input data
	1. Encoder: compress representation of input (progressively smaller number of nodes)
	2. Bottleneck: most compressed representation of input
	3. Decoder: decompress representation of input (progressively larger number of nodes)![[Screenshot 2025-11-12 at 4.31.54 PM.png]]
# Takeaway
1. You can go from any number of dimensions to lesser number of dimensions with PCA (by creating feature space with top n largest eigenvectors)!!![[Screenshot 2025-11-12 at 4.05.16 PM.png]]
# Questions
1. An eigenvector is a vector that creates basis for a transformation. An eigenvalue is the amount of stretch that the vectors go through. So why are we doing this to a covariance matrix??
	- Answer: covariance matrix is giving us the relationship between each dimension. so this is like how would data be transformed if it went through the matrix of our dimension relationships. the top eigenvector is like the top direction that the data would most be stretched in. The second top eigenvector is the 2nd top direction that the data would be stretched in. 
2. Are first 2 eigenvecs always perpendicular? why?
	- Answer: Yes because the first gives the most information and the second can't overlap the first because the second gives the 2nd most information
			(and the third is perpendicular to both of them)
Variance might not always be the thing that gives the most info so NN might not match PCA
Can't always think of eigenvecs in terms of variance! Because here we're doing eigenvec of covariance matrix which is what gives us the variance 

what are bert-base embeddings
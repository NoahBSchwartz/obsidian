# Parametric Model 
Makes strong assumptions but computationally tractable (ie. there is a linear boundary)
1. Get line in slope-intercept form, express as classification function $f(d_1, d_2)$ (BMI = d1, # of relatives = d2)![[Screenshot 2025-09-08 at 3.43.44 PM.png]]
2. Express in Matrix-Vector Notation (stuff left of matrix w 1's, encode 3 inputs, multiply by coefficients from step 1!)![[Screenshot 2025-09-08 at 3.45.57 PM.png]]
# Non-Parametric Model 
Makes no assumptions but computationally intractable (ie. k-Nearest Neighbor can learn any boundary)
- Vanilla K-NN is to find distance from point you're trying to all other points. Return set of points that are minimum distance (argmin!)![[Screenshot 2025-09-08 at 4.10.25 PM.png]]
	![[Screenshot 2025-09-08 at 4.15.53 PM.png]] (for $x$ = test sample, $x_n$ = all training samples, take l2-norm and square for computational efficiency)
	(if you get a bunch of points, use majority voting)
- Problems
	- Computational Complexity (intractable!) = O(ND + NK) (D = dimensions (2 here), N = training samples, K = # of nearest neighbors) 
		(Find distance from test point to all points) + (Look through vector K times to find K neighbors)
	- Make sure to normalize your data!  Distances depend on the units of the features! (ie. if 1 unit is in cm and 1 in mm, then K-NN will focus on the mm a lot more!)
- Variations
	- Weighted K-NN: weight each neighbor by their closeness to the test sample ($w_k$ = 1/distance)
	- Condensed Nearest Neighbor: way to reduce time/space complexity (by decreasing number of stored train samples by only selecting interesting data points)
		- Randomly select 1 train sample $s_1$ and add it 
		- Select another random sample $s_2$ and find closest neighbor
		- If the closest neighbor is already in set, don't add $s_2$ to set![[Screenshot 2025-09-10 at 4.41.05 PM.png]]
	- KD-Trees: modified KNN to use KD trees to conduct more optimal search across space (structure the training data in the best way)
		Each cut in the D-dimensional space is represented as a tree node
		1. Choose a feature dimension (ie. x-axis)
		2. Sort according to axis
		3. Find median
		4. Set median as root
		5. Sort according to next axis (ie. y-axis)
# Hyperparameter Tuning
1. Cross-Validation: Good for hyper-parameter tuning so that you don't overfit!
	- Loop S times and get average: Get a dev set from data, train model w rest, find hyperparams that give best accuracy. Repeat whole process S times and average
2. Nested Cross-Validation: 
	- Split data into train and test randomly 
		- Perform cross-validation to find best hyperparams in the setup
		- See how well we do on test
	Repeat the whole process K times and average our performance on test set to get best guess of accuracy (ideal for super small datasets)

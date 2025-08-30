==Start off assuming neural net is random and then notice it’s structure overtime==
Proofs are able to generalize for problems way out of distribution because they follow logically so if we had a hard proof of an NN, we would trust it a ton. This talk is about estimating a proof; adding more and more observations until the predictions of the soft proof start to match (this helps us trust the NN out of distribution as long as no elements used in the soft proof change). Much easier than proofs because all it’s saying is neural net is aligned unless something changes. Detecting the change is the useful part (whereas normally you just run the thing, it might be too dangerous or expensive to just run the model)
The easy part is verification and the hard part is finding the observations needed for the proof 
- Game: start with a terrible predictor of model behavior (ie. how right a model is on a certain task) and then start gathering observations to get it closer and closer to predicting the behavior of the model ![[Screenshot 2024-06-03 at 1.52.38 PM.png]]
	- Find a G (proof verifier) that:
		1. Formalizes informal observations: you should be able to give an informal observation to G and if it's a convincing observation, it will lead G to output what you expect to be the right answer (even if you accidentally include arguments that are false or not relevant, the proof verifier should ignore those)
		2. Satisfies Coherence Properties: the best guesses that G outputs should be coherent with each other 
			- Linearity: Ask G to estimate the sum of f(x) over every x = go through each f(x) and have G estimate and then add all those answers up![[Screenshot 2024-06-03 at 2.18.42 PM.png]]
			- Generalizes for Proofs: If there's a proof that G's prediction should have some property, it better have that property regardless of all other observations it takes in (ie. the best guess must be less than 1.5 in the case of twin prime conjecture)![[Screenshot 2024-06-03 at 2.38.22 PM.png]]
			- Iterated Expectations: If we know probability of C and probability of D | C, then we know probability of D![[Screenshot 2024-06-03 at 2.43.03 PM.png]]
		3. Satisfies No Coincidence Principle: the lowest probability that G should give to any one of its predictions is 2^-|prediction length| (because 2^-|prediction length| = 1 added up for all predictions). Therefore, if it outputs a low enough probability for any prediction, more observations are needed to refine things 
			- AKA: for all outrageous coincidences, G must give a reason that they exist
- Example: 
# Questions
1. To check if an observation is true, you can just check if adding it to the proof verifier will get it closer to the right answer?
2. Could the coincidence principle be a sort of "loss" where the lower the number of coincidences, the better
3. Is X any formally defined quantity (see image) or can X only be task accuracy 
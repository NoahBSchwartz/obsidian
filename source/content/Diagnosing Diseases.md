Diagnostic classifies something as 0 or 1
1. Sensitivity: se = Pr(test is positive | subject is positive)
		`1 - Pr(FN | TP or FN)`
2. Specificity: sp = Pr(test is negative | subject is negative)
		`1 - Pr(FP | TN or FP)`![[Screenshot 2025-11-04 at 2.05.32 PM.png]]
# ELISA (Enzyme-Linked Immuno Sorbent Assay)
Try to go in and pull out antibodies to check concentration in a patient
- Challenges:
	- Immune Imprinting (original antigenic sin): if you get bad disease and then another similar bad disease, your body struggles to create antibodies for the new disease
	- Cross Immunity: we find different disease antibodies then we're trying to find
- Define Cutoff: if x > c -> Pos!, if x <= c -> Neg!![[Screenshot 2025-10-28 at 3.07.16 PM.png]]
	- If positive and negative controls don't overlap: you can choose any c in range (perfect sensitivity and perfect specificity on the controls)
	- If positive and negative controls do overlap: 
			se = TP / (TP + FN) 
			sp = TN / (TN + FP)
		- Youden Index = se(c) + sp(c) - 1 this for a bunch of different vals of c. Choose cutoff to maximize Youden
# Figuring out Testing Effectiveness  
You might think: Reduction in `transmission = isolated duration / total duration` but this assumes that disease is constantly infectious at all points. Take time into account! Now we can determine effectiveness using only: ![[Screenshot 2025-11-18 at 2.54.01 PM.png]]
1. Use Secondary Infections instead!![[Screenshot 2025-11-18 at 2.39.47 PM.png]]
2. Four elements vary with time:
	- Infectiousness (how infection changes), Administration (when is test administered), Detectability (is infection detectable at all times), Coherence (is patient actually complying with us)![[Screenshot 2025-11-18 at 2.42.27 PM.png]]
3. How do these interact: if we know when a patient tests positive and how much they isolate our curve looks like this![[Screenshot 2025-11-18 at 2.43.42 PM.png]]
4. Define the time we test at as a PDF
5. Use this to define Cummulative probability of diagnosing by time t
	- Depends on Administration and Detectability ![[Screenshot 2025-11-18 at 2.52.00 PM.png]]
		Note: we also need to incorporate how good we are at swabbing and how good 
Modify SIR model with this result!![[Screenshot 2025-11-18 at 3.03.05 PM.png]]

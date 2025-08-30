# Critically Assessing the State of the Art in Neural Network Verification
- Most algorithms only support ReLU-based networks
- This paper deals exclusively with methods about verifying NN's locally
# Verification of Neural Networks’ Global Robustness
- Background: Local Robustness verification doesn't extend to unknown inputs so use global robustness. But current global robustness algorithms still can't give bounds for when an NN is safe vs when it's dangerous
- Solution: The authors use adversarial inputs to figure out the bounds of robustness on the NN
- Result: The authors bounds have a gap of 
# Certifying Global Robustness for Deep Neural Networks
- Background: adversarial examples are a huge issue (datapoints that are still within domain but crafted to produce an error) and no heuristic detector so far has been effective against them
- Solution: Adapt PAC verification to the task of certifying the global robustness of DNNs (AKA use probabilistic programs to figure out which parts of the input distribution we can actually verify. Then make sure the verification meets a certain threshold)
# Multi-Hour Blood Glucose Prediction in Type 1 Diabetes: A Patient-Specific Approach Using Shallow Neural Network Models (Sriram)
- Background
- Solution: The authors use shallow NN's with a structure that incorporate physiological knowledge
	- Structure: 
		1. During training, they put constraints on the weights to make sure that insulin contributes negatively in the overall model
		2. They partition the first layer of the NN into insulin inputs and non-insulin inputs so that the model learns to pay special attention to the current active insulin
	- Steps:
		1. They start with a base model and then fine-tune it to the specific patient
- Result: They made sure to carefully curate the test set (because shallow models are prone to overfitting
# Conformance Verification for Neural Network Models of Glucose-Insulin Dynamics (Sriram)
This paper first does local verification of an NN to show it's bad. Then it incorporates rules into the NN during training to fix the defect
- Background: 
	- Domain of Validity: the region of inputs where the NN works (can be estimated by drawing a boundary around the set of all learning points). The author's goal is to quantify how well the network performs inside and outside the domain (they don't try to estimate the region, only look at the model's performance)
	- Conformance Specification: deals with seeing if an NN has all the key properties of a more complex model.
		- Conformance Testing: involves checking properties of NN by systematically performing experiments on the real model (it could still be formal if the real model is written in a formal language, but not formal verification because the actual rules of the system aren't checked (remember, we're dealing with a black box))
	- Real-Valued Conformance: in a previous paper (Probabilistic Temporal Logic Falsification of Cyber-Physical Systems) Sriram and his team changed conformance from T/F, to a continuous metric of how robust the model was
		- Falsification: this could be optimized to find counterexamples in the system 
	- Neural Network Verification
		1. Property Checking: if the input has a certain property, make sure the output has a certain property. "Historically posed as SMT problems over piece-wise linear abstractions of the activation functions"
		2. Image Computation: if the input has a certain property, make sure the output falls within a certain range
- Solution:
	1. Data Structure: 
	2. Local Verification: Range-Estimation Based Approach: the authors measure the degree of conformance of the model by looking at how different inputs affect model performance. 
		- Sensitivity Values: specifically, they look at how small changes in the input effect the output (if small change in input has large output change, the sensitivity is quite high)
		- Conformance to Monotonicity (ie. if input increases then output must decrease) Process:
			1. To show that a function's output decreases if its input increases, just make sure it's partial derivative W.R.T the input is never positive
			2. The issue is that NN's aren't differentiable everywhere (so not every datapoint can have a partial derivative). To solve, just use the definition of a derivative. Such a cool solution!
				- Just take your point and add a tiny value to it. If the output increases, then the function is monotonically decreasing at that point
			3. Formalizing this: formulate the problem as a range estimation; given a set of input values (with some constraint) find the range of output values
				- Then make 2 copies of the network, first has normal inputs and second has 1 input changed a tiny bit
				- Look at the difference between the upper bound of both networks to check if increasing or decreasing monotonically
			Note: So that the authors don't have to actually test on all possible inputs, they use an MILP solver to verify on whole ranges of inputs at a time. However, their new definition of monotonicity requires them to take a point and look at others close by. This is the reason for creating 2 copies of the network, they can run the MILP on both networks simultaneously and continue to do the comparisons (even though they are using a whole range of inputs) 
		- Verification
			- The authors do something that most papers don't because they verify that not only do the inputs and outputs satisfy a property, but the activation functions of every neuron in between also satisfy the property (need to fact check this)
	1. Incorporating Rules During Training
		- Maybe I can use the knowledge I got from reading all of Aaron's papers?
- Limitations: The authors use a clever solution of sampling many points in order to verify properties like monotonicity which require a differentiable function, the issue though is that even though this is a good start, it doesn't guarantee monotonicity (only gives us a pretty good guess that the property is fulfilled)
# Towards Reliable Neural Specifications
"To our best knowledge, this is the first time that a significant fraction of unseen testing images have been formally verified." The authors are able to do this by using specific Neural Activation Patterns to cut down the space that they're verifying
- Background: both Abstraction and Constraint-Based approaches suffer from only being able to verify one property of the NN, not multiple. (And this property must be formalized perfectly: think of formalizing the concept of robustness, where you could say an NN is robust if it resists an image being rotated but what if the image is in black and white?)
	- Type 1 Errors: When the model gives a false positive (a bad input is labeled as good)
	- Type 2 Errors: When the model gives a false negative (a good input is labeled as bad)
	- Precision vs Recall: Precision evaluates the correctness of positive predictions, while recall determines how well the model recognizes all pertinent instances
		- Precision = Focuses on how correct the positive predictions are (“Out of all the emails flagged as spam, what proportion were actually spam?”) ![[Screenshot 2024-08-20 at 4.05.36 PM.png]]
		- Recall = Focuses on trying to capture all relevant instances (“Out of all the actual spam emails, what proportion did the system correctly identify?”)   ![[Screenshot 2024-08-20 at 4.05.43 PM.png]]
- Solution: Look at the activations of a NN and prove that if you see a certain activation pattern, the NN will get the example correct (you can perform verification on unseen inputs!)
	1. Neural Activation Pattern (NAP) = `[Set of Activated Neurons, Set of Deactivated Neurons]` (where activated means neuron is positive and deactivated means neuron is negative). Some neurons are allowed to be either positive or negative
	2. A proof would be if one NAP corresponded to all inputs in one category (the NN would be 100% accurate). Possible when NAP = `[Empty Set, Empty Set]` but lets relax the proof to get actually valuable info (Net doesn't need to be 100% accurate)
		- Use a relaxation factor: If it's 1.0, the proof is most precise but the least specific (ie. it accounts for all inputs like in the case of `[Empty Set, Empty Set]`). Need somewhere in the middle where proof includes some valuable neurons and ignores some other ones (works on some percent of inputs)
	3. Verify that no input can fall under 2 different NAPS ![[Screenshot 2024-08-21 at 11.42.01 AM.png]]
	4. Formalize NAP verification: Set up the verification problem like this "For all inputs x that follow a NAP, the network's output for the class that the NAP corresponds to is greater than for any other class (`F(x)[i]-F(x)[j] > 0`)"![[Screenshot 2024-08-21 at 1.45.18 PM.png]]
		- On all inputs that belong to a certain class, 
	5. Mine NAPs: there's a tradeoff between trying to find all relevant NAPS vs trying not to find irrelevant NAPS. In the table (finding all NAPS for the # 0), as the relaxation factor goes from 1->.90 (left column), we find much fewer correct NAPS but also have much fewer incorrect classifications
		![[Screenshot 2024-08-21 at 11.37.06 AM.png]]
	6. Use NAPS to verify across unseen inputs: Set up the verification problem like this "Given an input x and a NAP which it falls into, the set of points within a certain radius of x that also satisfy the NAP specification will also still be correctly classified"
- Criticisms
	- "One might tempt to increase δ even further to verify bigger ϵ, but one must remember that comes with sacrificing the recall of the NAP"
# Learning Minimal Neural Specifications
- Exact Approaches: use the verification tool to find minimal NAPs
- Approximate Approaches: estimate minimal NAPs using adversarial examples and local gradients (without actually using verification tool)
# Formal Verification Techniques for Vision-Based Autonomous Systems – A Survey (NASA paper)
1. Verification with Probabilistic Abstractions for Perception: Learn distributions over the network and then check them with a checker to see how likely certain outputs are. This doesn't seem like a very strong form of verification at first but we can use the distributions at runtime to filter out all inputs which don't fit into the distributions as expected
# Detecting hallucinations in large language models using semantic entropy
# A Survey on Uncertainty Quantification Methods for Deep Learning
# Probabilistic Verification of Neural Networks using Branch and Bound
Verify with 100% certainty that the output distribution of a Neural Network has a certain property (with a specific lower and upper bound)
- Probabilistic Verification: 
# PROVEN: Verifying Robustness of Neural Networks with a Probabilistic Approach
Background: computing minimum adversarial distortion on neural networks with ReLU activations is shown to be an NP-complete problem so we can't scale it to large networks
# Towards Scalable Complete Verification of ReLU Neural Networks via Dependency-based Branching
Trying to mitigate the explosion that happens when verifying larger Neural Networks by dividing an NN into a set of different problems (based on which neurons are dependent on each other) and then solving each one using [[Mixed Integer Linear Programming]]
- Background: complete methods are more precise but must treat RELUs as-is. Incomplete methods (ie. abstration) are less precise but can scale to larger networks
- Goal: scale up complete methods (treating the RELU as-is)
1. Formulate problem as MILP and use branch and bound to solve. The search space is the space of all possible values that our variables can take on. Branch and Bound divides the search space up into branches (select a value for variable 1 and then select a value for variable 2...)
2. Goal is to reduce the space further: if the state of a neuron depends exactly on the state of another neuron (ie. if neuron 1 is 0.3 then neuron 2 must be 0.7) we can add this as a constraint to the MILP solver
	- Each constraint added cuts down on the number of branches we must look at in the search space
# INNAbstract: An INN-Based Abstraction Method for Large-Scale Neural Network Verification
Merge some neurons of the network to create an abstract one that is a sound overapproximation of the original network
1. Goal: for a given input region (defined by some constraints) check whether the NN’s generated output is within a safe output region (which we define with some constraints)
2. Encode: turn the input constraints, output constraints, and NN into a [[Linear Programming]] problem (NN verification is an NP-Complete Problem)
3. Merge: at a certain layer pick a subset of neurons that you want to merge. Add the absolute values of their inputs and outputs together (if not using an activation function like RELU) to merge them
	a. If we are using an activation function like RELU then we have to do more complicated math but the idea is still the same
# The Mathematics of Kolmogorov-Arnold-Networks versus Artificial Neural Networks
Very intreresting, directly compares complexity of NNs and KANs. ˝This could be super useful for the theoretical section of the paper!
# First three years of the international verification of neural networks competition (VNN-COMP)
- General Idea: Given an Input Specification, Output Specification, and Neural Network the goal is to try to verify that any input run through the NN will fall within the output
	1. Example: Verify that the NN gives the same classification for all points within a certain range of one another (this certifies robusntess)
	2. Example: Verify that if the input to an NN is below 0, the output will also be below 0
- Criticism: this competition is about verification when we already know what properties the output should have, this is not useful to (arguably) most real-world applications of NNs (where the reason we use an NN is because of the inherent unpredictability)
# Reachability Analysis for Cyber-Physical Systems: Are we there yet?
- Background: The reachability problem asks given a model, an initial set of configurations and a target unsafe set, whether the system starting at some initial state can reach an “unsafe” state in some finite number of steps
	- It's particularly hard to verify things across time-horizons because we need to think about (1) the continuous state of the system and (2) the switching behavior of the system 
		- Switching Behavior: if some event happens while the system is running, it must switch into a different state. We use the "timed-automaton model" which can trigger states at specified times in order to verify this. Below is an example of a model like this (four modes {m1, . . . , m4}, continuous state variables {x1, x2, x3} and an external input w lying in the range `[−0.25, 0.25]`)![[Screenshot 2024-08-29 at 12.17.17 PM.png]]
	- State of the Field: reachability analysis problems are undecidable for all but the simplest classes of hybrid systems. To get around this, most approaches try to solve the reachability problem by over-approximating the reachable set of states or proposing a semi-algorithm that may not terminate
- Reachability Analysis for NNs
	1. Use an ODE to define the continuous dynamics of the system we're going to test on
	2. At every step, the NN reads the current state of the system and then makes a decision which goes back into the ODE
	3. NN's aren't differentiable but they are deterministic (given an initial state, we can define a flow map for all future states)
	4. The core technique is an algorithm to over-approximate the range of the flow map over a time interval (given a set of initial states)
		i. At every step, compute the output range of the controller
	Usual methods look into the future a set number of steps and compute the different paths 
- Takeaway: I should integrate this into my pitch
# The Marabou Framework for Verification and Analysis of Deep Neural Networks
- Background: A DNN verification query consists of two parts: (i) a neural network, and (ii) a property to be checked
- An NN is a bunch of neurons that all take in values, sum them up ("a set of linear constraints"), apply a function ("a set of non-linear constraints") and pass onto the next layer. 
	- Objective Function: the metric we're trying to maximize or minimize, the equation for this is the sum of all the factors that go into effecting the objective functions
	- Constraints: All the limits on the factors that effect the objective function (and how the factors are inter-related)
- Takeaway:
	1. Marabou takes a property about an NN (in the form of input range, output property)
	2. It encodes the NN as an equation with a bunch of variables subject to constraints
	3. It propagates the input range throughout the Neural Network to see if the property holds by the end
		OR
	   It encodes the desired property as a negation and tries it's best to find any possible counterexamples
# Introduction to Neural Network Verification (Book)
Syntax:![[Screenshot 2024-06-18 at 7.34.28 PM.png]]
# Other Sources
https://blog.eleuther.ai/mad_research_update_2/
Weak-to-Strong Generalization beyond Accuracy: a Pilot Study in Safety, Toxicity, and Legal Reasoning
https://towardsdatascience.com/how-tiny-neural-networks-represent-basic-functions-8a24fce0e2d5/
https://transformer-circuits.pub/2025/crosscoder-diffing-update/index.html
https://www.lesswrong.com/posts/vwt3wKXWaCvqZyF74/mechanistic-anomaly-detection-and-elk
SPECTRE: Defending Against Backdoor Attacks Using Robust Statistics
https://www.anthropic.com/research/probes-catch-sleeper-agents
Eliciting Latent Knowledge from Quirky Language Models
https://www.lesswrong.com/posts/FrekePKc7ccQNEkgT/paper-jacobian-sparse-autoencoders-sparsify-computations-not
Formalizing the presumption of independence
Paper: "Does Representation Matter? Exploring Intermediate Layers in Large Language Models"
Paper: "The Unreasonable Effectiveness of Easy Training Data for Hard Tasks"
Paper: "Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision"
(weak-to-strong stuff is ELK)
Training and Verifying robust Kolmogorov-Arnold Networks
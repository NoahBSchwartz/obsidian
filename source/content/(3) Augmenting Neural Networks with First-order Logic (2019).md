*- Goal: Use world knowledge to inform a model, but keep the ability to perform end-to-end training (categorization, sentiment analysis...). This will combat the data hungriness of neural networks by taking advantage of domain knowledge*
*- Innovation: Previous methods used a teacher NN (with symbolic overlay) and a student to learn the symbolic reasoning. The authors want to directly incorporate this structured knowledge into an off-the-shelf neural network architecture without any of the substantial changes to the training methods (or an extensive redesign, or any additional trainable parameters). They do this by adding computation graphs on top of a neural network without changing its parameters*
### Background
- Purely Neural Approach: Consider a model trying to answer questions about a paragraph. The model must learn which words in the question match which words in the paragraph. If this could be removed (and replaced with a lookup table, the model might have much less data dependence)
- Previous Neuro Symbolic work: researchers have trained a neural network to mimic a teacher network that uses structured rules (meaning that the new model can now reason symbolically)
### Logic Computation Graphs General Idea
- The approach integrates logical rules in a manner that is consistent with the network's computational processes. These rules are converted into a format compatible with the network's structure and learning mechanisms, allowing the network to leverage logical constraints or domain knowledge during its operation.
### Logic Computation Graphs Steps
1. Finding Named Neurons:
	- The authors start by thinking about neural nets as a graph of nodes (neurons) connected by edges (weights). All of the edges point forward so that data only flows in one direction (through the network)
	- Now, they can look at individual nodes and label their purpose. These labels can be given when the model is first designed (ie. attention nodes), or discovered after training in "post hoc analysis"
2. Preparing Logic Statements:
	- Conditional Statements: in the form of "Condition -> Result"
		 Ex. If is_Black(animal) and is_Fluffy(animal) -> is_Penguin(animal)
	- Mapping: create a mapping between the predicates of the rule (ie. is_Black, is_Fluffy, is_Penguin) and neurons in the neural network
		 Ex. (ai,bj) are nodes in a computation graph which map to the predicates (Ai,Bj)
3. Encoding Logic Statements:
	- Make Logic Differentiable: each neuron can be viewed as contributing a certain level of evidence towards the final output. So to determine how true a predicate is, the authors look at the output of its corresponding neuron (this changes based on what's inputted to the neural net)
		- This creates an encoding of logic that can be used in training with gradient based methods
	- Note: the authors assume logic rules avoid cycles: The statement A1 ∧ B1 → A2 ∧ B2 is cyclic (bad) but the statement A1 ∧ A2 → B1 ∧ B2 is acyclic (good). They do this because NN's only have forward information flow![[Screenshot 2024-01-04 at 11.17.23 PM 1.png]]
4. Augmenting Named Neurons With Logic: Encode logic into a NN by creating new connections between neurons 
	- Case 1: antecedent contains AND/OR, consequent is a single statement Ex. If is_Black(x) and is_Fluffy(x) -> is_Penguin(x)
		- Run-Time: Modify the computation of a neuron so that whenever the condition associated with it is true, the output value of the neuron will increase
		- Constrained Neural Layer: `y = g(Wx + ρd(z))` 
			- original: y is output, g is activation, Wx is weights
			- d(z): Distance Function that quantifies how well the conditions for a logical rule are met, based on the states of the neurons before the target neuron. It's added into the neuron's activation, making a neuron's value stronger if more logical rules apply to it
				- Probabilistic Soft Logic: allows for degrees of truth
					- Łukasiewicz T-norm and T-conorm: ways to compute the logical AND and OR in a fuzzy logic setting
				- Distance Function for Conjunctions (AND): Normally if any part of an AND statement is false, the entire statement is false. Apply to neurons: for a neuron representing a AND b, its output will be ~0 if any of its input neurons are ~0 
				- Distance Function for Disjunctions (OR): Normally if any part of an OR is true, the whole statement is true. Apply to neurons: for a neuron representing A OR B, it's output will be ~1 if any of its input neurons are ~1
				- Distance Function for Negated Inputs (if !Y -> Z): The negative of an input is `1 - input` (If input is close to 1 then  `1 - input` will be close to 0) 
				- Distance Function for Negated Outputs (if Y -> !Z): The negative of an output is the opposite of its distance function 
		- p: determines the influence of the distance function on the neuron's output. A higher value of ρ gives more weight to the logical constraints when determining the neuron's output. 
			- A value of 0 results in a typical NN
			- A value of ∞ results in a neuron totally dominated by logical rules
			- A value in between means logic rules act more like a suggestion rather than a strict rule
		- Note: this modification is done before the activation function is applied (to keep the NN functioning properly)
	- Case 2: more complex combinations of logical conditions (aka antecedents)
		Ex. Y AND X OR (Q AND !K) -> Z
		- Auxiliary Variables: represent the subparts of the antecedent to make logic simpler
			Ex. Y AND X OR (Q AND !K) -> Z becomes P OR C -> Z
		- Auxiliary Neurons: To represent the auxiliary variables, the authors create new neurons in the neural network. Their outputs are defined based on the logic they contain
			Ex. P's output is defined by (Y AND X)
			- Specifics: the authors define auxiliary neurons as being equal to the distance functions of the terms they contain (instead of the actual neuron value)
		- Auxiliary Networks: Used for dealing with logic expressions that contain biconditional statements (Z ↔ Y). Usually this would create a cycle in the network but the authors create an extra layer in the network
			- Auxiliary Layer, the output of the layer (y) is calculated using a distance function (d(z)) that depends on the states of input neurons. The layer doesn’t require an additional activation function the neurons are specifically designed to only represent logical conditions 
5. Run-Time: 
	1. Convert the conditions (antecedent) of the logic rule into a normal form
		- Conjunctive Normal Form: multiple AND clauses are OR'ed together
		- Disjunctive Normal Form: multiple OR clauses are AND'ed together
	2. Convert the logic statement into a distance function 
									![[Screenshot 2024-01-10 at 7.19.06 PM.png]]
	3. Modify/ Construct Layers: Based on the distance functions, new layers (Auxiliary) or modifications to existing layers are added to the neural network so that it adheres to the logical rules defined in the earlier steps
	4. Use the Augmented Network for Training and Inference: finally the modified neural network is used just like a standard neural network. It is trained on data, and then it can be used for making predictions (inference).
	5. Distance function d(z) is differentiable
### Testing
- General
	- Approach doesn't add anymore trainable parameters, works well with modern neural net libraries
	- For tasks with low data, the authors found that 
- Specific
	- If multiple constraints are placed on 1 neuron, the authors rely on the network to deal with the issue
	- For a conjunctive consequent (P -> Q and V) authors decompose into multiple individual constraints
	1. Intermediate Decisions (attentions): attention weights generated by the attention mechanism during the processing of the input. They're intermediate decision because they help downstream neurons focus on specific parts of the input data
		- Machine Comprehension: the authors are looking to improve how models determine which parts of the input to focus on. They want to use information about how words are related to each other from an external database in order to guide the attention mechanism of an NN
			- Bidirectional Attention Flow for Machine Comprehension allows each word in the answer to attend to all the words in the question and vice versa (giving a better understanding of how question and answer relate)
				1. Encode: convert both the question and source to high dimensional space
					-  Elmo (Embeddings from Language Models): feeds deep contextualized word representations into normal BiDAF model
				2. Attention Mechanism: There are attention mechanisms in 2 directions (from source->question and from question->source)
				3. Hidden Layers: the attention scores are computed through a series of layers applied to the encoded paragraph and question
					- Softmax: The softmax function is used to normalize the attention scores, making them sum up to 1, effectively turning them into probabilities.
				4. Output: the NN outputs "answer boundaries", the locations within the source where the answer to a given question begins and ends
		- Augmentation: at the end of the attention process, related words should be aligned. To guide this to happen, the authors create distance functions for the attention layer
			- Hard Rule: two words must be aligned if they are related (regardless of the model's original decision, regardless of embeddings).
			- Soft Rule: two words should be aligned if they are related (as long as the model's original opinion agrees)
			- Implement into Model:  the predicate "is related to word" doesn't map to a node in the network so the authors create one (with a value that's determined by the external database of similarity)
		- Results: The hard rule leads to the most improvement on any amount of data. But the authors saw the biggest improvement from the baseline when using the smallest training sets 
			- These results are the same when the approach is used with Elmo embeddings (the scores just improve by a few points)
	2. Output Decisions Constrained by Intermediate States: logic rules that bridge attention neurons (how words in one sentence attend to words in the other) and output neurons (entailment, contradiction, or neutral)
		- Natural Language Inference: the task involves classifying how a premise and hypothesis fit together into either: (entailment, contradiction, or neutral). The authors want to use word relatedness between the hypothesis and premise to weight the attention of the model
		- Augmentation: 
			- Hard Rule (focussed): if a word is known to be related to another word then the model should increase the attention between them (regardless of the model's original decision)
			- Soft Rule (focussed):  if a word is known to be related to another word then the model should increase the attention between them (as long as the model's original attention between them was high)
			- Soft Rule (general): if a hypothesis is not well aligned enough with a  premise, categorizing entailment should be discouraged
			- Constrained Attention Weights: attention weights are adjusted based on word relatedness (from external database)
			- Auxiliary Neurons: created to capture the logical constraints involving the alignment's implications for the entailment decision.
			Note: Only the neuron path for entailment will be modified, contradiction and neutral are left as is
		- Results: With smaller amounts of data, the hard rule (focussed) did best. But the soft rule (focussed) did better as data increased (until it too didn't matter)
			ie. logic rules are only useful for limited data environments
			- The soft rule (general) didn't do well at all because there were many counter examples to it in the dataset. Even a rule that only partially applies, though, can increase performance when there's smaller amounts of data though
			- Combining this noisy rule with a good rule served to amplify the noise and made the model worse on large datasets (vs just using the noisy rule alone)
	3. Output Decisions Constrained Using Label Dependencies: to show that the method can be applied w/o attention, the authors take on the task of labeling each word in a passage with its role (text chunking)
		- Global Inference (Conditional Random Fields): takes into account the entire sequence when making predictions. This is the leading standard in text chunking
		- Local Decisions: the model looks at each word individually and makes predictions based on local information and constraints. This is what the logic rules will enable
			 Ex. a rule that says a noun should not be labeled as being inside a verb phrase could enhance the decisions made by global inference models
		- Augmentation
			- Soft Rules: these rules could be applied as hard constraints but are applied in a differentiable matter for this experiment
				- If a word is labeled as the beginning of a verb phrase, then the next word can't be labeled as inside a noun phrase
				- If a word is inside a noun phrase, then the next word cannot be inside a verb phrase
				- If a word is inside a verb phrase, then the next word cannot be inside a noun phrase
				- if the a word is a noun, it shouldn't be assigned a label that is inconsistent with noun phrases
- Results: 
	- State of the Art: The base model w/ CRF on top only performed well with a lot of data (but CRF made the model worse for low amounts of data)
	- Paper: 
		- Constrained Base Model: performed strongly even w/ small amount of data
		- Constrained Base Model w/ CRF: best of both worlds, performed well w/ less data and performed best out of every model with full data 
		 
### Questions
- Is this important? "Note that such rules include Horn clauses and their general- izations, which are well studied in the knowledge representation and logic programming communi- ties (e.g. Chandra and Harel, 1985)."
- The definition of the constrained neural layer says that, by compiling an implicative statement into a distance function, we can regulate the pre- activation scores of the downstream neurons based on the states of upstream ones.
- Figure out better: ![[Screenshot 2024-01-12 at 4.20.00 PM.png]]
- Change the innovation section: "Our distinction is that we use first-order logic to augment a given architecture instead of designing a new one." (and uses a smooth extension of standard Boolean logic.)
	- They didn't come up with integrating logical rules in the form of ad- ditional terms in the loss functions though
	- Approaches of previous went from the other end, augmenting symbolic networks w/ backpropogation. There's is neural in nature. Different sides but trying to accomplish the same thing
- Reread work and discussion, would give some better background that you missed 
### Personal Thoughts
### Differences to Paper 2
- "Hu et al. (2016) introduced an imitation learn- ing framework where a specialized teacher-student network is used to distill rules into network param- eters. This work could be seen as an instance of knowledge distillation (Hinton et al., 2015). In- stead of such extensive changes to the learning procedure, our framework retains the original net- work design and augments existing interpretable layers."
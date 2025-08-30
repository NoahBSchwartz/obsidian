*- Goal: Create a general framework to enhance different types of neural networks with symbolic reasoning. Network should learn from data points and logic rules simultaneously. Just like a human learning from experience and past logic*
*- Innovation: The authors use knowledge distillation to transfer knowledge from a more complex model (which is using posterior regularization to incorporate additional logic rules) to a smaller neural network. The innovation is that this smaller neural net can be any general type like CNN's or RNN's*
### Background
- Previous Work in creating a general framework
	1. Neural-symbolic systems construct a network from a given rule set and then this network is used to make decisions on the fly
	2. Each raw data instance fed into a DNN can have useful data features tacked onto it (only useful for very specific structural knowledge)
	3. KBANN: starts with a set of symbolic rules and converts them into a neural network structure, which is then refined through learning (Add)
	4. Markov logic networks: creates probabilistic models (rather than neural networks) from the rule set (Add)
	5. Ordered Training: a specialized training procedure with careful ordering of training instances can create an interpretable neural layer in an image network (Add)
	6. Rule Regularization Methods
		- Post-Training Projection: NN is initially trained in a conventional manner. Then it's projected (adjusting the NN's parameters so that it aligns with logic rules). The network doesn't have the opportunity to simultaneously learn from both the empirical data and the structured rules.
		- Direct Optimization: The network is projected into a rule-regularized subspace right at the start, and the NN learns to fit the data while being restricted by the rules. Since the network starts in the subspace, its exploration is limited by the rules from the beginning.
- How this paper differs
	- Usually the teacher is obtained beforehand and the student is trained after, but in the paper the teacher and student are learned simultaneously during training
### Iterative Rule Knowledge Distillation General Idea
- Iterative Rule Knowledge Distillation: Transfers the structured information of logic rules into the weights of neural networks 
	- Semi-Supervised Learning (mixture of labeled and unlabeled data): Once logic rules are encoded, they provide a structure that the network can apply to learn unlabeled data(which is better than a DNN alone)
	- Soft Logic: the authors can encode rules (into the teacher model) in a way that is less rigid and more adaptable which is important for language
###  Iterative Rule Knowledge Distillation Steps
2. Neural Network Setup: allow NN to learn from both specific examples and general rules
	- K-way classification: The neural net is set up with the goal of classifying inputs it receives into classes (the output layer has one neuron per class)
		- Input = x (X is the input space)
			- Training Data: consists of many pairs`{(input1, target1)}` 
		- Output = y (Y is the output space)
			- K-dimensional probability (ΔK): the model outputs a vector containing one probability for each class that the input could be part of (Note: Y = ΔK, meaning the output for each input is a vector of K probabilities)
				- Softmax: converts normal NN outputs into probabilities
			- One Hot Encoding: used to train the neural net on this binary data. The NN outputs probabilities for each class, which must be one hot encoded to match training data
				Ex. `[0.2, 0.3, 0.1, 0.4]` becomes `[0, 0, 0, 1]`
3. Rule Setup: 
	- First Order Logic: extends propositional logic with more powerful expressions that allow for the quantification and relation of elements. Very similar to prolog logic except for: 
		- Quantifiers: how true a statement is
			1. Statement is true for all elements in domain
			2. Statement is true for at least one element in the domain 
		- Functions: map objects in the domain to other objects. For example, in a domain dealing with people, a function might map each person to their mother.
		- Grounding: Take a general rule and fill its variables in with specific values
			  Ex. Rule = "All humans are mortal", Options = set of individuals,             Grounding = ("Socrates is mortal," "Plato is mortal," ...) for all individuals 
			- Relevance: each grounding is a specific case of the rule applied to particular data points that an NN can learn from. Here, the authors apply every logic rule to every data point (even if it might not fit)
	- Applied to the paper:
		- Format: The authors store the logic expressions in a database of pairs where each pair consists of a rule and its confidence level (from `[0, ∞]`, `∞` means hard rule, 0 means false rule)
		- Purpose: every rule makes some assertion or establishes a relationship about the inputs and outputs of the model
		- Encoding: FOL rules are encoded with soft logic (so that the network can have a range of confidence levels)
			- This means that operations like (And, Or, Not...) must be changed to take the max or min of 2 terms instead of using boolean logic
4. Teacher:
	- In every iteration of the training process, they construct a 'teacher' model that is informed by the data and guided by the logic rules. This means refining the teacher is a continuous process.
	1. Network Projection: the authors make a copy of the original NN that they're trying to train. projecting `pθ` into a subspace that is constrained by the logic rules.
	2. Rule Regularization: In the new copy, they incorporate the constraints imposed by the logic rules
		- Regularization: add an additional term to the loss function (the function being minimized during training) to penalize complex models
		- Posterior Regularization: the logic rules are transformed into regularization terms in the neural network's loss function. This means, alongside the usual goal of reducing prediction error on the training data, the network is also guided to satisfy these logic rules.
					Ex. "sentences containing both 'not' and 'bad' are likely to be positive," the model should learn and adhere to this rule
			- The model incurs a penalty when its predictions diverge from the expectations set by logic rules. For specific applications (groundings) of these rules within the dataset, the expectation is that the network’s predictions should closely align with the logic rules (especially for those with high confidence levels). If they don't, the loss function is increased accordingly
	3. Adherence to Original Data: the authors measure how close the model with rules is to the original data-driven model
		- KL-Divergence: measure of how one probability distribution (teacher) diverges from a second (student) expected probability distribution. The goal is to minimize the divergence
	4. Optimization Function Specifics: the optimization function is the function which updates the weights of a neural network (the loss function is part of it)
		- Slack Variables: terms in the loss function which allow some flexibility in satisfying the rules (so that the model keeps its generalizing abilities)
		- Regularization Parameter: controls trade-off between learning dataset and satisfying rules (higher `C` = NN pays more attention to logic rules). 
		- Convex: the loss function has been constructed so that any local minimum is also a global minimum (optimization won't get stuck)
		- Dual Form: the paper solves the optimization more efficiently by transforming the original problem into its dual form (using the constraints of the original problem to redefine the objective)
			- Closed Form Solutions: the authors can solve the optimization problem that includes both the KL-divergence and the constraints imposed by the logic rules easily because it is closed form
5. Run-Time: the goal is to find the optimal NN that fits the rules while at the same time staying close to the data 
	1. The teacher makes its "soft predictions" for the student to imitate. Instead of the hard labels that the network is expected to produce (either positive or negative) this is a distribution of probabilities across all labels
		- Direct Enumeration: most straight-forward method, used when the logic rules align neatly with the student network's structure. It simply calculates the outcomes as dictated by the rules directly
			Ex. A rule states that sentiment is positive if a sentence contains the word "but" followed by a positive phrase. The network just directly applies the logic
		- Multiple Interconnected Elements: the classification of one word might depend on the classification of previous words, computing predictions for each data point independently doesn't work. So the authors break the problem down into simpler subproblems
	2. The student balances between imitating the soft predictions of the teacher and doing its job of predicting hard labels 
		- Imitation Strength: the student's imitation is initially low because the teacher hasn't been trained enough (ie. the student opts to just predict hard labels for the data). After training, there is a gradual shift towards emulating the soft labels (so that the student begins to learn some of the logic rules)
	3. The pretrained word embeddings for both models are finetuned
	4. Adadeleta: The authors use a special kind of a Stochastic (randomly selecting a small part of the dataset for training) Gradient Descent that's better for models with hyperparameters
	![[Screenshot 2024-01-01 at 10.01.34 AM.png]]
### Testing
- Specifics
	- Sentence Level Sentiment Analysis: look at one sentence and determine its tone
		- Single Channel Convolutional NN: The first layer has filters of different sizes that slide over the embeddings and perform mathematical operations to capture different patterns or features. Then the max value of the features are taken to find the most important ones. Then softmax turns the raw outputs into probabilities 
		- Logic Rules: hard to work with words like "but" or "however". Sentences with an “A-but-B” structure should have overall sentiment  that matches B.
			Ex. The apple was tasty but it had a worm inside
			- Encoding: If a sentence has the "A-but-B" structure, then if the true label is positive, the model's prediction for clause B being positive should be high
	- Named Entity Recognition: classify words into categories like “people” or “objects” 
		Ex. "Apple Inc. is based in California", "Apple" might be tagged as `B-ORG` (beginning of an organization name), "Inc." as `E-ORG` (end of an organization name), "is" as `O` (outside any entity)...
		- Bi-Directional LSTM Recurrent NN: A convolution NN first looks at the characters in the words to try to find patterns in them (by applying filters). Then these are combined with the word dependencies and sent to LSTM's which capture long-range dependencies in data (because it's processed both forward and backward)
		- Logic Rules: The NN makes tagging decisions at each position independent of its neighbors (even when patterns emerge, the network doesn't take this into effect).  
			- Rule: I-ORG cannot follow B-PER
				- Encoding: This rule can't be violated so they set confidence to infinity
			- Rule: In lists, entities at corresponding positions are likely to be of the same type 
				Ex. in list of sports teams, each team is likely to be tagged as an organization
				- Encoding: The rule works by measuring how similar the predicted tags are for corresponding items in a list. If the items are related in the list, their predicted tags should be quite similar
- General
	- For testing, either the student network or the teacher network can be used (but the teacher is more effective at applying complex logic constraints)
	- Viewing the Regularized Subspace: By examining the outputs of the teacher model, one can understand how the logic rules are influencing the predictions
	- 10-fold cross-validation: systematic method for evaluating how well a model generalizes to new, unseen data (by splitting data into 10 parts)
- Results
	- Sentiment: Around 15% sentences contained the word “but”
		- The authors competed against other approaches which also projected CNN's into rule-constrained subspaces. But they found that even the student network beat it (meaning that rule distillation is working)
		- Many frameworks improve performance but there's improves it by the largest amount 
		- They're competing against approaches which train two sets of NN's instead of just one
		- Semi-Supervised Learning: the models were at their best when they could learn from a combination of symbolic rules, labeled examples, and unlabeled examples 
		- With less labeled examples, the model followed more closely to the rules (with the unlabeled data helping cement the rules)
		- The model shows the most improvement over the base CNN when the data is at its least (5% of the total dataset)
	- NER: Around 1.7% named entities occur in lists
		- The authors competed against approaches which used a second NN (conditional random field) to learn the logic rules which they simply wrote into their model 
		- They only got beaten by a model which uses a massive external database and by one which uses far more parameters
		- The teacher is far more effective for NER because the logic rules deal with many entities and are more complex 
### Personal Reflection
- Pros: 
	- Because the rules are embedded within the network's weights, it can be used to make predictions on new examples without needing to reassess or reapply the rules each time. This fixes scenarios where reassessing the rules for every new example at test time can be computationally expensive or even infeasible.
	- The model was only beaten by one which contained more neural layers and more parameters than the paper's model
- Cons:

### Proposals
- Automatically learn the confidence of different rules, and derive new rules from data




# Questions
- CNNs and RNNs?
- "Methodologically, our approach can be seen as a combination of the knowledge distillation and the posterior regularization (PR) method."
- Why does refining the teacher continuously (as opposed to pretraining the teacher) during training help the whole process instead of hurt it 
- "Framework Overview. At each iteration, the teacher network is obtained by projecting the student network to a rule-regularized subspace (red dashed arrow); and the student network is updated to balance between emulating the teacher’s output and predicting the true labels (black/blue solid ar- rows)."
- Is it necessary to put one-hot encoding into my notes? 
- Investigagte further: "our method specification can straightforwardly be applied to other contexts such as regression and sequence learning (e.g., NER tagging, which is a sequence of classification deci- sions)"
- How is grounding used in the paper?
- Do I need to go into more depth about first order logic
- Add back in? "Their adaptation of this method results in a closed-form solution (can be expressed as an interpretable expression), making the construction of the teacher network more efficient and grounded"
- Redo innovation section
- Look more into this? "he second loss term in their equation (Eq.(2)) refers to the part of their training objective that encourages the network to imitate the teacher model (`q`). This term can be enhanced by including not just labeled data, but also a large amount of unlabeled data. This is crucial for semi-supervised learning, where the model benefits from the abundance of unlabeled data. Unlabeled data helps the network to better absorb and generalize the rule knowledge, as it learns to apply these rules across a broader set of examples, not just those for which it has been specifically trained."
- Do I need to annotate this or is it not important? "Our framework is related to the posterior regular- ization (PR) method (Ganchev et al., 2010) which places constraints over model posterior in unsuper- vised setting. In classification, our optimization procedure is analogous to the modified EM algo- rithm for PR, by using cross-entropy loss in Eq.(2) and evaluating the second loss term on unlabeled data differing from D, so that Eq.(4) corresponds to the E-step and Eq.(2) is analogous to the M-step. This sheds light from another perspective on why our framework would work."
- Important? "Our approach also shows promising potentials in the semi-supervised learning and sparse data context."

# Notes 
- DNN = Deep Neural Network
- Background: Software verification works . To prove a property of a program:
	- "It is practically impossible to write a program that can prove many interesting properties of typical programs"
	- "Formal verification involves a combination of breaking the problem down into sufficiently small steps (writing small functions and stating enough precise properties of those functions), having a tool automatically prove some of those properties (such as a [SAT solver](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem#Algorithms_for_solving_SAT) for propositional logic), and having humans write proofs where the computer can't do it (but the computer will check the human's proof)."
- Strategies for Verifying a Neural Network 
	(Here, the goal is to check if the neural net's output will always be >= 0 if x and y are between 0 and 1)
	- **Constraint-based verification**: Take an NN and a property we're trying to verify and encode the problem of verification as a set of constraints that can be solved be an SMT or an MILP solver
		1. Encode the Neural Network as a system of constraints. The images show how to convert a single neuron (defined in python) into a system of constraints ![[Screenshot 2024-08-19 at 11.22.42 PM 2.png]]![[latex.png]]
		2. Encode the desired property:![[Screenshot 2024-08-19 at 11.26.32 PM.png]]
		3. Feed these both to the MILP/SMT solver and it will try to find ways to compress the problem and verify
		- Drawbacks: 
			- This is where the field started out but RELU's mean the solver has to explore both branches which doesn't scale to huge NN's
		- Attempted Fixes: 
			- You can bias the training of the NN to reduce the number of RELU's and reduce the number of connections that need to be checked
	- Abstraction-Based Verification: these scale much better but aren't as complete (sometimes they just won't come to an answer). 
		1. Use an abstract domain: instead of considering every input to the NN, think of them as one huge interval of inputs (think of x and y as any value between 0 and 1)
		2. Use interval arithmetic on the Neural Network: `t = 3 * x + 2 * y` -> `t = 3 * [0, 1] + 2 * [0, 1]` so we know that `t = [0, 5]`, apply RELU and we get `r = [0, 5]`
		- Drawbacks: doing interval arithmetic loses precision and we may end up with intervals too large to be meaningful ie. `[-1, 10]` (in this case, algorithm just doesn't come to answer)
		- Attempted Fixes: You can bias the training of the NN to make the network "sharper", ie. when the interval arithmetic is performed, the intervals don't get big so quickly
- Going Forward: both of these approaches suffer from only being able to verify one property of the NN, not multiple. (And this property must be formalized perfectly: think of formalizing the concept of robustness, where you could say an NN is robust if it resists an image being rotated but what if the image is in black and white?). Some potential solutions: 
	- Specification mining: 
		- Neural Specifications: In the past the way to show the robustness property was to show that small changes to an input data point didn't break the network but "Towards Reliable Neural Specifications" defines a new robustness property: look at the *activations* caused by a datapoint and makes sure that small changes to these *activations* don't break the network (this addresses the *symptom* of trying to formalize the concept of robustness and failing but doesn't address the *cause*, we shouldn't need to define anything in the first place). Maybe we could extend this to address the cause though?
		- Specification Mining as Used in Software: ??? (how can we apply this to an NN)
	- 

Heuristic estimators are sort of like an abstraction based verification where you only do the interval arithmetic on the most important parts and then you replace the rest with worst case scenario which is why it has the potential to scale better? 
My idea will focus on one of the most overlooked problems which is specification of the problem to be solved. If I can actually formalize the notion that the NN is within distribution, then we could apply some techniques and stuff 

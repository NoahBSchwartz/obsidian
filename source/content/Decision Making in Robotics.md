Model-free approach: learning the mapping from “what robot sees” onto “what to do next”
Model-based approach:  learning the model and then planning
# Reactive Architecture
Direct connection of sensor input to actuator output
- Example: ![[Screenshot 2025-04-23 at 11.37.54 AM.png]]
1. Subsumption Architecture (Parallel and asynchronous): couples sensory information to action selection in a bottom-up fashion
	1. Robot’s behavior decomposed into sub-behaviors
	2. Sub-behaviors organized into a hierarchy of layers
		- Every layer can receive sensing information 
		- Layers can suppress or inhibit other layers
	3. Higher levels can subsume (include) lower levels (and lower levels are most important)
	Example: higher layers utilize the lower-level competencies ![[Screenshot 2025-04-23 at 11.42.32 AM.png]]
	Limitations: system is purely reactive → the world determines what it does
2. Finite State Machines: Switching between different behavior
	1. State = behavior that robot could demonstrate, Transitions = conditions that determine when to switch
	2. Run in a loop:
		1. inputs are read 
		2. branches into its current state
		3. behavior of current state is executed
	Limitations: for N states, there are N * N transitions!! (very hard to understand and manage)
3. Hierarchical FSM
	1. Super-states organized hierarchically 
	Improvements: Increasing modularity and simplifying programmability, Super-states can be executed in parallel (events in 1 super-state can trigger transitions in other)
	Limitations: for N states, there are N * N transitions!! (very hard to understand and manage)
4. Behavior Trees
	1. Leafs (aka. Action Nodes) = actions robot takes, Root and internal nodes = guide the path through the tree
		- Nodes can share information![[Screenshot 2025-04-23 at 12.03.40 PM.png]]
		- Composites: regulate control flow 
			- Sequence node (AND): executes children in order and fail if one child fails
			- Selector/fallback node (OR): executes children in order. If one child fails just try executing the next one
			- Parallel node: execute child nodes in parallel
		- Decorators: performs transformations on child node’s outputs (ie. flip child node output from success to failure)
	2. Execution starts at the root, Each node calls on its child nodes recursively, Child nodes are evaluated left-to-right
	Advantages: much more interpretable, modular (can design and test subtrees independently), hierarchical organization 
	Limitations: uses just local information (hard to reach global goals), programmer needs to write everything!
# Deliberative Architecture (Only Theoretical)
Search of possible state-action sequences and their outcome (robot can look-ahead and infer outcomes)
Sensory Processing -> Modeling -> Planning -> Control 
# Hybrid Architecture
Reactive + deliberative = real-time responses + rational and optimal decisions
Hardware -> Reactive Layer -> Executive Layer -> Deliberative Layer
1. Deliberative Layer: generates global solutions using planning (very long-range, only replan when situation changes)
2. Executive Layer: Decompose high-level tasks into low-level tasks (use deliberative layer goal and give to reactive layer)
3. Reactive Layer: Low level sensor-actuator loop
# Reinforcement Learning Architecture
There's no supervisor just rewards. Closed-feedback loop 
- Construction
	1. Reward = scalar feedback signal saying how well robot is performing (May be delayed! Which makes things harder)
	2. History = sequence of observations, actions, and rewards
	3. State = agent’s internal representation (used to determine the next action it takes)
		- Markovian if: the probability of each event depends only on the state attained in the previous event
	4. Optional:
		- Policy: agent’s behaviour function
			- Deterministic: directly map each state to a specific action (agent always chooses the same action for a specific state)
			- Stochastic: define a probability distribution over actions for each state (agent selects actions according to a probability distribution for each state)
		- Value function: how good is each state and/or action (prediction of all future rewards)
		- Model: agent’s representation of the environment (ie. predicting what the environment will do next)
			- Dynamic Model = how actions change each state, Reward Model = how much reward agent can get from each state
- Steps of RL Loop
	1. Executes action at
	2. Receives the observations that determine the state st
	3. Receives the reward signal rt
#### Q Learning 
Have a matrix for every combo: The expected rewards for an action a taken in a given state s (learn the optimal policy w/o needing a model)
1. Initialize a matrix of Q-values 
	- Learn from Scratch = set all cells to 0
	- Previous Knowledge = different Q-values for different cells
2. Robot observes its state, executes an action, observes the reward, enters a new state, updates Q-values... until final state reached ![[Screenshot 2025-04-30 at 11.57.50 AM.png]]
	Q Cell Value = (cell update speed) * old value of cell + (cell update speed) * (current reward + (trust in estimate) * estimate of future reward)
		Memorize the terms: learning rate, discount factor
- Choices: Exploration vs Exploitation (trying out new options to gather info vs maximizing returns based on current knowledge)
	- Learning Rate = 1 means fully exploration, 0 means fully exploitation 
- Example: for an iteration say we start at cell (2,3), choose to move right, get reward of 0, and end at (3,3) whose estimated reward is 0, learning rate = 0.5, discount factor = 0.8![[Screenshot 2025-04-30 at 12.12.01 PM.png]]
			Now: write the value we found (0) to our starting cell. If the robot ever comes to an adjacent cell we can use this value as our estimate of future reward 
		==Choose actions randomly if multiple states are equal==
	- With different epochs, the information from the big reward gradually propagates to the cells to get the robot to the right path (because we take into account estimate of future reward)
	- You have to decrease the learning rate overtime so that you don't erase knowledge but also make sure to find most optimal path
1. Agent: entity that perceives and acts (percepts = perceptual inputs) (percept sequence = complete history of everything perceived) (Agent Function = maps percept sequence to action) (rational agent = optimal agent so it selects percept sequence to maximize performance measure) (performance measure = evaluates the behavior of the agent in an environment)
	- Environments: stochastic (random)/ deterministic (same outcome each time), discrete (finite # choices)/ continuous (infinite), benign (peaceful)/adversarial (trying to make you fail), static/dynamic
	- Model-based reflex agent
	- Simple reflex agent
	- Goal-based agent
2. State Space: all the possible ways the world could look in the form of a directed graph (a path in state space is a sequence of states connected by actions). Search Problem = Initial State -> Goal State (must consist of a state space and goal test to determine when we get solution)
	- Path Cost Function: assign numeric cost to each path (sum step costs)
	- Transition Model: function that returns state_new when fed in state_old and an action
	- Uninformed Search: no additional information beyond problem definition (uninformed, apply goal test to each node)
	- Informed Search: some idea of which non-goal states are promising (ie. heat map) 
	- Search Strats: [[Graphs]] (BFS = optimal but slow, DFS not optimal but fast), Uniform Cost Search (BFS w additional logic), A* [[Navigation]] (BFS w additional logic)
		- Completeness (gets you an answer if it exists and tells you if it doesn't exist), Optimality (gives the best answer, non-optimal still gives answer but may not be best)
# Midterm
A frontier is a Queue not a stack
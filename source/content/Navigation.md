We need localization -> mapping -> path planning -> execution to get to a destination
# Localization
Figure out where the robot is relative to some model of the environment using sensors
- Odometry For Short Distances (use sensor data to estimate change from starting position): prone to errors over time, only an estimation
- Use Trigonometry For Long Distances: compute the coordinates of the robot relative to object in realtime
	- Azimuth: Robot can measure the distances to objects and their azimuth 
		- Azimuth is the angel between North and forward dir of robot (laser scanner gives us distance and angle from object to robot)![[Screenshot 2025-03-18 at 6.44.02 PM 1.png]]
	- Triangulation: Robot can measure the angles to the object from two different positions
- GPS, Global Positioning System (innacurate): needs at least 4 satellites, multiply time of travel of signals by speed of light to calculate distance
- State Estimation: take noisy measurements and estimate state of a system
	- Probabilistic Localization
		1. Assume the robot has no info then the probability it is in a zone is 1/5
		2. Sensing increases certainty. The more data that comes in, the more certain the robot can be of where it is (ie. data that the robot is in blue zone narrows things down)
		- What if sensors can't be trusted? (ie. P(0.9) that sensor is right)
			1. Assume the robot has no info then the probability it is in a zone is 1/5
			2. If the robot senses something, multiply the probability of the sensor being right by the initial guess 1/5 (ie. 0.9 * 1/5)
			3. Normalize so all the zones add to total probability of 1![[Screenshot 2025-03-18 at 8.31.38 PM.png]]
		- What if robot can't be trusted?![[Screenshot 2025-03-18 at 8.33.35 PM.png]]

# Mapping 
To make localization work we need to build a map (but sometimes environments can change overtime). How do we deal with this?
1. Discrete Maps: use fine grids to map things (efficient for a lot of objects)
	- Put a 0 if there's nothing, 1 if there's something (put probabilities if sensors are inaccurate)
		Example: The Fronteir Algorithm puts open cells w low probability, obstacle cells w high probability, unknown cells w 0.5 probability
			1. Frontier cell is an open cell adjacent to one or more unknown cells
			2. Expand the map by moving to the closest frontier cell
			3. Sense adjacent cells and update map
	 - Known Maps only need localization!
		
2. Continuous Maps: efficient when you have fewer objects 
### SLAM (Simultaneous Localization and Mapping)
Mapping requires localization but localization needs a map -> SLAM
- Build a map while also keeping track of current location (alternate between the 2 steps)
# Global Planning Algorithms (Geometric Navigation)
- Dijkstra: Make each cell of the map into a node of a graph (each node will have some cost)
	1. Mark each cell with the number of steps needed to reach it from the start position (Start = score of 0)
		- Iterate: If a cell is marked it's unmarked neighbors are updated![[Screenshot 2025-03-12 at 11.47.51 AM.png]]
	2. Once goal cell is marked, go back from goal to start (constant cost below)
- A* Algorithm: Dijkstra's searches in all directions which isn't always efficient, A* keeps track of how close it's getting to the goal
	Add a heuristic function as indication of the direction of search![[Screenshot 2025-03-12 at 11.39.47 AM.png]]
	1. Mark each cell with the number of steps needed to reach it from the start position
	2. Start at the start position
	3. Look at adjacent cells
	4. Find the one with lowest steps from origin
	5. Calculate the cell's distance to goal cell 
	6. Find Best Path: At each iteration A* expands to adjacent cells with lower f (doesn't consider obstacles) ![[Screenshot 2025-03-12 at 11.42.29 AM.png]]
# Combining Global and Local Planning
1. Local Planning = Low-Level Obstacle Avoidance (much faster)
2. Global Planning = High Level Path Planning (much slower)
Combination: Prioritize the low-level algorithm to avoid obstacle, then recompute the path
- Sensor-based navigation
	- Bug 1 (Exhaustive, more predictable): Explore all options before taking the choice
			Move forward, If obstacle is found circle the entire obstacle, Move to the point which is closest to goal![[Screenshot 2025-03-12 at 12.21.24 PM.png]]
	- Bug 2 (Greedy, faster): Take the first likely option (usually better)
			Point towards goal and calculate an imaginary line. Then move towards the goal. Once you hit object go around until you find the imaginary line. Then follow the imaginary line  ![[Screenshot 2025-03-12 at 12.23.28 PM.png]]
# Types of Navigation 
Combine all 3 types for smart robot!
- Geometric Navigation (obstacle avoidance): think about world in terms of grids (for local nav but not efficient b/c have to use so many cells)
- Topological (high level planning): Use graphs to model environment (ie. describe the relations in the environment using graph approximations)
- Semantic: Abstract representation of the environment (the map has concepts in it, ie. used for "I'm feeling thirsty")
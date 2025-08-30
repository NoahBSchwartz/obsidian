Controller: decide what needs to be done and send info to actuators
- Control Loop: measure value, compare w desired, change the system
	1. Open Loop: everything is pre-set (no changes while system is running)
	2. Closed Loop: sensors measure and then decide what actions to take
	- Considerations 
		- Make sure control algorithm runs just fast enough (shouldn't check too much and waste battery) 
			(ie. if robot moves 20 mm a second then 250 ms control period seems reasonable)
# Closed Loop Control
1. On-Off Control (bang-bang algorithm): motors fully forward if facing toward target or fully backward if facing away (causes oscillation)
2. Proportional (P) Controller (look at distance at each time-step): reduce speed as you get closer to target (stops too soon b/c of friction in motors and wheels, if target is also moving this won't work b/c keep stopping and starting)
	- Equation:    Power = Proportionality Constant * Target Distance ![[Screenshot 2025-02-26 at 3.10.15 PM.png]]
	- Gain (aka Proportionality Constant): Higher Gain = robot comes faster, Lower Gain = robot comes slower (too high leads to oscillation)
	- Ex. Target = 100 cm away, Gain = 0.8 ----> Power = Gain * Target = 80
3. Proportional-Integral (PI) Controller (looks at all past time-steps): Adds the integral of the distance from the time when the algorithm starts until the present time (Still oscillates because integral starts off w high value, so robot must go past object to cancel out high value)
	- Equation:   Power = Gain1 * Current Distance +  Gain2 * The Sum of All Past Distances ![[Screenshot 2025-02-26 at 3.13.55 PM.png]]
		The integral term adds a component based on how long and by how much the system has been away from the target value (which gets weighted by Gain2) 
4. Proportional-Integral-Derivative (PID) Controller: we need to also estimate the future position of the target so include the rate of change of the distance in the equation (gains must be carefully balanced but leads to no oscillations!) ![[Screenshot 2025-02-26 at 3.22.14 PM.png]]
	- To get our future prediction we look at difference between current and *previous* distance (take the derivative)
#### Calculating the Gains
1. Root locus (Algebraic): graph out what the system does with a ton of different gain values and pick the best
2. Ziegler Nichols (Experimental): set I (integral) and D (derivative) gains to zero, increase P gain until system oscillates, measure oscillation period and use it to set the P I and D gains
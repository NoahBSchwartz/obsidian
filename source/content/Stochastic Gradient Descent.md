1. Theoretical: Gradient Descent is local greedy algorithm: take small steps each time to minimize function (no gauruntees we'll find optimum)![[Screenshot 2025-09-22 at 4.34.30 PM.png]]
		Cool Note: learning rate is the step size we take!
2. Algorithm:![[Screenshot 2025-09-24 at 4.32.05 PM.png]]
3. Improvements
	- Stochastic Gradient Descent: randomly choose 1 sample, use that sample's gradient to update weights, repeat 
	- Mini-Batch Gradient Descent: randomly choose subset of samples, use them to update weights
	- Stochastic Gradient Descent + Momentum: avoid local minima by having "momentum" to keep us going when we get to local minima
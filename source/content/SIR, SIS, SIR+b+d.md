# SIR Compartmental Model (Susceptible Infectious Recovered)
Goal: model how many people are in each compartment over-time
Good for most Directly Transmitted, some Indirectly Transmitted
Divide population into compartments based on state. A person is in only 1 compartment at a time (all ppl in compartment are same)
1. `S(t) + I(t) + R(t) = N(t)`   compartment sum over time = full population over time
2. Rules
	1. If S comes into contact w/ only other S or R -> They remain S
	2. S to I contact is necessary but not sufficient for infecting S (S may not be infected)
		- Key Assumption: well-mixed (ie. I and S are mixed together randomly)
			`Prob(person is S) = S/N` + `Prob(person is I) = I/N` + `Prob(person is R) = R/N` = 1
		- Contacts occur at rate $C$, $P$ is prob of transmission occurring during contact 
			$S$ contacts occur at $C \cdot S/N$, $I$ contacts occur at at $C \cdot I/N$...
			$S$ to $I$ contacts per time = $S \cdot (C \cdot I/N)$
			Rate of new infections (Incidence) = $C \cdot P \cdot (I/N) \cdot S$       
					(Note: Force of Infection = $\lambda(t)$ = $C \cdot P \cdot (I/N)$ is the per-capita rate of new $I$ which tells you how high your own risk is) 
			Rate of change of S = ($dS/dt$) = -incidence (people are removed from $S$ when they turn to $I$) (aka. $dS/dt =$ force of inf $\cdot S = -\lambda(t)S$)
					(Note on Syntax: $\dot{S} = dS/dt$ for ease, $\ddot{S} = d^2S/dt^2$)
	3. Everyone in $I$ is equally infectious. People in $I$ recover at rate $\gamma$. $\dot{I} = incidence - recovery$. Thus:![[Screenshot 2025-09-04 at 3.29.20 PM.png]]
		- Note if population is constant, then $\dot{S} + \dot{I} + \dot{R} = 0$ because rate of change of all groups added up is 0!
```python
def SIR(S0, I0, R0, beta, gamma, t_max, stepsize):
	T = np.arange(0, t_max + stepsize, stepsize)
	S = np.zeros(len(T))
	I = np.zeros(len(T))
	R = np.zeros(len(T))
	
	N = S0 + I0 + R0
	for idx, t in enumerate(T):
		if idx==0:
			S[idx] = S0
			I[idx] = I0
			R[idx] = R0
		else:
			dS_dt = -beta * S[idx-1] * I[idx-1] / N
			dI_dt = beta * S[idx-1] * I[idx-1] / N - gamma * I[idx-1]
			dR_dt = gamma * I[idx-1]
		
		S[idx] = S[idx-1] + dS_dt * stepsize
		S[idx] = S[idx-1] + dI_dt * stepsize
		S[idx] = S[idx-1] + dR_dt * stepsize

return S, I, R, T
```
3. Properties: 
	- To double incidence, we have 2 parameters: double $P$ or double $C$ (to make this easier $\beta = P \cdot C$)
	- Equilibria: we want to find values of variables where nothing is changing (ds/dt=0, di/dt=0, dr/dt=0)
		Set all diff eqs to 0 to get: $I_{eq} = 0$ (found by analyzing $\dot{R}$. analyzing $\dot{S}$ gives us nothing,  analyzing $\dot{I}$ gives us nothing
			$(S, I, R)_{eq}$ = $(S_{eq} , 0, N-S_{eq})$ *called a "Disease Free" equilibrium*
		- Stability of Equilibria: if I nudge the system a little bit away from equilibrium will it go back? (what happens when $I = I_{eq} + \epsilon$)
			Plug in $I_{eq} = 0$, take derivative, sub in lower-case letters:
	- Answering Questions about the Model![[Screenshot 2025-09-04 at 3.28.23 PM.png]]
		- Ex. Will there always be an epidemic when $\dot{I} > 0$? 
			1. Plug in equation: $\dot{I} = \beta \cdot S \cdot I / N - \gamma \cdot I$ > 0 
			2. Solve eq -> $S/N > \gamma/\beta$ 
			3. Interpret: If the fraction of susceptible population is $<\gamma/\beta$, then no outbreak! (ie. lots of people recovered)
			*We proved herd Immunity!* 
		- Ex. When will epidemic peak?
			1. We're looking for $\dot{I} = 0, I > 0$
			2. Plug in equation: $\dot{I} = \beta \cdot S \cdot I / N - \gamma \cdot I$ = 0 
			3. Solve eq -> $S/N = \gamma/\beta$ 
			4. Interpret: the peak is right when susceptible population = recovery rate / infection rate!
	- Basic Reproductive Number $R_0$ (R naught)
		- Expected number of secondary infections caused by a single primary infection in an otherwise completely susceptible population. For $R_0 > 1$ we spiral out of control. For $R_0 < 1$ we don't. Depends on sample population density
			- To solve: we want to know incidence (rate of infections per time) when everyone is susceptible (S = N-1)
				$R_0 = \beta \cdot I \cdot (N - 1) / N$ = $\beta \cdot I$ = $\beta \cdot 1$ at time step 1. Over the whole time, $R_0$  = how long infection lasts * incidence![[Screenshot 2025-09-04 at 3.26.53 PM.png]]
	- Effective Reproductive Number $R_e$
		- Expected number of secondary infection per primary infection given current trends (ie. real-time measurement)
			- Same derivation but don't set S to n-1 ![[Screenshot 2025-09-04 at 3.26.44 PM.png]]
		Big goal of interventions is to make $R_e$ < 1
# MISC Model
- SIS Model
- SEIR Model 
	- Exposed = pre-infected (infected but not yet infectious)
# SIR with Birth and Death 
```python
def SIR(S0, I0, R0, beta, gamma, mu, t_max, stepsize):
	T = np.arange(0, t_max + stepsize, stepsize)
	S = np.zeros(len(T))
	I = np.zeros(len(T))
	R = np.zeros(len(T))
	
	N = S0 + I0 + R0
	for idx, t in enumerate(T):
		if idx==0:
			S[idx] = S0
			I[idx] = I0
			R[idx] = R0
		else:
			dS_dt = -beta * S[idx-1] * I[idx-1] / N - mu * S[id-1] + mu*N
			dI_dt = beta * S[idx-1] * I[idx-1] / N - gamma * I[idx-1] - mu*I[idx-1] # subtract mu*I[idx-1]
			dR_dt = gamma * I[idx-1] - mu*R[idx-1] # subtract mu*R[idx-1]
		
		S[idx] = S[idx-1] + dS_dt * stepsize
		S[idx] = S[idx-1] + dI_dt * stepsize
		S[idx] = S[idx-1] + dR_dt * stepsize

return S, I, R, T
```
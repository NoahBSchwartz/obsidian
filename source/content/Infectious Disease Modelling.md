# Background
Pathogen vs. Disease (Sars-CoV-2 pathogen causes Covid-19 disease)
# Koch's Postulates
How to establish that a microbe causes a disease
1. Microbe present in all cases of disease and absent from healthy individuals
2. Microbe must be isolated and grown in pure culture (ie. we can grow microbe in dish)
3. Disease must be reproduced when pure culture is given to healthy host
4. Microbe must be reisolated from host you just infected 
Doesn't work for microbes that cause same disease, microbes that can't be grown in dish, immune hosts, asymptomatic hosts,
# Lifecycle of Disease Prevention
	Ex. Vibrio Cholerae -> Cholera (1854). 500 died in London neighborhood. John Snow found the mode of transmission:
		1. Found where the virus was centralized (pump)
		2. Hypothesized: it was the water pump
		3. Countermeasure (eg. vax, treatments, education, hand washing): removed the handle
1. Reservoir: place where agent can survive and multiply (eg. animals (eg. lyme), plants, humans (eg. tetanus), soil, water (eg. cholera))
2. Mode of Transmission:
	- Direct Transmission (you can back away and avoid it): skin-to-skin (gonorrhea), kissing (mono), soil (hookworm), droplets (pertusis)
	- Indirect Transmission (some intermediary): inanimate (needle = HIV), animate (flea = Y. pestis), airborn (smaller aerosols = Sars-Cov-2)
3. Latent = time until infectious. Incubation = time until symptoms
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
	3. Everyone in $I$ is equally infectious. People in $I$ recover at rate $\gamma$. $\dot{I} = incidence - recovery$. Thus:![[IMG_0097.png]]
		- Note if population is constant, then $\dot{S} + \dot{I} + \dot{R} = 0$ because rate of change of all groups added up is 0!
3. Properties: 
	- To double incidence, we have 2 parameters: double $P$ or double $C$ (to make this easier $\beta = P \cdot C$)
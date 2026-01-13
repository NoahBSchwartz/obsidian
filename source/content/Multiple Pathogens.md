How do pathogens interact in a population? They might compete for hosts, provide partial/full immunity for each other, make a host more susceptible to other pathogens, competition might drive pathogens to evolve
- Add more compartments! We should be able to track interactions between pathogens (3 pathogens = 64 compartments)
	1. Cross-Immunity = not too many compartments (once infected with 1 you can't get 2 and vice versa): ![[Screenshot 2025-11-11 at 3.22.28 PM.png]]
			Note: equilibrium is $(s = 1/R0_1$,  $\dot{i}_2 = 0)$  or ($s = 1/R0_2$,  $\dot{i}_1 = 0$)
			Meaning: whichever utilizes susceptibles more efficiently will dominate and drive the other to extinction
		- Transients: R0 only tells us what happens over the whole time-scale but we need to look at what happens in the short-term (we may need to worry about both but be blind bc we only look at R0)
		- Evolution: Larger R0 makes diseases more competitive so evolution will slowly try to raise it (stop killing ppl, become extremely easy to transmit)![[Screenshot 2025-11-11 at 3.34.35 PM.png]]
			Note: there's tradeoffs because the host can't handle producing tons of pathogens for a long period of time
				So we only see diseases with mid R0 values
				When infections evolve to be resistant to antibiotics they get weaker (T is treatment and leads to less effective disease (wild type w > resistant type r))![[Screenshot 2025-11-11 at 3.43.28 PM.png]]
					Note: dividing line between which wins is at T = $\gamma(1 - \beta_w / \beta_r)$ (goal is to maximize T before r wins)
	2. Fully-Independent Diseases = no cross immunity (people stay home when they're sick w one disease so the diseases aren't actually independent! Assume contacts decreases when infected with A or B)
		- Create compartments for $N_{ss}, N_{is}, N_{si}$ (assume you can't be infected w both at same time, so no $N_{ii}$)
		Note: because of differences in R0 (which means age of first infection is different) this is uncommon
		- Malaria: age of first infection is super low (R0 = 50-100) but we can still eliminate it, how?? This is because there are many strains and some have super low R0 and some have super high
		- Enhanced susceptibility (STI's weaken host and actually lead to higher susceptibility): high coinfection! Sometimes 2 pathogens can both have R0 < 1 (ie. they'd both die out) but they can be combined to have R0 > 1 and stick around much longer!
	3. Partial Cross Immunity = recovery from 1 infection provides partial protection against the other
		- Coexistence is only possible when R0 are similar for both viruses and cross immunity is weak
		- Most new strains are closely related to their parents so don't take off (so only super different strains take off!)
			- Think of antigenically adjacent strains on a line (where small jumps don't work and others do work)
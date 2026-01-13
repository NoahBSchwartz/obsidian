# Google Deepmind 
(pessimistic: doesn't think alignment works by default, doesn't focus on using AI to accelerate alignment research) Specification Gaming and Goal Misgeneralization will combine to create misaligned power-seeking AI systems (they'll arise from something very similar to what we see now like LLMs w RLHF)
1. Detect places during training where things start going wrong (ie. deception gets rewarded)
	- Use mech-interp to detect deceptive behavior
	- Use capability evals to detect
2. "Direct the training process toward aligned AI and away from misaligned AI"
	- Outer Alignment:
		- Scalable Oversight: get the training signal (the reward) right so the AI learns the correct goals in the first place (ie. use one AI encoded w our values to monitor a bigger AI)
			- Debate
		- Process-Based feedback: judge the reasoning steps instead of just the final answer (catch bad shortcuts/deception)
	- **Inner alignment**: Mitigating goal misgeneralization, red-teaming
# Anthropic
Think in terms of a distribution over safety difficulty. Use concrete experiments (almost exclusively) to work towards solutions for easy, medium, or hard difficulty scenarios  ![[Screenshot 2026-01-11 at 8.59.23 PM.png]]
1. Mechanistic Interpretability (big risky bet): fill gaps left by other methods (ie. if RLHF works perfectly then the model will appear great, we need a way to know this more confidently)
2. Scalable Oversight (most promising): try to magnify a small amount of human feedback into large signal (adversarial training, constitutional AI, debate, red-teaming, automated evals)
3. Process-Oriented Learning: instead of trying to optimize for a specific outcome reward each step of the process (so that an agent doesn't learn goals we don't want, make each step understandable, make reward hacking nearly impossible, never rewarded for dangerous subgoals like resource acquisition or deception)
4. Understanding Generalization: try to detect where in training bad things happen and what makes them happen
5. Testing for Dangerous Failure Modes: trace a model’s outputs back to the training data, see if awareness of being an AI leads to deception in small models, deliberately train deception into models to study it
6. Societal Impacts and Evaluations: focus on how AI deployment will effect society now (economically, socially, politically)
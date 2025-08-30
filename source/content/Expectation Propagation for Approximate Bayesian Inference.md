Bayesian inference often requires computing intractable posterior distributions p(x|D) and evidence p(D) so instead we'll iteratively refine approximate beliefs
# Background
1. Assumed-Density Filtering (ADF): processes observations sequentially, approximating the posterior after each observation. So observation sequence matters and we can't refine our guess later on
# Expectation Propagation
1. Given a joint distribution p(D,x) = ∏_i t_i(x)
	1. Where t_0(x) = p(x) (prior) and t_i(x) = p(y_i|x) (likelihood terms)
2. First approximate each term t_i with t̃_i(x)
3. **Compute posterior** from approximated terms
4. **Iterative refinement** until convergence
	1. Select term t̃_i to refine
	2. Remove t̃_i 
	3. Compute exact posterior: p(x) ∝ t_i(x)q^{\i}(x)
	4. Find new approximation by minimizing KL(p||q_new)
- Find new approximation by minimizing KL(p||q_new)
- Update: t̃_i(x) = Z_i × q_new(x)/q^{\i}(x)
- Then computing exact posteriors with approximated terms
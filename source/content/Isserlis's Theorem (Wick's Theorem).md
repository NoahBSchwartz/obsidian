If you have multiple random variables that follow a normal (Gaussian) distribution and you need to calculate the expected value of their products (like E[X₁ × X₂ × X₃ × X₄]) (ie. higher-order moments)
# Steps
Instead of dealing with the product of many variables at once:
1. **Pair up all the variables** in every possible way
2. **Calculate the covariance** (how much two variables vary together) for each pair
3. **Multiply these covariances together** for each pairing
4. Add up all the different pairings
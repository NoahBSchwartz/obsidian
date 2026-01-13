# Summary
- Background: previously the way to make LLM's output logically correct SQL syntax was to constrain the vocabulary. This means they won't work with a generic pre-trained language model
1. Prep: Fine-tune the T5 model for SQL
2. Inference: Run SQL detection every step to limit the amount of branches we need to check (and we can set it up so it only needs to check the word with the newest token)
3. Testing: have model predict query and then write it to a data structure to see how well it matches ground truth (do this so that variable names and ordering doesn't matter), test the query on the actual database to see if it works correctly, test the query on several databases to see if things work 
- Mode Settings: (Lexing: only look at spelling of words) (Parsing without Guards: checks grammar by seeing if each word is in order and if the query gets the right collumns for the right tables) (Parsing with Guards: looks at every part of the query to be sure everything is defined. ie. if x is used, x must be defined at some point)
- Search Settings
	1. Beam Search: like branch search, but there are only ever x branches going at once (below, x = 3)![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Beam_search.gif/220px-Beam_search.gif)
	2. Greedy Search: take the best option now, don't consider consequences (only ever checks one branch)
# Questions
1. What is an auto-regressive model exactly? How is it different from other models?
2. Isn't it very surprising that the number of highest probability tokens processed by PICARD doesn't really change performance all that much? Must mean that llm is usually almost right
# Criticisms
- Paper in comparison to others:

# Applications, Extensions, Ideas
[[Formal Systems]]

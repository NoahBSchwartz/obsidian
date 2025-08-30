# Summary
- Background: Normally text-to-sql done with seq2seq models which aren't as good on the Spider benchmark (fewer parameters)
1. Fine-tune Wizard Coder (15B): 61% accurate [[LORA and QLORA]]
	- Fine-Tuning Database: input = database schema, skeleton format.            output = sql query
	- Doesn't work well for few shot learning 
2. Correction: 
	1. Example Driven: if query fails, give the model (gpt 3.5) an example of what output should be 
	2. Error Driven: if query fails again, start a new chat with gpt 4 and send it the result of actually executing the bad query to see if it can fix it
3. Results: 
	- the paper finds some issues with the Spider dataset (the generated query might be right but return a different element than ground truth when more than 1 element could fit the question) (the LLM can't access rows so isn't able to do conditionals ie. if ship == "sank" vs if ship == "lost")
	- the LLM sometimes gets tripped up by assuming it needs to use another table 
	- the LLM most often gets tripped up because it generates very complicated queries when it could be solved in a much more straightforward way. 
	- the Spider dataset marks correct queries wrong (because it mixes up naming), and sometimes the ground truth isn't correct
# Questions
1. What rank are we using for the QLORA fine-tuning? Should it be higher, I'd assume a task like SQL would be a large update to a model trained primarily on code? (256 rank may be max for dataset?)
# Criticisms
- Paper in comparison to others:
- It's pretty obvious that you can't compare the approaches used in the paper to each other because the authors change models and increase the amount of data given to a model
- It's hard to tell what the paper contributes to the field because the authors seem to break the rules of the benchmark

# Applications, Extensions, Ideas
1. The LLM is tripped up because it writes queries that are too complex, is there a way to fine-tune it to select for simpler queries?
2. 
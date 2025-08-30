What symbols there are in a language and how they can be put together in specific ways
- Sentence Letters: `A, B, C, ... Z` or `A1, A2,...` and parentheses 
- Recursive Definition: instructions to generate all sentences in a system. Base Case (Rule 1), Rules for Extension (Rules 2-7) made up of connectives (Rules 2-6)
	1. Base Case: Every sentence letter is a sentence of the language (you can only use english letters not greek)
		- Greek letters are meta language, they're variables
	2. If A is a sentence of language, then ¬ A is a sentence.
		 Negation monatic 1 argument
	3. If B is a sentence, then (A ∨ B) is sentence.
		 Disjunction (`A or B`) A and B are disjuncts
	4. (A ∧ B) is sentence: diatic 2 arguments
		 Conjunction (`A and B`) A and B are conjuncts
	5. (A ⊃ B) is sentence
		Conditional (`If A then B` aka `B only if A`) A = antecedent B = consequent    aka sufficient condition
	6. (A ≡ B) is sentence
		Biconditional (`B if and only if A`) aka necessary condition. Also use `iff` for biconditional
	7. Nothing else is a sentence of the language
	- Note: Allowed to drop parentheses if they don't specify scope (only the outside set)
		Ex. `¬A ∨ B` is valid `A ∨ B ∨ C` is not valid
- Constructional History: list of steps to make sentence
		Ex. `A` (1) -> `¬ A` (2)  -> `B` (1) -> `¬A ∨ B` (3)
	- Main Operator: Operator added in final step of construction
	- Subformulas: Everything in the constructional history before main operator adde
- Symbolizing English Sentences
	- Symbolization Key: assigns logically simple english sentences to letters
		Ex. Either the cat likes food or water -> 
		A: the cat likes food, B: the cat likes water -> A 
	- Meaning is compositional: the meaning of a sentence in TFL is = determined by how it's put together
[[Sets of Sentences]]

- Innovation: they look at reducing hallucinations in a natural setting without the need to induce the hallucinations like past studies have (by introducing noise)
- Hallucination Definition: hallucination is defined as detachment from the source sequence instead of simply mistranslation
- Methods for Detecting Hallucinations
	1. Use simple quality filters to just find the badly generated outputs
	2. Use the content of the translation (how characters and sentences repeat themselves) to find hallucinations
	3. Use the attention scores of the model. If more attention is paid to the end token of the source translation, hallucinations are more likely
	5. Train another model to learn to detect hallucinations
	- Winner: Use the model's own confidence scores (which it gives to every word) in order to catch extremely low confidence areas
- Once the hallucination is found, the authors use MC-Dropout to get several different translations from the model and then choose the one that scores highest
	- MC-Dropout: temporarily remove units in the neural network at random during inference to get multiple different outputs for a single translation
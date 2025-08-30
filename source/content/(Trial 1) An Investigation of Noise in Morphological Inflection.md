"But neural models that bias the task towards transducing input strings have been shown to be successful in low-resource data settings"

"Several approaches have been proposed for mitigating the impact of noise in machine learning, for example: confidence weighting (Rebbapragada and Brodley, 2007), loss correction (Patrini et al., 2017), and noise-contrastive estimation (Gutmann and Hyväri- nen, 2010)"

"Nicolai and Silfverberg (2020) find that exposing an inflection model to its own mistakes leads to better generalizability"


Types of Noise that my Approach would Solve:
- "Lexicon Noise Any word type that is not in the standard vocabulary of a given language is con- sidered lexicon noise.
- "POS Noise Not all parts of speech inflect, and this varies by language. However, tUMPC some- times induces spurious inflection pairs from words that do not inflect"
- All 3 types of Paired Errors

"We compare four neural inflection generation sys- tems. We implement a bidirectional LSTM with attention (Kann and Schütze, 2016, LSTM), a Trans- former (Wu et al., 2021, Trm), a pointer generator LSTM (Sharma et al., 2018, PtrGen), and we use the Dynet implementation of (Makarov and Clematide, 2018, M&C): a transducer optimized with minimum risk training...
This gives us two classes of models: general encoder-decoders (LSTM and Trm), which may struggle for low-resource scenarios and under a lack of sample diversity; and transducer-like mod- els with a bias towards copying from the lemma (PtrGen and M&C)"
- M&C performs best on average, with PtrGen per- forming second best.

The paper does most of its experiments just seeing how noise effects things but then also tries to correct for it
- BERT objective: We experiment with a simple character masked lan- guage modeling (CMLM) pretraining objective as a method for improving noise-robustness of each model.
	- Mask- ing can be thought of as additionally adding a de- noising objective to auto-encoding
	- Note: This is different from BERT, just follows the same format
	- The authors call this pretraining, is it the same kind I'm talking about in my email? "LSTM is barely affected by pretraining on aver- age. Trm, however, increases in accuracy in both datasets when pretrained."
	- Question: How is this related to pretrianing? Is the CMLM being pretrained or something

My methods might be able to deal with the issues of low sample diversity: "We find that low sample diversity has a strong im- pact on performance of all models"
- Where do the authors talk about this other than the conclusion though?

Which architecture should I talk about enhancing in the email? "We find that the low LSTM and Trm performance is largely explained by low sample diversity. On the other hand, they seem to be more robust to noisy data, particularly LSTM, which has stable perfor- mance as noise is added to the UniMorph dataset."
- On average, Trm pretrained with CMLM is the best performing model under noise, when we have sufficient sample diversity. Could my method be used to account for lower than sufficient sample diversity
- "However, future work should consider alternate pretraining strategies for M&C."
- "Overall this implies that, although copy mod- els are preferred for training on low sample diver- sity, classic encoder-decoders are a good choice for noisy datasets with more diversity." maybe go for encoder decoders with a simple masked pretraining objective (CMLM)
### Process
1. Pretraining: The models are first pretrained using the Character Masked Language Modeling (CMLM) objective. This step involves training the model on a large dataset (that's not noisy) where individual characters within words are masked, and the model learns to predict these missing characters. This pretraining phase helps the model learn a robust representation of the language, focusing on understanding the structure and morphology of words at a character level.
2. Finetuning: During fine-tuning, the model is specifically trained on morphological inflection using the noisy data. This involves providing the model with pairs of lemmas and their inflected forms, along with the corresponding grammatical features or morphosyntactic tags. 
	Ex. Given the lemma "run" and the grammatical features "third person singular present," the model should generate "runs."
### Evidence
- "Hallucinations in model output can often be a result of noisy or misleading training data"
- "Implementing a hallucination check could be another layer to ensure robustness, especially in models that are more susceptible to noise."
- "Your proposition could address this by identifying instances where the model's output might be influenced by noisy or incorrect data (hallucinations), thereby improving the quality of outputs."
[[CU Alpine Documentation]]

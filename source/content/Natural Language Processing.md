# Background
Stems, affixes, Morphology, Morphemes, Types, Vocabulary (all possible tokens)
# Subword Tokenization: Byte Pair Encoding (BPE)
- Training: choose 2 symbols that are most frequently adjacent, merge into one symbol, repeat (end w/ ~30k entries for most)
- Inference: if encounter unfamiliar word, run each merge learned from training data in order they were learned (l o w e r -> l o w er -> lo w er) 